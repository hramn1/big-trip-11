import {MONTH_NAMES} from "../utils";
import {default as AbstractComponent} from './abstract';

const getTemplateTripDays = (trips) => {

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
    //console.log(Date.parse((trips[trips.length - 1].tripDate)))

    const countDay = (Date.parse((trips[trips.length - 1].tripDate)) - Date.parse((trips[0].tripDate))) / TIME_VALUES.millisecond / TIME_VALUES.second / TIME_VALUES.minutes / TIME_VALUES.hour;
    return countDay;
  };
  const b =  getTotalDay()
  console.log(b)
  const arrDay = [];
  for (let i = 0; i < b; i++) {
    arrDay.push(i + 1);
  }
  const templateDay = (it) => {
    dayOfMouth = dayOfMouth + 1;
    if (dayOfMouth > limitDayMouth()) {
      dayOfMouth = 1;
      countOfMouth += 1;
    }
    return (
      `<li class="trip-days__item  day" >
        <div class="day__info">
          <span class="day__counter">${it}</span>
          <time class="day__date" datetime="${MONTH_NAMES[countOfMouth]} ${dayOfMouth}">${MONTH_NAMES[countOfMouth]} ${dayOfMouth}</time>
        </div>
        <ul class="trip-events__list">
        <li class="trip-events__item" data-day="${countOfMouth} ${dayOfMouth}"></li>
</ul>
      </li>`
    );
  };
  const dayMarkup = arrDay.map((it) => templateDay(it)).join(`\n`);
  return (
    `<ul class="trip-days">${dayMarkup}</ul>`
  );
};
export default class CreateTripDays extends AbstractComponent {
  constructor(trip) {
    super();
    this.trip = trip;
  }
  getTemplate() {
    return getTemplateTripDays(this.trip);
  }
}
