import {default as AbstractComponent} from "./abstract";
const FILTER_ID_PREFIX = `filter-`;
const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};
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
export default class CreateFilterTemplate extends AbstractComponent {
  constructor(filters) {
    super();
    this.filters = filters;
  }
  getTemplate() {
    return getTemplateFilters(this.filters);
  }
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
  static filterDefault() {
    const el = document.querySelectorAll(`.trip-filters__filter-input`);
    for (let it of el)  {
      it.checked = false
    }
  }
}
