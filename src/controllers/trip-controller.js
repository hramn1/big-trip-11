import {default as CreatePointRoute} from '../components/route-point';
import {default as CreateEditEven} from '../components/edit-event';
import {tripData, offers} from '../data';
import {render, replace, unrender} from "../utils";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TripController {
  constructor(trips, container, onDataChange, onViewChange) {
    this.tripsOld = trips;
    this.container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this.tripEvent = null;
    this.editEvent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }
  init(trip) {
    this.trips = trip;
    const oldETrip = this.tripEvent;
    const oldEditEvent = this.editEvent;
    this.tripEvent = new CreatePointRoute(this.trips);
    this.editEvent = new CreateEditEven(this.trips, tripData, offers);

    this.tripEvent.editForm = () => {
      this._replaceEditToEvent();
    };
    this.editEvent.openEvent = () => {
      this._replaceEventToEdit();
    };

    this.editEvent.favoriteEvent = () => {
      this._favoriteEvent();
    };
    this.editEvent.changeTypeTransport = (evt) => {
      this._changeTypeTransport(evt.target.value);
    };
    this.editEvent.deleteTrip = () => {
      this._deleteTrip();

    }
    if (oldETrip && oldEditEvent) {
      replace(this.tripEvent, oldETrip);
      replace(this.editEvent, oldEditEvent);
    } else {
      render(this.container, this.tripEvent.getElement());
    }
  }
  _favoriteEvent() {
    this._onDataChange(this.trips, Object.assign({}, this.trips, {
      favorites: !this.trips.favorites,
    }));
  }
  _changeTypeTransport(transport) {
    this._onDataChange(this.trips, Object.assign({}, this.trips, {
      type: transport,
    }));
  }
  _deleteTrip() {
    this._onDataChange(this.trips, null);
  }
  _replaceEventToEdit() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this.editEvent.reset(this.tripsOld);
    replace(this.tripEvent, this.editEvent);
    this._mode = Mode.DEFAULT;

  }
  _replaceEditToEvent() {
    this._onViewChange();
    replace(this.editEvent, this.tripEvent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
    this.editEvent._applyFlatpickr();
  }
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEventToEdit();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  destroy() {
    unrender(this.tripEvent);
    unrender(this.editEvent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEventToEdit();
    }
  }
}
