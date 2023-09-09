import axios from 'axios';
import Notiflix from 'notiflix';

const fetchImages = async (typedValue, pageNum) => {
  const url = `https://pixabay.com/api/?key=36761975-e2cf261ee0afc31e5120bc8bc&q=${typedValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${pageNum}`;
  Notiflix.Loading.dots();
  try {
    const resp = await axios.get(url);
    const { data } = resp;
    const { totalHits, hits } = data;
    if (totalHits === 0) {
      Notiflix.Notify.warning('Sorry, no movie found. Try something else.');
      return;
    }
    return { totalHits, hits };
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops! Something went wrong, please try again.');
  } finally {
    Notiflix.Loading.remove();
  }
};

export default fetchImages;
