import {createElement} from "../utils";

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
    const hourMinute = `${tripDate.getHours()}:${tripDate.getMinutes()}`;
    return hourMinute;
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
        <p class="event__duration">${trip.timeTrip}M</p>
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
  // return (
  //   `<li class="trip-events__item">
  //     ${typeTripPoint}
  //   </li>`
  // );
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
      this.bind();
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
  editForm() {}
  bind() {
    const element = this._element;
    element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      this.editForm(evt);
    });
  }
}
