import {default as CreateTemplateMenu} from './components/main-menu';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as BoardController} from './controllers/board-controller';
import {default as FilterController} from './controllers/filter-controller';
import {generateTripData} from './data';
import {render, TOTALTRIP, Position, unrender} from "./utils";
import {default as PointModel} from "./models/points";
const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
const pointModel = new PointModel();
pointModel.setPoints(arrTrip);
const mainContent = document.querySelector(`.trip-events`);

const boardController = new BoardController(mainContent, pointModel);
const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const templateMenu = new CreateTemplateMenu();
render(tripMenu, templateMenu.getElement());
// фильтры
const filterController = new FilterController(tripMenu, pointModel);
filterController.render();
// инфа в хедере
const templateInfoRoute = new CreateInfoTripTemplate(pointModel);
const tripMainContainer = document.querySelector(`.trip-main`);
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
pointModel.setDataChangeHandler(() => {
  unrender(templateInfoRoute);
  render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
});
boardController.init();
