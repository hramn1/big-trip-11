import {render, unrender} from "../utils";
import {default as CreateNoEventTemplate} from "../components/no-event";
import {default as CreateSort} from "../components/sort";
import {default as CreateSortContainer} from "../components/sort-container";
import {generateSort} from "../data";
import {default as CreateTripDays} from "../components/trip-days";
import {default as TripController} from "./trip-controller";

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

    this.templatePointRouteList = new CreateTripDays(this._pointModel.getPointsAll());
    this._showedTripControllers = [];
  }

  init() {
    const trips = this._pointModel.getPointsAll();
    const isAllEventArchived = trips.every((trip) => trip.isArhive);
    if (isAllEventArchived) {
      render(this.container, new CreateNoEventTemplate().getElement());
      return;
    }
    this._onSortEvent(this.templatePointRouteList);

    // const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
    // render(container, templateFormCreate.getElement());

    const newEvent = renderTemplatePointRouteList(this.container, trips, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEvent);
    this._onViewChange();

  }
  _onViewChange() {
    this._showedTripControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortEvent(templatePointRouteList) {
    let trips = this._pointModel.getPointsAll()
    const sortContainer = new CreateSortContainer();
    const sortTemplate = new CreateSort(generateSort());
    sortTemplate.sortEvent = (evt) => {
      this._showedTripControllers = [];
      if (evt.target.id === `sort-event`) {
        unrender(sortContainer);
        unrender(templatePointRouteList);
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
      sortTemplate.unrenderDay();
      unrender(templatePointRouteList);
      unrender(sortContainer);
      render(this.container, sortContainer.getElement());
      for (let it of trips) {
        const routeList = document.querySelector(`.trip-days__item .trip-events__item `);
        const eventControllerSort = new TripController(it, routeList, this._onDataChange, this._onViewChange);
        eventControllerSort.init(it);
        this._showedTripControllers = this._showedTripControllers.concat(eventControllerSort);
      }
    };
    render(this.container, sortTemplate.getElement());
  }

  _onDataChange(oldData, newData) {
    let trips = this._pointModel.getPointsAll()
    const pointController = this._showedTripControllers.find((item) => (item.trips === oldData));
    this._pointModel.updatePoint(oldData.id, newData, pointController)
    const index = trips.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    trips = [].concat(trips.slice(0, index), newData, trips.slice(index + 1));
    console.log(trips[index])
    //pointController.init(trips[index]);

    pointController.init(this._pointModel.getPoint());
  }
}
