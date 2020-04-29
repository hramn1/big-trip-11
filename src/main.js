import {getTemplateMenu} from './components/main-menu';
import {getTemplateInfoRoute} from './components/info-trip';
import {getTemplateFilters} from './components/filters';
import {getTemplateSort} from './components/sort';
import {getTemplateFormCreate} from './components/form';
import {getTemplatePointRouteList} from './components/route-list';
import {getTemplatePointRoute} from './components/route-point';
import {generateTripData} from './data';
import {generateFilters} from './data';
import {TOTALTRIP} from "./utils";


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
render(tripMenu, getTemplateMenu());
render(tripMenu, getTemplateFilters(generateFilters()));
const tripMainContainer = document.querySelector(`.trip-main`);
render(tripMainContainer, getTemplateInfoRoute(), `afterbegin`);
const mainContent = document.querySelector(`.trip-events`);
render(mainContent, getTemplateSort());
render(mainContent, getTemplateFormCreate());
render(mainContent, getTemplatePointRouteList());
const routeList = document.querySelector(`.trip-days`);
for (let i = 0; i < 3; i++) {
  render(routeList, getTemplatePointRoute());
}
const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
