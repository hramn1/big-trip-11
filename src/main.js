import {default as CreateTemplateMenu, MenuItem} from './components/main-menu';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as Statistics} from "./components/statistics.js";
import {default as BoardController} from './controllers/board-controller';
import {default as FilterController} from './controllers/filter-controller';
import {generateTripData} from './data';
import {render, TOTALTRIP, Position, unrender, AUTHORIZATION, END_POINT} from "./utils";
import {default as PointModel} from "./models/points";
import API from "./api";

const mainContent = document.querySelector(`.trip-events`);
const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const tripMainContainer = document.querySelector(`.trip-main`);


const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
const api = new API(END_POINT, AUTHORIZATION);
const pointModel = new PointModel();
pointModel.setPoints(arrTrip);

api.getPoints()
  .then((points) => {
console.log(points)
    console.log(arrTrip)
  });
api.getCities()
  .then((points) => {
    console.log(points)
  });
const boardController = new BoardController(mainContent, pointModel);
const templateMenu = new CreateTemplateMenu();
const filterController = new FilterController(tripMenu, pointModel);
const templateInfoRoute = new CreateInfoTripTemplate(pointModel);
const statisticsComponent = new Statistics(pointModel);

render(tripMenu, templateMenu.getElement());
// фильтры
filterController.render();
// инфа в хедере
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
pointModel.setDataChangeHandler(() => {
  unrender(templateInfoRoute);
  render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
});
// статистика
render(mainContent, statisticsComponent.getElement(), Position.AFTER);
statisticsComponent.hide();

// доска
boardController.init();
templateMenu.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      boardController.show();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent._renderCharts();
      statisticsComponent.show();
      break;
  }
});
