import {generatorRandom} from './utils';
const tripData = {
  "id": [1, 100],
  "type": [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`],
  "finalDestination": {
    "city": [`Hell`, `Nifelheim`, `Moscow`],
    "picture": `http://picsum.photos/248/152?r=${Math.random()}`,
    "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
      Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
      Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
      Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  },
  "price": [5, 200],
};
const Offer = {
  LUGGAGE: {
    id: `luggage`,
    title: `Add luggage`
  },
  COMFORT: {
    id: `comfort`,
    title: `Switch to comfort class`
  },
  MEAL: {
    id: `meal`,
    title: `Add meal`,
  },
  SEATS: {
    id: `seats`,
    title: `Choose seats`,
  },
  TRAIN: {
    id: `train`,
    title: `Travel by train`,
  },
  UBER: {
    id: `uber`,
    title: `Order Uber`,
  },
  LUNCH: {
    id: `lunch`,
    title: `Lunch in city`,
  },
  CAR: {
    id: `car`,
    title: `Rent a car`,
  },
  TICKETS: {
    id: `tickets`,
    title: `Book tickets`,
  },
  BREAKFAST: {
    id: `breakfast`,
    title: `Add breakfast`,
  }
};
const generateDesk = () => {
  const deskStr = generatorRandom.splitStr(tripData.finalDestination.description);
  deskStr.length = Math.round(generatorRandom.generateRandomNumber(1, 5));
  return deskStr.join();
};
export const generateTripData = () => {
  return {
    "type": tripData.type[Math.round(generatorRandom.generateRandomCount(tripData.type.length))],
    "id": Math.round(generatorRandom.generateRandomNumber(1, 1000)),
    "price": Math.round(generatorRandom.generateRandomNumber(5, 200)),
    "description": generateDesk(),
    "picture": `http://picsum.photos/248/152?r=${Math.random()}`,


  };
};
