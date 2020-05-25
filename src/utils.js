export const TOTALTRIP = 2;
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};
export const AUTHORIZATION = `Basic er883jdzbdwh`;
export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
export const MONTH_NAMES = [
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
export const FilterType = {
  ALL: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};
export const addZero = (number) => number.toString().padStart(2, `0`);
export const generatorRandom = {
  generateRandomNumber(min, max) {
    return (min + Math.random() * (max - min)).toFixed(1);
  },
  splitStr(str) {
    return str.split(`.`);
  },
  generateRandomCount(count) {
    return Math.floor(Math.random() * count);
  },
};
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const unrender = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const getPointsByFilter = (tripEvents, filterType) => {
  tripEvents.slice().sort((a, b) => a.tripDate - b.tripDate);

  switch (filterType) {
    case FilterType.PAST:
      return tripEvents.filter((tripEvent) => tripEvent.tripDateEnd < Date.now());
    case FilterType.FUTURE:
      return tripEvents.filter((tripEvent) => tripEvent.tripDate > Date.now());
  }
  return tripEvents;
};

export const getPointsOrdered = (tripEvents) => {
  return tripEvents.slice().sort((a, b) => a.startTime - b.startTime);
};
export const getPreTitleCity = (point) => {
  if (point === `check-in` || point === `sightseeing` || point === `restaurant`) {
    return `in`;
  } else {
    return `to`;
  }
};
export const limitDayMouth = (countOfMouth) => {
  if (countOfMouth === 1) {
    return 28;
  } else if (countOfMouth % 2 === 0) {
    return 31;
  } else {
    return 30;
  }
};
export const getCappitlize = (str) => {
  const firstWord = str[0].toUpperCase();
  return str.replace(str[0], firstWord);
};
export const parseFormatTime = (timeText) => {
  if (!isNaN(new Date(timeText))) {
    return timeText;
  } else {
    // в формате DD/MM/YY hh:mm
    const newDate = new Date();

    newDate.setFullYear(2000 + parseInt(timeText.slice(6, 8), 10), parseInt(timeText.slice(3, 5), 10) - 1, parseInt(timeText.slice(0, 2), 10));

    newDate.setHours(parseInt(timeText.slice(9, 11), 10), parseInt(timeText.slice(12, 14), 10), 0, 0);

    return newDate;
  }
};
export const generateId = () => {
  return String(30 + Math.floor(Math.random() * 10));
};
