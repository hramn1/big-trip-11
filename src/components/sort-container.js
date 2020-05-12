import {default as AbstractComponent} from "./abstract";
const getTemplateSortContainer = () => {
  return (
    `<ul class="trip-days">
    <li class="trip-days__item  day" >
      <div class="day__info">
        <span class="day__counter"></span>
        <time class="day__date"> </time>
      </div>
      <ul class="trip-events__list">
      <li class="trip-events__item"></li>
      </ul>
    </li>
    </ul>`
  );
};

export default class CreateSortContainer extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getTemplateSortContainer();
  }
}
