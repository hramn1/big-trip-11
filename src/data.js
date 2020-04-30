import {generatorRandom} from './utils';
export const tripData = {
  "id": [1, 100],
  "type": [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`],
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
  "beginTrip": new Date(),
};
export const offers = [
  {
    id: `luggage`,
    title: `Add luggage`,
    isChecked: true,
    price: 20,
  },
  {
    id: `comfort`,
    title: `Switch to comfort class`,
    isChecked: true,
    price: 50,
  },
  {
    id: `meal`,
    title: `Add meal`,
    isChecked: true,
    price: 20,
  },
  {
    id: `seats`,
    title: `Choose seats`,
    isChecked: true,
    price: 60,
  },
  {
    id: `train`,
    title: `Travel by train`,
    isChecked: true,
    price: 50,
  },
  {
    id: `uber`,
    title: `Order Uber`,
    isChecked: false,
    price: 60,
  },
  {
    id: `lunch`,
    title: `Lunch in city`,
    isChecked: false,
    price: 20,
  },
  {
    id: `car`,
    title: `Rent a car`,
    isChecked: true,
    price: 20,
  },
  {
    id: `tickets`,
    title: `Book tickets`,
    isChecked: false,
    price: 120,
  },
  {
    id: `breakfast`,
    title: `Add breakfast`,
    isChecked: false,
    price: 20,
  }
];
const generateDesk = () => {
  const deskStr = generatorRandom.splitStr(tripData.finalDestination.description);
  deskStr.length = Math.round(generatorRandom.generateRandomNumber(1, 5));
  return deskStr.join();
};
let intervalTrip = Math.round(generatorRandom.generateRandomNumber(5, 30));
let timeTrip = Math.round(generatorRandom.generateRandomNumber(30, 180));
const getNewDateTrip = () => {
  let tripDate = tripData.beginTrip;
  return new Date(tripDate.setMinutes(tripDate.getMinutes() + intervalTrip + timeTrip));
};
export const generateTripData = () => {
  return {
    "type": tripData.type[Math.round(generatorRandom.generateRandomCount(tripData.type.length))],
    "id": Math.round(generatorRandom.generateRandomNumber(1, 1000)),
    "price": Math.round(generatorRandom.generateRandomNumber(5, 200)),
    "description": generateDesk(),
    "picture": `http://picsum.photos/248/152?r=${Math.random()}`,
    "intervalTrip": intervalTrip,
    "timeTrip": timeTrip,
    "tripDate": getNewDateTrip(),
  };
};
export const generateFilters = () => {
  return [
    {
      name: `Everything`,
      currentFilter: true
    },
    {
      name: `Future`,
      currentFilter: false
    },
    {
      name: `Past`,
      currentFilter: false
    },
  ];
};
export const generateSort = () => {
  return [
    {
      name: `event`,
      currentFilter: false
    },
    {
      name: `time`,
      currentFilter: false
    },
    {
      name: `price`,
      currentFilter: false
    }
  ];
};