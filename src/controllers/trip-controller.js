import {default as CreatePointRoute} from '../components/route-point';
import {default as CreateEditEven} from '../components/edit-event';
import {tripData, offers} from '../data';
import {render, replace} from "../utils";

export default class TripController {
  constructor(container, onDataChange) {
    this.container = container;
    this._onDataChange = onDataChange;

  }
  init(trip) {
    this.trips = trip;
    const oldETrip = this.tripEvent;
    const oldEditEvent = this.editEvent;
    this.tripEvent = new CreatePointRoute(this.trips);
    this.editEvent = new CreateEditEven(this.trips, tripData, offers);
    if (oldETrip && oldEditEvent) {
      replace(this.tripEvent, oldETrip);
      replace(this.editEvent, oldEditEvent);
    } else {
      render(this.container, this.tripEvent.getElement());
    }
    this.tripEvent.editForm = () => {
      replace(this.editEvent, this.tripEvent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    this.editEvent.openEvent = () => {
      replace(this.tripEvent, this.editEvent);
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        this.editEvent.openEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    this.editEvent.favoriteEvent = () => {
      this._onDataChange(this.trips, Object.assign({}, this.trips, {
        favorites: !this.trips.favorites,
      }));
    };
  }
}
