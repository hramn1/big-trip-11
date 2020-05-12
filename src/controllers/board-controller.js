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
      const eventController = new TripController(it, onDataChange, onViewChange);
      eventController.init(tripEvent);
      newEventController.push(eventController);
    }
  }
  return newEventController;

};
export default class BoardController {
  constructor(container, trips) {
    this.container = container;
    this.trips = trips;
    this._onDataChange = this._onDataChange.bind(this);
    this.templatePointRouteList = new CreateTripDays(this.trips);
    this._showedTripControllers = [];
  }

  init() {
    const isAllEventArchived = this.trips.every((trip) => trip.isArhive);
    if (isAllEventArchived) {
      render(this.container, new CreateNoEventTemplate().getElement());
      return;
    }
    this._onSortEvent(this.templatePointRouteList);

    // const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
    // render(container, templateFormCreate.getElement());

    const newEvent = renderTemplatePointRouteList(this.container, this.trips, this.templatePointRouteList, this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newEvent);

  }
  _onSortEvent(templatePointRouteList) {
    const sortContainer = new CreateSortContainer();
    const sortTemplate = new CreateSort(generateSort());
    sortTemplate.sortEvent = (evt) => {
      if (evt.target.id === `sort-event`) {
        unrender(sortContainer);
        unrender(templatePointRouteList);
        renderTemplatePointRouteList(this.container, this.trips, templatePointRouteList);
        return;
      } else if (evt.target.id === `sort-price`) {
        this.trips = [...this.trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
        this._showedTripControllers = [...this._showedTripControllers].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      } else {
        this.trips = [...this.trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.timeTrip) - parseFloat(tripsSecond.timeTrip)));

      }
      sortTemplate.unrenderDay();
      unrender(templatePointRouteList);
      unrender(sortContainer);
      render(this.container, sortContainer.getElement());
      for (let it of this.trips) {
        const eventControllerSort = new TripController(sortContainer.getElement());
        eventControllerSort.init(it);
      }
    };
    render(this.container, sortTemplate.getElement());

  }

  _onDataChange(oldData, newData) {
    const pointController = this._showedTripControllers.find((item) => (item.trips === oldData));
    const index = this.trips.findIndex((it) => it === oldData);
    if (index === -1 || !pointController) {
      return;
    }
    this.trips = [].concat(this.trips.slice(0, index), newData, this.trips.slice(index + 1));
    // const routeList = document.querySelector(`.trip-days__item .trip-events__item `);
    pointController.init(this.trips[index]);
  }
}
