import {default as CreateFormNewEventTemplate} from '../components/new-event';
import {Position, render} from "../utils";
export default class NewEventController {
  constructor(container, trips) {
    this.trips = trips;
    this.container = container;
  }
  init() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this.render);
  }
  render() {
    const container = document.querySelector(`.trip-events__trip-sort`);
    const templateFormCreate = new CreateFormNewEventTemplate(this.trips);
    render(container, templateFormCreate.getElement(), Position.AFTER);
  }
}
