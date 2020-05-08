import {default as CreatePointRoute} from '../components/route-point';
import {default as CreateEditEven} from '../components/edit-event';
import {tripData, offers} from '../data';
import {render} from "../utils";

export default class TripController {
  constructor(container, trip) {
    this.container = container;
    this.trips = trip;
  }
  init() {
  const tripEvent = new CreatePointRoute(this.trips);
  const editEvent = new CreateEditEven(this.trips, tripData, offers);
  tripEvent.editForm = () => {

    this.container.replaceChild(editEvent.getElement(), tripEvent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);

  };
  editEvent.openEvent = () => {
    this.container.replaceChild(tripEvent.getElement(), editEvent.getElement());
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      editEvent.openEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
    render(this.container, tripEvent.getElement());
  }
}
