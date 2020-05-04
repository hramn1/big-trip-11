import {default as CreateTemplateMenu} from './components/main-menu';
import {default as CreateFilterTemplate} from './components/filters';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as CreateSort} from './components/sort';
import {default as CreateFormNewEventTemplate} from './components/new-event';
import {default as CreatePointRoute} from './components/route-point';
import {default as CreateTripDays} from './components/trip-days';
import {generateTripData, generateFilters, generateSort, tripData, offers} from './data';
import {render, TOTALTRIP, Position} from "./utils";
const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const templateMenu = new CreateTemplateMenu();
render(tripMenu, templateMenu.getElement());
const filtersComponent = new CreateFilterTemplate(generateFilters());
render(tripMenu, filtersComponent.getElement());
const templateInfoRoute = new CreateInfoTripTemplate();
const tripMainContainer = document.querySelector(`.trip-main`);
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);

const mainContent = document.querySelector(`.trip-events`);

const sortTemplate = new CreateSort(generateSort());
render(mainContent, sortTemplate.getElement());
const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
render(mainContent, templateFormCreate.getElement());
const templatePointRouteList = new CreateTripDays(arrTrip);
render(mainContent, templatePointRouteList.getElement());
const routeList = document.querySelectorAll(`.trip-days__item `);
routeList.forEach((it) => {
  const dayDateElement = it.getAttribute(`data-day`);
  const showingEvents = arrTrip.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
  const templatePointRoute = new CreatePointRoute(showingEvents);
  render(it, templatePointRoute.getElement());
});
