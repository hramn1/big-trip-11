export default class Points {
  constructor() {
    this._points = [];
    this._dataChangeHandlers = [];
    this._point = {};
  }

  getPointsAll() {
    return this._points;
  }
  getPoint() {
   return this._point;
  }
  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point, pointController) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1 || !pointController) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    this._point = this._points[index];
    console.log(this._point)
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
