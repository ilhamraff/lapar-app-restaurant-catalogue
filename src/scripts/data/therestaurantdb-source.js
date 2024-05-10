import Swal from 'sweetalert2';
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async home() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      return data.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch data',
      });
    }
    return null;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const data = await response.json(); // Ambil data JSON dari respons
      return data;
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch data',
      });
    }
    return null;
  }
}

export default TheRestaurantDbSource;
