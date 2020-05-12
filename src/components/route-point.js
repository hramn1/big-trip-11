import {addZero} from "../utils";
import {default as AbstractSmartComponent} from "./abstract-smart";

const getTemplatePointRoute = (trip) => {
  const offerTripPoint = (item) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
        </li>`
    );
  };
  const offerTripMarkup = trip.offers.map((item) => offerTripPoint(item)).join(`\n`);

  const getHourMinuteStart = (tripDate) => {
    const hourMinute = `${addZero(tripDate.getHours())}:${addZero(tripDate.getMinutes())}`;
    return hourMinute;
  };
  const formatTimeInterval = (diff) => {
    const intervalMinutes = diff % 60;
    diff = Math.floor(diff / 60); // hours
    const intervalHours = diff % 24;
    diff = Math.floor(diff / 24); // days
    const intervalDays = diff;

    return `${intervalDays ? intervalDays + `D ` : `` }${intervalHours ? intervalHours + `H ` : ``}${intervalMinutes}M`;
  };
  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${trip.type.toLowerCase()}.png" alt="Event type icon">
      </div>

      <h3 class="event__title">${trip.type} to ${trip.city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${trip.tripDate}">${getHourMinuteStart(trip.tripDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${trip.tripDateEnd}">${getHourMinuteStart(trip.tripDateEnd)}</time>
        </p>
        <p class="event__duration">${formatTimeInterval(trip.timeTrip)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${trip.price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          ${offerTripMarkup}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};
export default class CreatePointRoute extends AbstractSmartComponent {
  constructor(trip) {
    super();
    this.trip = trip;
  }
  getTemplate() {
    return getTemplatePointRoute(this.trip);
  }
  editForm() {}
  bind() {
    this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      this.editForm(evt);
    });
  }
}
