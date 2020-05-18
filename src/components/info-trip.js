import {MONTH_NAMES} from "../utils";
import {default as AbstractComponent} from "./abstract";

const getTemplateInfoRoute = (trips) => {
  const getTotalPrice = () => {
    let totalPrice = 0;
    let totalPriceOffer = 0;
    for (let it of trips) {
      for (let item of it.offers) {
        totalPriceOffer += item.price;
      }
      totalPrice += it.price;
    }
    totalPrice += totalPriceOffer;
    return totalPrice;
  };
  const getVisitedCities = () => {
    let city = new Set();
    for (let it of trips) {
      city.add(it.city);
    }
    let cityArr = Array.from(city);
    if (cityArr.length > 3) {
      return `${cityArr[0]} — ... — ${cityArr[cityArr.length - 1]}`;
    } else if (cityArr.length === 2) {
      return `${cityArr[0]} — ${cityArr[cityArr.length - 1]}`;
    } else if (cityArr.length === 1) {
      return `${cityArr[0]}`;
    } else if (cityArr.length === 0) {
      return ``;
    } else {
      return `${cityArr[0]} — ${cityArr[1]} — ${cityArr[cityArr.length - 1]}`;
    }
  };

  const getDateInfo = () => {
    if (trips.length === 0) {
      return ``;
    }
    const startTripMounth = trips[0].tripDate.getMonth() || 0;
    const startTripDay = trips[0].tripDate.getDate() || 0;
    const endTripMounth = trips[trips.length - 1].tripDate.getMonth();
    const endTripDay = trips[trips.length - 1].tripDate.getDate();
    let infoMounth = MONTH_NAMES[endTripMounth];
    if (startTripMounth === endTripMounth) {
      infoMounth = ``;
    }
    return `${MONTH_NAMES[startTripMounth]} ${startTripDay}&nbsp;&mdash;&nbsp;${endTripDay} ${infoMounth}`;
  };
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getVisitedCities()}</h1>

        <p class="trip-info__dates">${getDateInfo()}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
      </p>
    </section>`
  );
};
export default class CreateInfoTripTemplate extends AbstractComponent {
  constructor(pointModel) {
    super();
    this.pointModel = pointModel;
  }
  getTemplate() {
    return getTemplateInfoRoute(this.pointModel.getPointsAll());
  }
}
