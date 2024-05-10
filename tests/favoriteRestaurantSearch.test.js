/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

describe('Searching Restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('Should be able to capture the query typed by user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('Should ask the model to search for liked Restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('Should show the Restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('Should show the name of the Restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('Should show - when the Restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('Should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('Should show all favorite Restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite Restaurants could be found', () => {
    it('Should show the empty message', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });

    it('Should not show any Restaurant', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
          done();
        });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
  });
});
