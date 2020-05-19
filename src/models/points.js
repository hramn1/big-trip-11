import {getPointsByFilter, getPointsOrdered, FilterType} from "../utils";
export default class Points {
  constructor() {
    this._points = [];
    this._cities = [];
    this._offers = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._activeFilterType = FilterType.ALL;
  }

  getPointsAll() {
    return this._points;
  }
  getPoints() {
    // if (getPointsByFilter(this.getPointsAllAscOrdered(), this._activeFilterType).length === 0) {
    //   return this._points;
    // }
    return getPointsByFilter(this.getPointsAllAscOrdered(), this._activeFilterType);
  }
  getCities() {
    return this._cities;
  }
  getOffers() {
    return this._offers;
  }
  getPointsAllAscOrdered() {
    return getPointsOrdered(this._points);
  }
  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }
  setCities(cities) {
    this._cities = Array.from(cities);
    this._callHandlers(this._dataChangeHandlers);
  }
  setOffers(offers) {
    this._offers = Array.from(offers);
    this._callHandlers(this._dataChangeHandlers);
  }


  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
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
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
