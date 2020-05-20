import {default as AbstractComponent} from "./abstract";
const getTemplateNoEvent = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};
export default class LoadingTemplate extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getTemplateNoEvent();
  }
}
