/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import {
  createRestaurantItemTemplate,
} from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="content" id="content">
        <article class="headline">
          <figure class="headline_figure">
            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_1-small.jpg">
              <img crossorigin="anonymous" src="./images/hero-image_1-large.jpg" alt="Chef Memasak">
            </picture>
            <figcaption>Kelas Memasak Chef Ilham</figcaption>
          </figure>
          <div class="headline_content">
            <h1 class="headline_title">
              #KulinerTanpaBatas: Jelajahi Ragam Kuliner di Aplikasi Kami
            </h1>
            <p class="headline_description">
              Temukan petualangan kuliner terbaikmu dengan aplikasi Lapar App.
              Nikmati sensasi menemukan rahasia setiap hidangan, dari lezatnya
              masakan hingga cerita di balik restoran terkenal. Ayo jelajahi
              dunia kuliner dengan cerita yang menginspirasi!
            </p>
            <button class="headline_button">Baca Selengkapnya</button>
          </div>
        </article>
        <div class="explore">
          <h1 class="explore_label">Explore Restaurant</h1>
          <div id="restaurants-container" class="restaurants"></div>
          <div class="loading" id="loading-indicator"></div>
        </div>
    </section>`;
  },

  // <div class="loading" id="loading-indicator"></div>

  async afterRender() {
    const loadingIndicator = document.querySelector('#loading-indicator');

    try {
      setTimeout(async () => {
        const restaurantContainer = document.querySelector(
          '#restaurants-container',
        );

        const restaurants = await TheRestaurantDbSource.home();

        restaurants.forEach((restaurant) => {
          restaurantContainer.innerHTML
            += createRestaurantItemTemplate(restaurant);
        });

        loadingIndicator.style.display = 'none';
      }, 500);
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to get data',
      });
    }
  },
};

export default Home;
