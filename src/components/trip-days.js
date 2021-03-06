import {MONTH_NAMES, limitDayMouth} from "../utils";
import {default as AbstractComponent} from './abstract';

const getTemplateTripDays = (trips) => {
  const sortedDefaultTrip = [...trips].sort((tripsSecond, tripsFirst) => tripsSecond.tripDate - tripsFirst.tripDate);
  if (sortedDefaultTrip.length === 0) {
    return (
      `<ul class="trip-days"></ul>`
    );
  }
  let dayOfMouth = sortedDefaultTrip[0].tripDate.getDate() - 1;
  let countOfMouth = sortedDefaultTrip[0].tripDate.getMonth();

  const mounthMultiplier = () => {
    if (countOfMouth === sortedDefaultTrip[sortedDefaultTrip.length - 1].tripDate.getMonth()) {
      return 0;
    } else if (sortedDefaultTrip[sortedDefaultTrip.length - 1].tripDate.getMonth() - sortedDefaultTrip[0].tripDate.getMonth() === 1) {
      return limitDayMouth(sortedDefaultTrip[0].tripDate.getMonth());
    } else {
      return 0;
    }
  };
  const getTotalDay = () => {
    const countDay = sortedDefaultTrip[sortedDefaultTrip.length - 1].tripDate.getDate() + mounthMultiplier() - sortedDefaultTrip[0].tripDate.getDate();
    return countDay;
  };
  const totalDay = getTotalDay();
  const arrDay = [];
  for (let i = 0; i <= totalDay; i++) {
    arrDay.push(i + 1);
  }
  const templateDay = (it) => {
    dayOfMouth = dayOfMouth + 1;
    if (dayOfMouth > limitDayMouth(sortedDefaultTrip[0].tripDate.getMonth())) {
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
  constructor(trips) {
    super();
    this.trips = trips;
  }
  getTemplate() {
    return getTemplateTripDays(this.trips);
  }
}
