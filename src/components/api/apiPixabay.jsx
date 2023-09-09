import axios from 'axios';

const API_KEY = '36881198-9b3418838f94793c6af8c8124';
const URL = 'https://pixabay.com/api/';

export const imgSearch = async (searchTerm, page) => {
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
    console.error('Something went wrong: ' + error);
  }
};
