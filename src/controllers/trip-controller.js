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
    const tripEvent = new CreatePointRoute(this.trips);
    const editEvent = new CreateEditEven(this.trips, tripData, offers);

    tripEvent.editForm = () => {
      replace(editEvent, tripEvent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    editEvent.openEvent = () => {
      replace(tripEvent, editEvent);
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        editEvent.openEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    render(this.container, tripEvent.getElement());
    editEvent.favoriteEvent = () => {
      this._onDataChange(this.trips, Object.assign({}, this.trips, {
        favorites: !this.trips.favorites,
      }));
    };
  }
}
