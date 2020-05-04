import {createElement} from "../utils";

export const getTemplatePointRoute = (trip) => {
  const typeTripPoint = (it) => {
    const offerTripPoint = (item) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${item.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
          </li>`
      );
    };
    const offerTripMarkup = it.offers.map((item) => offerTripPoint(item)).join(`\n`);

    const getHourMinuteStart = (tripDate) => {
      const hourMinute = `${tripDate.getHours()}:${tripDate.getMinutes()}`;
      return hourMinute;
    };
    return (
      `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${it.type.toLowerCase()}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${it.type} to ${it.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${it.tripDate}">${getHourMinuteStart(it.tripDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${it.tripDateEnd}">${getHourMinuteStart(it.tripDateEnd)}</time>
          </p>
          <p class="event__duration">${it.timeTrip}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${it.price}</span>
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
  const typeTripMarkup = trip.map((it, i) => typeTripPoint(it, i === 0)).join(`\n`);
  return (
    `<li class="trip-events__item">
      ${typeTripMarkup}
    </li>`
  );
};
export default class CreatePointRoute {
  constructor(trip) {
    this.trip = trip;
    this._element = null;
  }
  getTemplate() {
    return getTemplatePointRoute(this.trip);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
