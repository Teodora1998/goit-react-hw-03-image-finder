import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '36867365-3643e28b2c6642941cb9e037d';
const URL = 'https://pixabay.com/api/';

export const searchImage = async (searchTerm, page) => {
  try {
    const response = await axios.get(URL, {
      params: {
        q: searchTerm,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong please try again later!');
  }
};
