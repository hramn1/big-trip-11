import {createElement} from "../utils";

const getTemplateInfoRoute = (trips) => {
  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let it of trips){
      totalPrice += it.price
    }
     return totalPrice;
  }
  const getVisitedCities = () => {
    let City = new Set();
    for (let it of trips){
      City.add(it.city)
    }
    return City.values(2);
  }
  console.log(getVisitedCities())
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
      </p>
    </section>`
  );
};
export default class CreateInfoTripTemplate {
  constructor(trip) {
    this.trip = trip;
    this._element = null;
  }
  getTemplate() {
    return getTemplateInfoRoute(this.trip);
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
