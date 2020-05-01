export const getTemplateTripDays = (trips) => {
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
    const countDay = Math.round((trips[trips.length - 1].tripDate - trips[0].tripDate) / 1000 / 60 / 60 / 24) + 1;
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
  const dayMarkup = arrDay.map((it, i) => templateDay(it, i === 0)).join(`\n`);
  return (
    `<ul class="trip-days">${dayMarkup}</ul>`
  );
};
