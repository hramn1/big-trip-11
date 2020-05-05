import {default as CreateTemplateMenu} from './components/main-menu';
import {default as CreateFilterTemplate} from './components/filters';
import {default as CreateInfoTripTemplate} from './components/info-trip';
import {default as CreateSort} from './components/sort';
// import {default as CreateFormNewEventTemplate} from './components/new-event';
import {default as CreatePointRoute} from './components/route-point';
import {default as CreateTripDays} from './components/trip-days';
import {default as CreateEditEven} from './components/edit-event';
import {generateTripData, generateFilters, generateSort, tripData, offers} from './data';
import {render, TOTALTRIP, Position} from "./utils";
const arrTrip = [];
for (let i = 0; i < TOTALTRIP; i++) {
  arrTrip.push(generateTripData());
}
const renderBoard = (container) => {
  const sortTemplate = new CreateSort(generateSort());
  render(container, sortTemplate.getElement());
  // const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
  // render(container, templateFormCreate.getElement());
  const templatePointRouteList = new CreateTripDays(arrTrip);
  render(container, templatePointRouteList.getElement());
  const routeList = document.querySelectorAll(`.trip-days__item .trip-events__item `);
  for (let it of routeList) {
    const dayDateElement = it.getAttribute(`data-day`);
    const showingEvents = arrTrip.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
    for (let tripEvent of showingEvents) {
      renderEvent(it, tripEvent);
    }
  }
  // routeList.forEach((it) => {
  //   const dayDateElement = it.getAttribute(`data-day`);
  //   const showingEvents = arrTrip.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
  //   for (let tripEvent of showingEvents){
  //     renderEvent(it, tripEvent);
  //   }
  // })
  //   // templatePointRoute.editForm = (evt) => {
  //   //   alert('ds')
  //   // }
  //   render(it, templatePointRoute.getElement());
};
const renderEvent = (container, trip) => {
  const tripEvent = new CreatePointRoute(trip);
  const editEvent = new CreateEditEven(trip, tripData, offers);
  // const templatePointRouteList = new CreateTripDays(arrTrip);
  // render(container, templatePointRouteList.getElement());
  // const routeList = document.querySelectorAll(`.trip-days__item `);
  // routeList.forEach((it) => {
  //   const dayDateElement = it.getAttribute(`data-day`);
  //   const showingEvents = arrTrip.filter((trip) => `${trip.tripDate.getMonth()} ${trip.tripDate.getDate()}` === dayDateElement);
  //   const templatePointRoute = new CreatePointRoute(showingEvents);
  //   console.log(templatePointRoute)
  tripEvent.editForm = () => {
    container.replaceChild(editEvent.getElement(), tripEvent.getElement());
  }
  render(container, tripEvent.getElement());
  //render(container, editEvent.getElement());
  // })
  }
const tripMenu = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const templateMenu = new CreateTemplateMenu();
render(tripMenu, templateMenu.getElement());
// фильтры
const filtersComponent = new CreateFilterTemplate(generateFilters());
render(tripMenu, filtersComponent.getElement());
// инфа в хедере
const templateInfoRoute = new CreateInfoTripTemplate();
const tripMainContainer = document.querySelector(`.trip-main`);
render(tripMainContainer, templateInfoRoute.getElement(), Position.AFTERBEGIN);
const mainContent = document.querySelector(`.trip-events`);

// форма нового ивента
// const templateFormCreate = new CreateFormNewEventTemplate(arrTrip, offers, tripData);
// render(mainContent, templateFormCreate.getElement());
// ивенты
//   renderEvent(mainContent);
renderBoard(mainContent)
