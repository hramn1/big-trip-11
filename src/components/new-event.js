import {default as AbstractSmartComponent} from "./abstract-smart";
import {getPreTitleCity, getCappitlize, parseFormatTime, generateId, TRANSFER_EVENT_TYPES, ACTIVITY_EVENT_TYPES} from "../utils";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";
const getTemplateFormCreate = (pointModel, transport, visual, visualDest, saveBtn, city, price, timeStartTrip, timeEndTrip, offer) => {
  const conditionSaveBtn = saveBtn;
  document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
  const offers = pointModel.getOffers();
  const cities = pointModel.getCities();
  const dest = cities.filter((it) => it.name === city);
  let cityDescr = ``;
  let cityPhoto = [];
  if (dest.length > 0) {
    cityDescr = dest[0].description;
    cityPhoto = dest[0].pictures;
  }
  const getTemplatePhoto = (it) =>{
    return (
      `<p><img class="event__photo" src="${it.src}" alt="${it.description}"></p>`
    );
  };

  const TemplatePhotoMarkup = cityPhoto.map((it) => getTemplatePhoto(it)).join(`\n`);

  const typesTransport = offers.map((it) => it.type);
  const cityDest = cities.map((it) => it.name);
  const getTripTypeWithPre = () => {
    return `${getCappitlize(transport)} ${getPreTitleCity(transport)}`;
  };
  const typeTransport = (it) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-99" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}">
        <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-99">${getCappitlize(it)}</label>
      </div>`
    );
  };
  const typeTransportMarkup = typesTransport.filter((item) => TRANSFER_EVENT_TYPES.includes(item)).map((it) => typeTransport(it)).join(`\n`);
  const typeActivityMarkup = typesTransport.filter((item) => ACTIVITY_EVENT_TYPES.includes(item)).map((it) => typeTransport(it)).join(`\n`);
  // // Офер
  const getOffers = (it) => {
    let isChecked = ``;
    for (const item of offer) {
      if (it.title === item.name) {
        isChecked = (item.checked) ? `checked` : ``;
      }
    }
    return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.title}" ${isChecked} type="checkbox" name="${it.title}">
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

  // // города
  const cityTrip = (it) => {
    return `<option value="${it}"></option>`;
  };
  const cityTripMarkup = cityDest.map((it) => cityTrip(it)).join(`\n`);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${transport.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Transfer</legend>
                         ${typeTransportMarkup}
                        </fieldset>

                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Activity</legend>
                          ${typeActivityMarkup}
                        </fieldset>
                      </div>              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${getTripTypeWithPre()}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${encode(city)}" list="destination-list-1">
                <datalist id="destination-list-1">
                          ${cityTripMarkup}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStartTrip}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEndTrip}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" ${conditionSaveBtn} type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
                              <section class="event__details ${visual}">
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                      <div class="event__available-offers">
                                       ${offersMarkup}
                      </div>
                    </section>
                  </section>
                                <section class="event__section  event__section--destination ${visualDest}">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${cityDescr}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                  ${TemplatePhotoMarkup}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};
export default class CreateFormNewEventTemplate extends AbstractSmartComponent {
  constructor(pointModel) {
    super();
    this.pointModel = pointModel;
    this.transport = `choose type`;
    this.visual = `visually-hidden`;
    this.visualDest = `visually-hidden`;
    this.saveBtn = `disabled`;
    this.city = ``;
    this.price = ``;
    this.offer = ``;
    this._flatpickrStart = null;
    this.timeStartTrip = new Date();
    this._flatpickrEnd = null;
    this.timeEndTrip = new Date();
    this._applyFlatpickr();

  }

  getTemplate() {
    return getTemplateFormCreate(this.pointModel, this.transport, this.visual, this.visualDest, this.saveBtn, this.city, this.price, this.timeStartTrip, this.timeEndTrip, this.offer);
  }

  _validate() {
    const cities = this.pointModel.getCities();
    const cityDest = cities.map((it) => it.name);
    const priceTrip = this._element.querySelector(`.event__input--price`).value;
    const cityTrip = this._element.querySelector(`.event__input--destination`).value;

    const cityTripValidate = cityDest.some((el) => el === cityTrip);
    if (priceTrip !== `0` && priceTrip !== `` && cityTripValidate && this.transport !== `choose type`) {
      this.saveBtn = ``;
    } else {
      this.saveBtn = `disabled`;
    }
  }

  _validatePrice(evt) {
    if (isNaN(evt.target.value)) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, ``);
    }
  }

  _getPrice(evt) {
    this._validate();
    this.price = evt.target.value;
    this.rerender();
  }
  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }
  getData() {
    const offers = this.pointModel.getOffers();
    const offersAll = offers.filter((it) => it.type === this.transport);
    const offersMarkup = Array.from(this.offer);
    const offersMarkupFilter = offersMarkup.filter((it) => it.checked === true);
    const dataOffer = [];
    for (const it of offersMarkupFilter) {
      for (const item of offersAll[0].offers) {
        if (item.title === it.name) {
          dataOffer.push(item);
        }
      }
    }
    return {
      id: generateId(),
      type: this.transport,
      city: this.city,
      tripDate: parseFormatTime(this.timeStartTrip),
      tripDateEnd: parseFormatTime(this.timeEndTrip),
      price: Number(this.price),
      offers: dataOffer,
      favorites: false,
    };
  }
  recoveryListeners() {}
  _applyFlatpickr() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }
    const dateElementStaty = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickrStart = flatpickr(dateElementStaty, {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this.timeStartTrip,
    });
    const dateElementEnd = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrEnd = flatpickr(dateElementEnd, {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this.timeEndTrip,
    });
  }
  _changeCity(evt) {
    this._validate();
    this.city = evt.target.value;
    this.visualDest = ``;
    this.rerender();
  }
  _startTrip(evt) {
    this.timeStartTrip = evt.target.value;
    this.rerender();
  }
  _endTrip(evt) {
    this.timeEndTrip = evt.target.value;
    this.rerender();
  }
  saveTrip() {}
  delete() {}
  _getOffers(elements) {
    this.offer = elements;
    this.rerender();
  }
  _changeTypeTransport(evt) {
    this.transport = evt.target.value;
    this._validate();
    this.visual = ``;
    this.rerender();
  }
  bind() {
    this._element.querySelector(`.event__save-btn `).addEventListener(`click`, (evt) => {
      this.saveTrip(evt, this.getData());
    });
    this._element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._changeTypeTransport(evt);
    });
    this._element.querySelector(`.event__reset-btn `).addEventListener(`click`, (evt) => {
      this.delete(evt);
    });
    this._element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      this._validatePrice(evt);
    });
    this._element.querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      this._changeCity(evt);
    });
    this._element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      this._getPrice(evt);
    });
    this._element.querySelector(`#event-start-time-1`).addEventListener(`input`, (evt) => {
      this._startTrip(evt);
    });
    this._element.querySelector(`#event-end-time-1`).addEventListener(`input`, (evt) => {
      this._endTrip(evt);
    });
    if (this._element.querySelectorAll(`.event__offer-checkbox`).length > 0) {
      const elOff = this._element.querySelectorAll(`.event__offer-checkbox`);
      for (let it of elOff) {
        it.addEventListener(`change`, () => {
          this._getOffers(elOff);
        });
      }
    }
  }
}
