import {default as AbstractSmartComponent} from "./abstract-smart";
import flatpickr from "flatpickr";
import moment from "moment";
import "flatpickr/dist/flatpickr.min.css";

const editEventMarkup = (trip, tripData, offers) => {
  const isFavorite = (trip.favorites) ? ` checked` : ``;
  const typeTransport = (it) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-${trip.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.type}">
        <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-${trip.id}">${it}</label>
      </div>`
    );
  };
  const typeTransportMarkup = tripData.type.slice(0, 7).map((it) => typeTransport(it)).join(`\n`);
  const typeActivityMarkup = tripData.type.slice(7).map((it) => typeTransport(it)).join(`\n`);
  // Офер
  const getOffers = (it) => {
    const isChecked = (it.isChecked) ? ` checked` : ``;
    return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.id}" type="checkbox" name="event-offer-${it.id}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${it.id}">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </label>
  </div>`;
  };
  const offersMarkup = offers.map((it) => getOffers(it)).join(`\n`);
  // города
  const cityTrip = (it) => {
    return `
    <option value="${it}"></option>
  `;
  };
  const cityTripMarkup = tripData.finalDestination.city.map((it) => cityTrip(it)).join(`\n`);

  return (
    `<form class="event  event--edit" action="#" method="post">
                  <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-${trip.id}">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${trip.type.toLowerCase()}.png" alt="Event type icon">
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
                        ${trip.type} to
                      </label>
                      <input class="event__input  event__input--destination" id="event-destination-${trip.id}" type="text" name="event-destination" value="${trip.city}" list="destination-list-${trip.id}">
                      <datalist id="destination-list-1">
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
                      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${trip.price}">
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
  constructor(trip, tripData, offers) {
    super();
    this.trip= trip;
    this.tripData = tripData;
    this.offers = offers;
    this._flatpickrStart = null;
    this._applyFlatpickr();

  }
  getTemplate() {
    return editEventMarkup(this.trip, this.tripData, this.offers);

  }


  recoveryListeners() {
    // this.openEvent(this.openEvent);
    // this.favoriteEvent(this.favoriteEvent);
    // this.setFavoriteCheckboxClickHandler(this._favoriteCheckboxClickHandler);
    // this.setEditButtonClickHandler(this._editButtonClickHandler);
    //
    this._subscribeOnEvents();
  }
  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset(oldData) {
    this.trip = oldData;
    //trip.favorites = oldData.favorites;
    this.rerender();
  }
  openEvent() {}
  favoriteEvent() {}
  _applyFlatpickr() {
    if (this._flatpickrStart) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickrStart.destroy()
      this._flatpickrStart = null
      }



        const dateElementStaty = this.getElement().querySelector(`#event-start-time-${this.trip.id}`);
        this._flatpickrStart = flatpickr(dateElementStaty, {
          altInput: true,
          allowInput: true,
          defaultDate: 'today',
        })

  }
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.rerender();
      });
  }


  bind() {
    this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      this.openEvent(evt);
      this.removeElement();
    });
    this._element.querySelector(`.event__favorite-btn`).addEventListener(`click`, (evt) => {
      this.favoriteEvent(evt);
    });
  }
}
