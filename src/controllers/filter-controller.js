import FilterComponent from "../components/filters";
import {FilterType, getPointsByFilter, render, replace, Position} from "../utils";

export default class FilterController {
  constructor(container, pointsModel, statisticsComponent, templateMenu) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._statisticsComponent = statisticsComponent;
    this._templateMenu = templateMenu;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        isChecked: filterType === this._activeFilterType,
        isDisabled: !(getPointsByFilter(this._pointsModel.getPointsAll(), filterType).length),
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent.getElement(), Position.BEFOREEND);
    }
  }

  reset() {
    this._activeFilterType = FilterType.ALL;
    this._pointsModel.setFilter(FilterType.ALL);
    this.render();
  }

  _onFilterChange(filterType) {
    this._statisticsComponent.hide();
    this._templateMenu.setDefault();
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
