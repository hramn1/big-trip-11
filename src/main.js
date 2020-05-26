import {default as CreateTemplateMenu, MenuItem} from './components/main-menu';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as Statistics} from "./components/statistics.js";
import {default as BoardController} from './controllers/board-controller';
import {default as FilterController} from './controllers/filter-controller';
import {default as LoadingTemplate} from './components/loading';
import {render, Position, unrender, AUTHORIZATION, END_POINT} from "./utils";
import {default as PointModel} from "./models/points";
import API from "./api";

const mainContent = document.querySelector(`.trip-events`);
const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const tripMainContainer = document.querySelector(`.trip-main`);


const loader = new LoadingTemplate();
render(mainContent, loader.getElement());
document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `disabled`);
const arrTrip = [];
const api = new API(END_POINT, AUTHORIZATION);
const pointModel = new PointModel();
pointModel.setPoints(arrTrip);

const statisticsComponent = new Statistics(pointModel);

const templateMenu = new CreateTemplateMenu();
const filterController = new FilterController(tripMenu, pointModel, statisticsComponent, templateMenu);
const templateInfoRoute = new CreateInfoTripTemplate(pointModel);

// меню
render(tripMenu, templateMenu.getElement(), Position.AFTERBEGIN);
// фильтры
filterController.render();
// инфа в хедере
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);

const startApplication = (points, cities, offers) => {
  const sortedDefault = [...points].sort((tripsSecond, tripsFirst) => tripsSecond.tripDate - tripsFirst.tripDate);
  unrender(loader);
  document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
  pointModel.setDataChangeHandler(() => {
    unrender(templateInfoRoute);
    render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
  });
  pointModel.setPoints(sortedDefault);
  pointModel.setCities(cities);
  pointModel.setOffers(offers);

  const boardController = new BoardController(mainContent, pointModel, statisticsComponent, templateMenu, api);

  render(mainContent, statisticsComponent.getElement(), Position.AFTER);
  statisticsComponent.hide();
  boardController.init();
  templateMenu.setOnChange((menuItem) => {
    switch (menuItem) {
      case MenuItem.TABLE:
        statisticsComponent.hide();
        boardController.show();
        break;
      case MenuItem.STATISTICS:
        filterController.reset();
        boardController.hide();
        statisticsComponent._renderCharts();
        statisticsComponent.show();
        break;
    }
  });
};
api.getPoints()
  .then((points) => {
    api.getCities()
      .then((cities) => {
        api.getAddOffers()
          .then((offers) => {
            startApplication(points, cities, offers);
          });
      });
  });
