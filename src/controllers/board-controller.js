import {render, unrender, generateSort} from "../utils";
import {default as CreateNoEventTemplate} from "../components/no-event";
import {default as CreateSort} from "../components/sort";
import {default as CreateSortContainer} from "../components/sort-container";
import {default as CreateFilterTemplate} from "../components/filters";
import {default as CreateTripDays} from "../components/trip-days";
import {default as TripController} from "./trip-controller";
import {default as NewEventController} from "./new-event-controller";


const renderTemplatePointRouteList = (container, trips, pointModel, templatePointRouteList, onDataChange, onViewChange) => {
  render(container, templatePointRouteList.getElement());
  const routeList = document.querySelectorAll(`.trip-days__item .trip-events__item `);

  const newEventControllers = [];

  for (const it of routeList) {
    const dayDateElement = it.getAttribute(`data-day`);
    const showingEvents = trips.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
    for (const tripEvent of showingEvents) {
      const eventController = new TripController(pointModel, it, onDataChange, onViewChange);
      eventController.init(tripEvent);
      eventController.init(tripEvent);
      newEventControllers.push(eventController);
    }
  }
  return newEventControllers;
};
export default class BoardController {
  constructor(container, pointModel, statisticsComponent, templateMenu, api) {
    this.container = container;
    this._pointModel = pointModel;
    this._statisticsComponent = statisticsComponent;
    this._templateMenu = templateMenu;
    this._api = api;
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
    let trips = this._pointModel.getPoints();
    trips = [...trips].sort((tripsSecond, tripsFirst) => tripsSecond.tripDate - tripsFirst.tripDate);
    this.templatePointRouteList = new CreateTripDays(this._pointModel.getPoints());
    if (this.newEventController === null) {
      this.newEventController = new NewEventController(this.container, trips, this._statisticsComponent, this._templateMenu, this._pointModel, this._onDataChange, this._onViewChangeNewTrip, this._api);
      this.newEventController.bind();
    }
    if (trips.length === 0) {
      render(this.container, this.createNoEventTemplate.getElement());
      return;
    } else {
      unrender(this.createNoEventTemplate);
    }
    this._onSortEvent(this.templatePointRouteList);

    const newEvent = renderTemplatePointRouteList(this.container, trips, this._pointModel, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEvent);
    this._onViewChange();
  }
  _onViewChange() {
    this.newEventController.setDefaultViev();
    this._showedTripControllers.forEach((controller) => controller.setDefaultView());
  }
  _onViewChangeNewTrip() {
    const trips = this._pointModel.getPoints();
    if (trips.length === 0) {
      return;
    }
    this._showedTripControllers.forEach((controller) => controller.setDefaultView());
    this._setSortStateDefault();
    this._pointModel.setFilter(`Everything`);
    CreateFilterTemplate.filterDefault();
  }
  _onSortEvent() {
    let trips = this._pointModel.getPoints();
    this.sortTemplate = new CreateSort(generateSort());
    this.sortTemplate.sortEvent = (evt) => {
      this._showedTripControllers = [];
      if (evt.target.id === `sort-event`) {
        unrender(this.sortContainer);
        unrender(this.templatePointRouteList);
        const newEventSort = renderTemplatePointRouteList(this.container, trips, this._pointModel, this.templatePointRouteList, this._onDataChange, this._onViewChange);
        this._showedTripControllers = this._showedTripControllers.concat(newEventSort);
        return;
      } else if (evt.target.id === `sort-price`) {
        trips = [...trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
        this._showedTripControllers = [...this._showedTripControllers].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      } else {
        trips = [...trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.tripDateEnd - tripsFirst.tripDate) - parseFloat(tripsSecond.tripDateEnd - tripsSecond.tripDate)));
        this._showedTripControllers = [...this._showedTripControllers].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      }
      this.sortTemplate.unrenderDay();
      unrender(this.templatePointRouteList);
      unrender(this.sortContainer);
      render(this.container, this.sortContainer.getElement());
      for (const it of trips) {
        const routeList = document.querySelector(`.trip-days__item .trip-events__item `);
        const eventControllerSort = new TripController(this._pointModel, routeList, this._onDataChange, this._onViewChange);
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
    const trips = this._pointModel.getPoints();
    unrender(this.sortTemplate);
    this.sortTemplate = new CreateSort(generateSort());
    render(this.container, this.sortTemplate.getElement());
    unrender(this.sortContainer);
    unrender(this.templatePointRouteList);

    const newEventSort = renderTemplatePointRouteList(this.container, trips, this._pointModel, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEventSort);
  }
  show() {
    this.templatePointRouteList.show();
    this.sortTemplate.show();
  }

  hide() {
    this._onViewChange();
    this.templatePointRouteList.hide();
    this.sortTemplate.hide();

  }
  _onDataChange(oldData, newData, tripFavorite = false) {
    const pointController = this._showedTripControllers.find((item) => (item.trips === oldData));
    if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointModel.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });

    } else if (oldData === null) {
      this._api.createPoint(newData)
        .then(() => {
          this._api.getPoints()
            .then((points) =>{
              const updatePoints = points;
              newData.id = updatePoints[updatePoints.length - 1].id;
              this._pointModel.addPoint(newData);
              this._updatePoints();
            });
        })
        .catch(() => {
          this.newEventController.shake();
        });
    } else {
      if (tripFavorite === true) {
        this._api.updatePoint(oldData.id, newData)
          .then(() => {
            this._pointModel.updatePoint(oldData.id, newData);
          });
      } else {
        this._api.updatePoint(oldData.id, newData)
          .then(() => {
            this._pointModel.updatePoint(oldData.id, newData);
            this._updatePoints();
          })
          .catch(() => {
            pointController.shake();
          });
      }
    }
  }
}
