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
    this.templateFormCreate = null;
  }
  bind() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, ()=>{
      if (this.templateFormCreate) {
        unrender(this.templateFormCreate);
        this.templateFormCreate = null;
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
    this.templateFormCreate = new CreateFormNewEventTemplate(this.pointModel);

    let container = document.querySelector(`.trip-events__trip-sort`);
    if (container === null) {

      container = document.querySelector(`.trip-events`);
      render(container, this.templateFormCreate.getElement(), Position.AFTERBEGIN);
    } else {
      render(container, this.templateFormCreate.getElement(), Position.AFTER);
    }
    this.templateFormCreate.saveTrip = (evt, data) =>{
      evt.preventDefault();
      this.saveTrip(evt, data);
    };
    this.templateFormCreate.delete = (evt) =>{
      evt.preventDefault();
      this.deleteTrip();
    };
  }
  deleteTrip() {
    this.setDefaultviev();
  }
  setDefaultviev() {
    unrender(this.templateFormCreate);
    this.templateFormCreate = null;
  }
  saveTrip() {
    const newObj = this.templateFormCreate.getData();
    const trip = this.trips[0];

    let saveTrip = Object.defineProperty(trip, `favorites`, {
      value: false
    });
    saveTrip = Object.defineProperty(trip, `type`, {
      value: newObj.eventType
    });
    saveTrip = Object.defineProperty(trip, `price`, {
      value: Number(newObj.price)
    });
    saveTrip = Object.defineProperty(trip, `city`, {
      value: newObj.destination
    });
    saveTrip = Object.defineProperty(trip, `tripDate`, {
      value: newObj.startTime
    });
    saveTrip = Object.defineProperty(trip, `tripDateEnd`, {
      value: newObj.endTime
    });
    saveTrip = Object.defineProperty(trip, `offers`, {
      value: newObj.offers
    });
    this._onDataChange(null, saveTrip);
  }
}
