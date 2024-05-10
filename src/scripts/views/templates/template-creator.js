import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
    <article class="restaurant-item">
      <img
        crossorigin="anonymous" class="lazyload" alt="${restaurant.name || '-'}" data-src="${CONFIG.BASE_PICTURE + restaurant.pictureId}"
      />
      <div class="restaurant-content">
        <p class="rating">⭐️ ${restaurant.rating || '-'}</p>
        <h2 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h2>
        <p>${restaurant.description || '-'}</p>
      </div>
    </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">${restaurant.restaurant.name}</h2>
  <div class="restaurant__poster-container">
  <img crossorigin="anonymous" class="restaurant__poster" src="${
  CONFIG.BASE_PICTURE + restaurant.restaurant.pictureId
}" alt="${restaurant.restaurant.name}" />
  </div>
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>City</h4>
    <p>${restaurant.restaurant.city}</p>
    <h4>Address</h4>
    <p>${restaurant.restaurant.address}</p>
  </div>
  <div class="restaurant__overview">
    <h3>Description</h3>
    <p>${restaurant.restaurant.description}</p>
  </div>
  <div class="restaurant__categories">
    <h3>Categories</h3>
    <ul>
      ${restaurant.restaurant.categories
    .map((category) => `<li>${category.name}</li>`)
    .join('')}
    </ul>
  </div>
  <div class="restaurant__menus">
    <h3>Menus</h3>
    <h4>Foods</h4>
    <ul>
      ${restaurant.restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}
    </ul>
    <h4>Drinks</h4>
    <ul>
      ${restaurant.restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
    </ul>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    <ul>
      ${restaurant.restaurant.customerReviews
    .map(
      (review) => `
        <li>
          <p><strong>${review.name}</strong></p>
          <p>${review.review}</p>
          <p><em>${review.date}</em></p>
        </li>
      `,
    )
    .join('')}
    </ul>
  </div>
`;

const createFormReviewTemplate = () => `
  <div class="restaurant__add-review">
    <h3>Add Review</h3>
    <form id="addReviewForm">
      <label for="reviewerName">Your Name:</label><br>
      <input type="text" id="reviewerName" name="reviewerName" required><br>
      <label for="reviewContent">Your Review:</label><br>
      <textarea id="reviewContent" name="reviewContent" rows="4" cols="50" required></textarea><br>
      <button type="submit">Submit Review</button>
    </form>
  </div>`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createFormReviewTemplate,
};
