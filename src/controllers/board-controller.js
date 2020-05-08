import {render} from "../utils";
import {default as CreateNoEventTemplate} from "../components/no-event";
import {default as CreateSort} from "../components/sort";
import {generateSort} from "../data";
import {default as CreateTripDays} from "../components/trip-days";
import {default as TripController} from "./trip-controller";

export default class BoardController {
  constructor(container, trips) {
    this.container = container;
    this.trips = trips;
  }

  init() {
    const isAllEventArchived = this.trips.every((trip) => trip.isArhive);
    if (isAllEventArchived) {
      render(this.container, new CreateNoEventTemplate().getElement());
      return;
    }
    const sortTemplate = new CreateSort(generateSort());
    render(this.container, sortTemplate.getElement());
    // const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
    // render(container, templateFormCreate.getElement());
    const templatePointRouteList = new CreateTripDays(this.trips);
    render(this.container, templatePointRouteList.getElement());
    const routeList = document.querySelectorAll(`.trip-days__item .trip-events__item `);
    for (let it of routeList) {
      const dayDateElement = it.getAttribute(`data-day`);
      const showingEvents = this.trips.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
      for (let tripEvent of showingEvents) {
        const eventController = new TripController(it, tripEvent);
        eventController.init();
      }
    }
  }
}
