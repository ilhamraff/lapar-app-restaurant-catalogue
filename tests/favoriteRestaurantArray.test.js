/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-const-assign */
/* eslint-disable no-prototype-builtins */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurants = [];

const favoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurant() {
    return favoriteRestaurants;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // Pastikan id belum ada dalam daftar favoriteRestaurant
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurant().filter((restaurant) => {
      const loweredCaseRestaurantTitle = (restaurant.title || '-').toLowerCase();
      const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  itActsAsFavoriteRestaurantModel(favoriteRestaurantArray);
});
