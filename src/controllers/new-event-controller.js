import {default as CreateFormNewEventTemplate} from '../components/new-event';
import {Position, render, unrender} from "../utils";
export default class NewEventController {
  constructor(container, trips, statisticsComponent, templateMenu, pointModel, onDataChange, onViewChangeNewTrip) {
    this.trips = trips;
    this.pointModel = pointModel;
    this._onDataChange = onDataChange;
    this._onViewChangeNewTrip = onViewChangeNewTrip;
    this._statisticsComponent = statisticsComponent;
    this._templateMenu = templateMenu;
    this.templateFormCreatej = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }
  bind() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, ()=>{
      if (this.templateFormCreatej) {
        unrender(this.templateFormCreatej);
        this.templateFormCreatej = null;
      } else {
        document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `disabled`);
        this.render();

      }
    });
  }
  render() {
    this._onViewChangeNewTrip();
    this._statisticsComponent.hide();
    this._templateMenu.setDefault();
    this.templateFormCreatej = new CreateFormNewEventTemplate(this.pointModel);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    let container = document.querySelector(`.trip-events__trip-sort`);
    if (container === null) {

      container = document.querySelector(`.trip-events`);
      render(container, this.templateFormCreatej.getElement(), Position.AFTERBEGIN);
    } else {
      render(container, this.templateFormCreatej.getElement(), Position.AFTER);
    }
    this.templateFormCreatej.saveTrip = (evt, data) => {
      evt.preventDefault();
      this.saveTrip(evt, data);
    };
    this.templateFormCreatej.delete = (evt) => {
      evt.preventDefault();
      this.deleteTrip();
    };
  }
  deleteTrip() {
    this.setDefaultViev();
  }
  setDefaultViev() {
    if (this.templateFormCreatej) {
      unrender(this.templateFormCreatej);
      this.templateFormCreatej = null;
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this.setDefaultViev();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  shake() {
    const removeShake = () => {
      this.templateFormCreatej.getElement().classList.remove(`shake`);
    };
    this.templateFormCreatej.getElement().classList.add(`shake`);
    setTimeout(removeShake, 2000);
  }
  saveTrip() {
    const newObj = this.templateFormCreatej.getData();
    const saveTrip = Object.create(this.trips[0]);
    this.templateFormCreatej.getElement().querySelector(`.event__save-btn`).textContent = `Saving`;
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        Object.defineProperty(saveTrip, key, {
          value: newObj[key]
        });
      }
    }
    this._onDataChange(null, saveTrip);
  }
}
