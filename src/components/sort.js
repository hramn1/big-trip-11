import {default as AbstractComponent} from "./abstract";

export const getTemplateSort = (sorts) => {
  const sortTemplate = (sort) => {
    const isChecked = (sort.currentFilter) ? ` checked` : ``;
    return (
      `<div class="trip-sort__item  trip-sort__item--${sort.name}">
        <input id="sort-${sort.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.name}" ${isChecked}>
        <label class="trip-sort__btn" for="sort-${sort.name}">
          ${sort.name}
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>`
    );
  };
  const sortsMarkup = sorts.map((it, i) => sortTemplate(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
         ${sortsMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};
export default class CreateSort extends AbstractComponent {
  constructor(sort) {
    super();
    this.sort = sort;
  }

  getTemplate() {
    return getTemplateSort(this.sort);
  }

  sortEvent() {
  }

  unrenderDay() {
    this._element.querySelector(`.trip-sort__item--day`).textContent = ``;
  }

  bind() {
    const elSort = this._element.querySelectorAll(`.trip-sort__input`);
    for (let it of elSort) {
      it.addEventListener(`click`, this.sortEvent);
    }
  }
}
