import {createElement} from "../utils";

const getTemplateTripDays = (trips) => {
  const MONTH_NAMES = [
    `JAN`,
    `FEB`,
    `MAR`,
    `APR`,
    `MAY`,
    `JUN`,
    `JUL`,
    `AUG`,
    `SEP`,
    `OCT`,
    `NOV`,
    `DEC`
  ];
  const TIME_VALUES = {
    millisecond: 1000,
    hour: 24,
    second: 60,
    minutes: 60,
  };
  let dayOfMouth = trips[0].tripDate.getDate() - 1;
  let countOfMouth = trips[0].tripDate.getMonth();
  const limitDayMouth = () => {
    if (countOfMouth === 1) {
      return 28;
    } else if (countOfMouth % 2 === 0) {
      return 31;
    } else {
      return 30;
    }
  };
  const getTotalDay = () => {
    const countDay = Math.round((trips[trips.length - 1].tripDate - trips[0].tripDate) / TIME_VALUES.millisecond / TIME_VALUES.second / TIME_VALUES.minutes / TIME_VALUES.hour) + 1;
    return countDay;
  };
  const arrDay = [];
  for (let i = 0; i < getTotalDay(); i++) {
    arrDay.push(i + 1);
  }
  const templateDay = (it) => {
    dayOfMouth = dayOfMouth + 1;
    if (dayOfMouth > limitDayMouth()) {
      dayOfMouth = 1;
      countOfMouth += 1;
    }
    return (
      `<li class="trip-days__item  day" data-day="${countOfMouth} ${dayOfMouth}">
        <div class="day__info">
          <span class="day__counter">${it}</span>
          <time class="day__date" datetime="${MONTH_NAMES[countOfMouth]} ${dayOfMouth}">${MONTH_NAMES[countOfMouth]} ${dayOfMouth}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  };
  const dayMarkup = arrDay.map((it) => templateDay(it)).join(`\n`);
  return (
    `<ul class="trip-days">${dayMarkup}</ul>`
  );
};
export default class CreateTripDays {
  constructor(trip) {
    this.trip = trip;
    this._element = null;
  }
  getTemplate() {
    return getTemplateTripDays(this.trip);
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
