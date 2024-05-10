/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import AddReview from '../../utils/review-initiator';
import {
  createFormReviewTemplate,
  createRestaurantDetailTemplate,
} from '../templates/template-creator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <section class="content">
        <div class="explore">
          <h1 class="explore_label">Detail</h1>
          <div id="restaurantdetail-container" class="restaurant-detail"></div>
          <div id="likeButtonContainer"></div>
        </div>
    </section>
    `;
  },

  // <div class="loading" id="loading-indicator"></div>

  async afterRender() {
    // const loadingIndicator = document.querySelector('#loading-indicator');
    const restaurantContainer = document.querySelector(
      '#restaurantdetail-container',
    );

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    restaurantContainer.innerHTML += createFormReviewTemplate();
    const addReview = document.getElementById('addReviewForm');

    addReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewerName = document.getElementById('reviewerName').value;
      const reviewContent = document.getElementById('reviewContent').value;
      const reviewData = {
        id: restaurant.restaurant.id,
        name: reviewerName,
        review: reviewContent,
      };

      try {
        const data = await AddReview.addReview(reviewData);
        if (!data.error) {
          AddReview.renderCustomerReviews(data.customerReviews);

          document.getElementById('reviewerName').value = '';
          document.getElementById('reviewContent').value = '';
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    // try {
    //   setTimeout(async () => {
    //     loadingIndicator.style.display = 'none';
    //   }, 1500);
    // } catch (error) {
    //   console.error(error.message);
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Failed to get data',
    //   });
    // }
  },
};

export default Detail;
