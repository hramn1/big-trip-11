import {render, unrender} from "../utils";
import {default as CreateNoEventTemplate} from "../components/no-event";
import {default as CreateSort} from "../components/sort";
import {default as CreateSortContainer} from "../components/sort-container";
import {default as CreateFilterTemplate} from "../components/filters";
import {generateSort, generateTripData} from "../data";
import {default as CreateTripDays} from "../components/trip-days";
import {default as TripController} from "./trip-controller";
import {default as NewEventController} from "./new-event-controller";


const renderTemplatePointRouteList = (container, trips, templatePointRouteList, onDataChange, onViewChange) => {
  render(container, templatePointRouteList.getElement());
  const routeList = document.querySelectorAll(`.trip-days__item .trip-events__item `);
  const newEventController = [];
  for (let it of routeList) {
    const dayDateElement = it.getAttribute(`data-day`);
    const showingEvents = trips.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
    for (let tripEvent of showingEvents) {
      const eventController = new TripController(tripEvent, it, onDataChange, onViewChange);
      eventController.init(tripEvent);
      newEventController.push(eventController);
    }
  }
  return newEventController;
};
export default class BoardController {
  constructor(container, pointModel) {
    this.container = container;
    this._pointModel = pointModel;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onViewChangeNewTrip = this._onViewChangeNewTrip.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.newEventController = null;
    this.sortContainer = new CreateSortContainer();
    this.createNoEventTemplate = new CreateNoEventTemplate();
    this._showedTripControllers = [];
    this._pointModel.setFilterChangeHandler(this._onFilterChange);
  }

  init() {
    const trips = this._pointModel.getPoints();
    this.templatePointRouteList = new CreateTripDays(this._pointModel.getPoints());
    if (trips.length === 0) {
      render(this.container, this.createNoEventTemplate.getElement());
      return;
    } else {
      unrender(this.createNoEventTemplate);
    }
    this._onSortEvent(this.templatePointRouteList);
    if (this.newEventController === null) {
      this.newEventController = new NewEventController(this.container, generateTripData(), this._onDataChange, this._onViewChangeNewTrip);
      this.newEventController.bind();
    }
    const newEvent = renderTemplatePointRouteList(this.container, trips, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEvent);
    this._onViewChange();
  }
  _onViewChange() {
    this._showedTripControllers.forEach((controller) => controller.setDefaultView());
  }
  _onViewChangeNewTrip() {
    this._showedTripControllers.forEach((controller) => controller.setDefaultView());
    this._setSortStateDefault();
    this._pointModel.setFilter(`Everything`);
    CreateFilterTemplate.filterDefault();
  }
  _onSortEvent() {
    let trips = this._pointModel.getPointsAll();
    this.sortTemplate = new CreateSort(generateSort());
    this.sortTemplate.sortEvent = (evt) => {
      this._showedTripControllers = [];
      if (evt.target.id === `sort-event`) {
        unrender(this.sortContainer);
        unrender(this.templatePointRouteList);
        const newEventSort = renderTemplatePointRouteList(this.container, trips, this.templatePointRouteList, this._onDataChange, this._onViewChange);
        this._showedTripControllers = this._showedTripControllers.concat(newEventSort);
        return;
      } else if (evt.target.id === `sort-price`) {
        trips = [...trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
        this._showedTripControllers = [...this._showedTripControllers].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      } else {
        trips = [...trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.timeTrip) - parseFloat(tripsSecond.timeTrip)));
        this._showedTripControllers = [...this._showedTripControllers].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      }
      this.sortTemplate.unrenderDay();
      unrender(this.templatePointRouteList);
      unrender(this.sortContainer);
      render(this.container, this.sortContainer.getElement());
      for (let it of trips) {
        const routeList = document.querySelector(`.trip-days__item .trip-events__item `);
        const eventControllerSort = new TripController(it, routeList, this._onDataChange, this._onViewChange);
        eventControllerSort.init(it);
        this._showedTripControllers = this._showedTripControllers.concat(eventControllerSort);
      }
    };
    render(this.container, this.sortTemplate.getElement());
  }
  _removePoints() {
    this._showedTripControllers.forEach((pointController) => pointController.destroy());
    this._showedTripControllers = [];
  }
  _updatePoints() {
    this._removePoints();
    unrender(this.sortTemplate);
    unrender(this.templatePointRouteList);
    this.init();
  }
  _onFilterChange() {
    this._setSortStateDefault();
    this._updatePoints();
  }
  _setSortStateDefault() {
    unrender(this.createNoEventTemplate);
    let trips = this._pointModel.getPointsAll();
    unrender(this.sortTemplate);
    this.sortTemplate = new CreateSort(generateSort());
    render(this.container, this.sortTemplate.getElement());
    unrender(this.sortContainer);
    unrender(this.templatePointRouteList);

    const newEventSort = renderTemplatePointRouteList(this.container, trips, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEventSort);
  }
  show() {
    this.templatePointRouteList.show()
    this.sortTemplate.show()
  }

  hide() {
    this._onViewChange();
    this.templatePointRouteList.hide()
    this.sortTemplate.hide()

  }
  _onDataChange(oldData, newData) {
    if (newData === null) {
      this._pointModel.removePoint(oldData.id);
      this._updatePoints();
    } else if (oldData === null) {
      this._pointModel.addPoint(newData);
      this._updatePoints();
    } else {
      const pointController = this._showedTripControllers.find((item) => (item.trips === oldData));
      this._pointModel.updatePoint(oldData.id, newData);
      pointController.init(newData);
    }
  }
}
