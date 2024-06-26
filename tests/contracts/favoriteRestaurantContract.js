/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('Should return the movie that has been added', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });

  it('Should refuse a Restaurant from being added if it goes not have the correct property', async () => {
    favoriteRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
  });

  it('Can return all of the Restaurants that have been added', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('Should remove favorite Restaurant', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    await favoriteRestaurant.deleteRestaurant(1);

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('Should handle request to remove a Restaurant even though the Restaurant has not been added', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    await favoriteRestaurant.deleteRestaurant(4);

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('Should be able to Search for Restaurants', async () => {
    favoriteRestaurant.putRestaurant({ id: 1, title: 'restaurant a' });
    favoriteRestaurant.putRestaurant({ id: 2, title: 'restaurant b' });
    favoriteRestaurant.putRestaurant({ id: 3, title: 'restaurant abc' });
    favoriteRestaurant.putRestaurant({ id: 4, title: 'ini mah restaurant abcd' });

    expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 3, title: 'restaurant abc' },
      { id: 4, title: 'ini mah restaurant abcd' },
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
