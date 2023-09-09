import axios from 'axios';

export const fetchQuerry = async searchQuerry => {
  const response = axios.get('');
  return (await response).data.hits;
};
