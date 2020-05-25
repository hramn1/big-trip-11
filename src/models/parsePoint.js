export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`] || null;
    this.favorites = data[`is_favorite`] || false;
    this.type = data[`type`] || null;
    this.city = data[`destination`] [`name`] || null;
    this.price = data[`base_price`] || null;
    this.description = data[`destination`] [`description`] || null;
    this.picture = data[`destination`] [`pictures`] || null;
    this.tripDate = new Date(data[`date_from`]) || null;
    this.tripDateEnd = new Date(data[`date_to`]) || null;
    this.offers = data[`offers`] || null;
  }
  toRAW() {
    return {
      'base_price': this.price,
      'date_from': new Date(this.tripDate),
      'date_to': new Date(this.tripDateEnd),
      'destination': {
        'pictures': this.picture,
        'description': this.description,
        'name': this.city,
      },
      'id': this.id,
      'is_favorite': this.favorites,
      'offers': this.offers,
      'type': this.type
    };
  }
  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
  static toRAWPoint(data) {
    return {
      "base_price": 1100,
      "date_from": "2019-07-10T22:55:56.845Z",
      "date_to": "2019-07-11T11:22:13.375Z",
      'destination': {
        'pictures': "webpack:///src/api.js",
        'description': data.description,
        'name': data.city,
      },
      "id": "0",
      "is_favorite": false,
      "offers": [
      {
        "title": "Choose meal",
        "price": 180
      }, {
        "title": "Upgrade to comfort class",
        "price": 50
      }
    ],
      "type": "bus"
    }
  }
}

