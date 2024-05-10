/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import Swal from 'sweetalert2';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantView from './liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // const loadingIndicator = document.querySelector('#loading-indicator');
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    // try {
    //   // eslint-disable-next-line padded-blocks
    //   setTimeout(async () => {
    //     loadingIndicator.style.display = 'none';
    //   }, 1500);
    // } catch (error) {
    //   console.error(error.message);
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Failed to fetch data',
    //   });
    // }
  },
};

export default Favorite;
