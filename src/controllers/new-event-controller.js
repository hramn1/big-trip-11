import {default as CreateFormNewEventTemplate} from '../components/new-event';
import {Position, render, unrender} from "../utils";
export default class NewEventController {
  constructor(container, trips, onDataChange, onViewChangeNewTrip) {
    this.trips = trips;
    this._onDataChange = onDataChange;
    this._onViewChangeNewTrip = onViewChangeNewTrip;
    this.templateFormCreate = null;
  }
  bind() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, ()=>{
      this.render();
    });
  }
  render() {
    document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `disabled`);
    this._onViewChangeNewTrip();
    this.templateFormCreate = new CreateFormNewEventTemplate();

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
  }
  saveTrip(evt, data) {
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
    unrender(this.templateFormCreate);
    this._onDataChange(null, Object.assign({}, this.trips, {
      city: data.get(`event-destination`),
    }));
  }
}
