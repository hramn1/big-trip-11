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

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }

  toRAW() {
    return {
      'film_info': {
        'poster': this.posterLink,
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'runtime': this.duration,
        'total_rating': parseInt(this.totalRating, 10),
        'release': {
          'date': new Date(this.year),
          'release_country': this.releaseCountry,
        },
        'genre': [...this.genre.values()],
        'age_rating': this.ageRating,
        'actors': this.actors,
        'director': this.director,
        'writers': this.writers,
      },
      'user_details': {
        'already_watched': this.controls.isMarkedAsWatched,
        'favorite': this.controls.isFavorite,
        'watchlist': this.controls.isAddedToWatchlist,
        'personal_rating': parseInt(this.personalRating, 10) || 0,
        'watching_date': new Date() || null,
      },
      'comments': this.comments,
    };
  }
}

