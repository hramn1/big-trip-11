import {default as CreateFormNewEventTemplate} from '../components/new-event';
import {Position, render, unrender} from "../utils";
export default class NewEventController {
  constructor(container, trips, onDataChange, onViewChange) {
    this.trips = trips;
    this.container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.templateFormCreate = null;
  }
  bind() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, ()=>{
      this.render();
    });
  }
  render() {
    this.templateFormCreate = new CreateFormNewEventTemplate();

    let container = document.querySelector(`.trip-events__trip-sort`);
    if(container === null){
      container = document.querySelector(`.trip-events`)
      render(container, this.templateFormCreate.getElement(), Position.AFTERBEGIN);

    } else {
      render(container,  this.templateFormCreate.getElement(), Position.AFTER);

    }
    this.templateFormCreate.saveTrip = (evt, data) =>{
      evt.preventDefault()
      this.saveTrip(evt, data)
    }
  }
  saveTrip(evt, data){

    unrender(this.templateFormCreate)
    this._onViewChange();

    this._onDataChange(null, Object.assign({}, this.trips, {
      city: data.get(`event-destination`),
    }));
  }
}
