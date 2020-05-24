import {default as CreatePointRoute} from '../components/route-point';
import {default as CreateEditEven} from '../components/edit-event';
import {render, replace, unrender} from "../utils";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TripController {
  constructor(pointModel, container, onDataChange, onViewChange) {
    this.container = container;
    this.pointModel = pointModel;
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
    this.editEvent = new CreateEditEven(this.trips, this.pointModel);

    this.tripEvent.editForm = () => {
      this._replaceEditToEvent();
    };
    this.editEvent.openEvent = () => {
      this._replaceEventToEdit();
    };


    this.editEvent.deleteTrip = () => {
      this.editEvent.getElement().querySelector(`.event__reset-btn`).textContent = `Deleting`;
      this._deleteTrip();
    };
    this.editEvent.saveTrip = (evt, newObj) => {
      evt.preventDefault();
      this.editEvent.getElement().querySelector(`.event__save-btn`).textContent = `Saving`;
      this._saveTrip(newObj);
    };
    if (oldETrip && oldEditEvent) {
      replace(this.tripEvent, oldETrip);
      replace(this.editEvent, oldEditEvent);
    } else {
      render(this.container, this.tripEvent.getElement());
    }
  }
  _deleteTrip() {
    this._onDataChange(this.trips, null);
  }
  _saveTrip(newObj) {
    let saveTrip = Object.defineProperty(this.trips, `favorites`, {
      value: newObj.tripFavor
    });
    saveTrip = Object.defineProperty(this.trips, `type`, {
      value: newObj.transport
    });
    saveTrip = Object.defineProperty(this.trips, `price`, {
      value: Number(newObj.priceTrip)
    });
    saveTrip = Object.defineProperty(this.trips, `city`, {
      value: newObj.city
    });
    this._onDataChange(this.trips, saveTrip);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
  _replaceEventToEdit() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this.editEvent.reset();
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
