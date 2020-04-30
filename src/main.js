import {getTemplateMenu} from './components/main-menu';
import {getTemplateInfoRoute} from './components/info-trip';
import {getTemplateFilters} from './components/filters';
import {getTemplateSort} from './components/sort';
import {getTemplateFormCreate} from './components/form';
import {getTemplatePointRoute} from './components/route-point';
import {getTemplateTripDays} from './components/trip-days';
import {generateTripData} from './data';
import {generateFilters} from './data';
import {generateSort} from './data';
import {tripData} from './data';
import {offers} from './data';
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
render(mainContent, getTemplateSort(generateSort()));

const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
render(mainContent, getTemplateFormCreate(arrTrip, offers, tripData));

const routeList = document.querySelector(`.trip-days`);
render(mainContent, getTemplateTripDays(arrTrip));

for (let i = 0; i < 3; i++) {
  render(routeList, getTemplatePointRoute());
}
