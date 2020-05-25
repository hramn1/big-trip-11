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
}

