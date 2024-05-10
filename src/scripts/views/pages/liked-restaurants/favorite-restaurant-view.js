/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <section class="content">
      <div class="explore">
        <input id="query" type="text" placeholder="Cari Restaurant">
        <h1 class="explore_label">My Favorite Restaurant</h1>
        <div id="restaurants" class="restaurants"></div>
      </div>
    </section>
  `;
  }

  // <div class="loading" id="loading-indicator"></div>

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  // eslint-disable-next-line no-unused-vars
  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
    '<div class="restaurant-item__not__found">
        Tidak ada Restaurant untuk ditampilkan
    </div>`;
  }
}

export default FavoriteRestaurantView;
