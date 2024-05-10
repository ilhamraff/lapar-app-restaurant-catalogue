const assert = require('assert');

Feature('LikingRestaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty Liked Restaurant', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('Liking one restaurant then Unliking that Restaurant', async ({ I }) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.restaurant__title a');
  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Unliking the restaurant
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.restaurant-item');
});

Scenario('Reviewing One Restaurant', async ({ I }) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.restaurant__title a');

  I.seeElement('.restaurant__title a');
  I.click('.restaurant__title a');

  I.seeElement('.restaurant__add-review');

  I.fillField('Your Name:', 'Test Review');
  I.fillField('Your Review:', 'Ini Review');

  I.click('Submit Review');
});

// Scenario('Unliking one Restaurant', async ({ I }) => {
//   I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item__not__found');

//   I.amOnPage('/');
//   I.waitForElement('.restaurant__title a');
//   I.seeElement('.restaurant__title a');

//   const firstRestaurant = locate('.restaurant__title a').first();
//   const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
//   I.click(firstRestaurant);

//   I.seeElement('#likeButton');
//   I.click('#likeButton');

//   I.amOnPage('/#/favorite');
//   I.seeElement('.restaurant-item');

//   const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

//   assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

//   Unliking the restaurant
//   I.click(firstRestaurant);

//   I.seeElement('#likeButton');
//   I.click('#likeButton');

//   I.amOnPage('/#/favorite');
//   I.dontSeeElement('.restaurant-item');

// });
