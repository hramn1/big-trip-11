import {default as AbstractSmartComponent} from "./abstract-smart";
import {getPreTitleCity, getCappitlize} from "../utils";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

const editEventMarkup = (trip, pointModel, tripFavor, transport, price, city) => {

  const isFavorite = (tripFavor) ? ` checked` : ``;
  const offers = pointModel.getOffers();
  const cities = pointModel.getCities();
  const typesTransport = offers.map((it) => it.type);
  const cityDest = cities.map((it) => it.name);
  const getTripTypeWithPre = () => {
    return `${getCappitlize(transport)} ${getPreTitleCity(transport)}`;
  };
  const typeTransport = (it) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-${trip.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}">
        <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-${trip.id}">${it}</label>
      </div>`
    );
  };
  const typeTransportMarkup = typesTransport.slice(0, 7).map((it) => typeTransport(it)).join(`\n`);
  const typeActivityMarkup = typesTransport.slice(7).map((it) => typeTransport(it)).join(`\n`);
  // Офер
  const getOffers = (it) => {
    const offerTittleChecked = trip.offers.map((item) => item.title);
    const isChecked = (offerTittleChecked.some((elem) => elem === it.title)) ? ` checked` : ``;
    return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.title}" type="checkbox" name="event-offer-${it.title}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${it.title}">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </label>
  </div>`;
  };
  const offersMarkup = offers.map((it) => {
    if (it.type === transport) {
      return it.offers.map((items) => getOffers(items)).join(`\n`);
    }
    return ``;
  }).join(`\n`);

  // города
  const cityTrip = (it) => {
    return `
    <option value="${it}"></option>
  `;
  };
  const cityTripMarkup = cityDest.map((it) => cityTrip(it)).join(`\n`);

  return (
    `<form class="event  event--edit" action="#" method="post">
                  <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-${trip.id}">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${transport.toLowerCase()}.png" alt="Event type icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${trip.id}" type="checkbox">

                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Transfer</legend>
                         ${typeTransportMarkup}
                        </fieldset>

                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Activity</legend>
                          ${typeActivityMarkup}
                        </fieldset>
                      </div>
                    </div>
                    <div class="event__field-group  event__field-group--destination">
                      <label class="event__label  event__type-output" for="event-destination-${trip.id}">
                        ${getTripTypeWithPre()}
                      </label>
                      <input class="event__input  event__input--destination" id="event-destination-${trip.id}" type="text" name="event-destination" value="${encode(city)}" list="destination-list-${trip.id}">
                      <datalist id="destination-list-${trip.id}">
                          ${cityTripMarkup}
                      </datalist>
                    </div>
                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-${trip.id}">
                        From
                      </label>
                      <input class="event__input  event__input--time" id="event-start-time-${trip.id}" type="text" name="event-start-time" value="${trip.tripDate}">
                      &mdash;
                      <label class="visually-hidden" for="event-end-time-${trip.id}">
                        To
                      </label>
                      <input class="event__input  event__input--time" id="event-end-time-${trip.id}" type="text" name="event-end-time" value="${trip.tripDateEnd}">
                    </div>

                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${(price)}">
                    </div>

                    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                    <button class="event__reset-btn" type="reset">Delete</button>

                    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
                    <label class="event__favorite-btn" for="event-favorite-1">
                      <span class="visually-hidden">Add to favorite</span>
                      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                      </svg>
                    </label>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </header>

                  <section class="event__details">
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                      <div class="event__available-offers">
                                       ${offersMarkup}
                      </div>
                    </section>
                  </section>
                </form>`
  );
};
export default class CreateEditEvent extends AbstractSmartComponent {
  constructor(trip, pointModel) {
    super();
    this.trip = trip;
    this.pointModel = pointModel;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this.tripFavor = !!trip.favorites;
    this.transport = trip.type;
    this.priceTrip = trip.price;
    this.city = trip.city;
    this._applyFlatpickr();
  }

  getTemplate() {
    return editEventMarkup(this.trip, this.pointModel, this.tripFavor, this.transport, this.priceTrip, this.city);
  }


  recoveryListeners() {
    // this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.tripFavor = !!this.trip.favorites;
    this.transport = this.trip.type;
    this.priceTrip = this.trip.price;
    this.city = this.trip.city;
    this.rerender();
  }

  openEvent() {
  }

  _applyFlatpickr() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }
    const dateElementStaty = this.getElement().querySelector(`#event-start-time-${this.trip.id}`);
    this._flatpickrStart = flatpickr(dateElementStaty, {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this.trip.tripDate,
    });
    const dateElementEnd = this.getElement().querySelector(`#event-end-time-${this.trip.id}`);
    this._flatpickrEnd = flatpickr(dateElementEnd, {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this.trip.tripDateEnd,
    });
  }

  // _subscribeOnEvents() {
  //   const element = this.getElement();
  //
  //   element.querySelector(`.event__rollup-btn`)
  //     .addEventListener(`click`, () => {
  //       this.rerender();
  //     });
  // }
  changeTypeTransport(evt) {
    this.transport = evt.target.value;
    this.rerender();
  }

  favoriteEvent() {
    this.tripFavor = !this.tripFavor;
    this.rerender();
  }

  validatePrice(evt) {
    if (isNaN(evt.target.value)) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, ``);
    }
    this.priceTrip = evt.target.value;
  }

  changeCity(evt) {
    this.city = evt.target.value;
    this.rerender();
  }
  deleteTrip() {}

  saveTrip() {}

  bind() {
    this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      this.openEvent(evt);
      this.removeElement();
    });
    this._element.querySelector(`.event__favorite-btn`).addEventListener(`click`, (evt) => {
      this.favoriteEvent(evt);
    });
    this._element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this.changeTypeTransport(evt);
    });
    this._element.querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
      this.deleteTrip(evt);
    });
    this._element.querySelector(`.event__save-btn `).addEventListener(`click`, (evt) => {
      this.saveTrip(evt, this);
    });
    this._element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      this.validatePrice(evt);
    });
    this._element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this.changeCity(evt);
    });
  }
}
