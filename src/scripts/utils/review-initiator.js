import API_ENDPOINT from '../globals/api-endpoint';

const AddReview = {
  async addReview(reviewData) {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  renderCustomerReviews(reviews) {
    const reviewsList = document.querySelector('.restaurant__reviews ul');
    reviewsList.innerHTML = '';
    reviews.forEach((review) => {
      const reviewItem = document.createElement('li');
      reviewItem.innerHTML = `
      <p><strong>${review.name}</strong></p>
      <p>${review.review}</p>
      <p><em>${review.date}</em></p>
    `;
      reviewsList.appendChild(reviewItem);
    });
  },
};

export default AddReview;
