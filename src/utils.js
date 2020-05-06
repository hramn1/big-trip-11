export const TOTALTRIP = 15;
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
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

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
