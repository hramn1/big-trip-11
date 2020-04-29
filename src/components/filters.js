const createFilter = (filters) => {
  const isChecked = (filters.currentFilter === true) ? ` checked` : ``;
  return (
    `<div class="trip-filters__filter">
       <input id="filter-${filters.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filters.name}" ${isChecked}>
       <label class="trip-filters__filter-label" for="filter-${filters.name}">${filters.name}</label>
    </div>`
  );
};

export const getTemplateFilters = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilter(it, i === 0)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
