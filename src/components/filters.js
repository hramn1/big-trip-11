import {createElement} from '../utils';
const getTemplateFilters = (filters) => {
  const createFilter = (filter) => {
    const isChecked = (filter.currentFilter) ? ` checked` : ``;
    return (
      `<div class="trip-filters__filter">
       <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${isChecked}>
       <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`
    );
  };
  const filtersMarkup = filters.map((it) => createFilter(it)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
export default class CreateFilterTemplate {
  constructor(filters) {
    this.filters = filters;
    this._element = null;
  }
  getTemplate() {
    return getTemplateFilters(this.filters);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
