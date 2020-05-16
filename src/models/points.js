import {getPointsByFilter, getPointsOrdered, FilterType} from "../utils";
export default class Points {
  constructor() {
    this._points = [];
    this._dataChangeHandlers = [];
    this._point = {};
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._activeFilterType = FilterType.ALL;
  }

  getPointsAll() {
    return this._points;
  }
  getPoint() {
    return this._point;
  }
  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }
  getPoints() {
    return getPointsByFilter(this.getPointsAllAscOrdered(), this._activeFilterType);
  }
  getPointsAllAscOrdered() {
    return getPointsOrdered(this._points);
  }
  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    this._point = this._points[index];
    return true;
  }
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
