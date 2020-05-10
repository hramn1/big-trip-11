import {default as AbstractComponent} from "./abstract";
const getTemplateNoEvent = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};
export default class CreateNoEventTemplate extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getTemplateNoEvent();
  }
}
