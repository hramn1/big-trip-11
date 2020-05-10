import {render, unrender} from "../utils";
import {default as CreateNoEventTemplate} from "../components/no-event";
import {default as CreateSort} from "../components/sort";
import {default as CreateSortContainer} from "../components/sort-container";
import {generateSort} from "../data";
import {default as CreateTripDays} from "../components/trip-days";
import {default as TripController} from "./trip-controller";
const rendertemplatePointRouteList = (container, trips, templatePointRouteList) => {
  render(container, templatePointRouteList.getElement());
  const routeList = document.querySelectorAll(`.trip-days__item .trip-events__item `);
  for (let it of routeList) {
    const dayDateElement = it.getAttribute(`data-day`);
    const showingEvents = trips.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
    for (let tripEvent of showingEvents) {
      const eventController = new TripController(it, tripEvent);
      eventController.init();
    }
  }
};
export default class BoardController {
  constructor(container, trips) {
    this.container = container;
    this.trips = trips;
  }

  init() {
    const templatePointRouteList = new CreateTripDays(this.trips);
    const isAllEventArchived = this.trips.every((trip) => trip.isArhive);
    const sortContainer = new CreateSortContainer();
    if (isAllEventArchived) {
      render(this.container, new CreateNoEventTemplate().getElement());
      return;
    }
    const sortTemplate = new CreateSort(generateSort());
    sortTemplate.sortEvent = (evt) => {
      if (evt.target.id === `sort-event`) {
        unrender(sortContainer);
        unrender(templatePointRouteList);
        rendertemplatePointRouteList(this.container, this.trips, templatePointRouteList);
        return;
      } else if (evt.target.id === `sort-price`) {
        this.trips = [...this.trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.price) - parseFloat(tripsSecond.price)));
      } else {
        this.trips = [...this.trips].sort((tripsSecond, tripsFirst) => (parseFloat(tripsFirst.timeTrip) - parseFloat(tripsSecond.timeTrip)));

      }
      sortTemplate.unrenderDay();
      unrender(templatePointRouteList);
      unrender(sortContainer);
      render(this.container, sortContainer.getElement());
      const routeList = document.querySelector(`.trip-days__item .trip-events__item `);
      for (let it of this.trips) {
        const eventController2 = new TripController(routeList, it);
        eventController2.init();
      }
    };
    render(this.container, sortTemplate.getElement());

    // const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
    // render(container, templateFormCreate.getElement());

    rendertemplatePointRouteList(this.container, this.trips, templatePointRouteList);
  }
}
