import ModelPoint from "./models/parsePoint";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};
const STATUS_CODE = {
  SUCCESS: 200,
  MULTIPLE: 300
};

const checkStatus = (response) => {
  if (response.status >= STATUS_CODE.SUCCESS && response.status < STATUS_CODE.MULTIPLE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(ModelPoint.parsePoints);
  }

  getCities() {
    return this._load({url: `destinations`})
      .then((response) => response.json());
  }

  getAddOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json());
  }

  createPoint(data) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
        .then(ModelPoint.parsePoint);

  }

  updatePoint(id, data) {


    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
        .then(ModelPoint.parsePoint);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;

