import {default as CreateTemplateMenu} from './components/main-menu';
import {default as CreateFilterTemplate} from './components/filters';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as BoardController} from './controllers/board-controller';
import {generateTripData, generateFilters} from './data';
import {render, TOTALTRIP, Position} from "./utils";
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
const filtersComponent = new CreateFilterTemplate(generateFilters());
render(tripMenu, filtersComponent.getElement());
// инфа в хедере
const templateInfoRoute = new CreateInfoTripTemplate(arrTrip);
const tripMainContainer = document.querySelector(`.trip-main`);
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);

boardController.init();
