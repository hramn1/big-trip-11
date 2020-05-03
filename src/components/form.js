export const getTemplateFormCreate = (trip, offers, tripData) => {
  // транспорт
  const typeTransport = (it) => {
    return `
        <div class="event__type-item">
          <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="it">
          <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
        </div>
    `;
  };
  const typeTransportMarkup = tripData.type.slice(0, 7).map((it) => typeTransport(it)).join(`\n`);
  const typeActivityMarkup = tripData.type.slice(7).map((it) => typeTransport(it)).join(`\n`);
  // Офер
  const getOffers = (it) => {
    const isChecked = (it.isChecked) ? ` checked` : ``;
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.id}-1" type="checkbox" name="event-offer-${it.id}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${it.id}-1">
        <span class="event__offer-title">${it.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
      </label>
    </div>`;
  };
  const offersMarkup = offers.map((it) => getOffers(it)).join(`\n`);
  // Фото
  const offersPhotos = () => {
    return `<img class="event__photo" src="${tripData.finalDestination.picture}" alt="Event photo">`;
  };
  const arrPhoto = Array(5).fill(offersPhotos());
  // города
  const cityTrip = (it) => {
    return `
      <option value="${it}"></option>
    `;
  };
  const cityTripMarkup = tripData.finalDestination.city.map((it) => cityTrip(it)).join(`\n`);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Flight to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripData.finalDestination.city[0]}" list="destination-list-1">
                <datalist id="destination-list-1">
                    ${cityTripMarkup}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${offersMarkup}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${trip[0].description}.</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                  ${arrPhoto}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};
