import { Component } from 'react';
import './App.css';
import { searchImage } from './api/apiPixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      emptyInput: false,
      images: [],
      page: 1,
      total: 1,
      isLoading: false,
      error: null,
      modalIsVisible: false,
      selectedImages: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search: prevSearch } = prevState;
    const { search: newSearch } = this.state;

    if (newSearch !== prevSearch) {
      this.handleSearch(newSearch);
    }
  }
  handleSearch = async searchTerm => {
    if (searchTerm.trim().length === 0) {
      this.setState({ emptyInput: true });
      return;
    }
    this.setState({
      search: searchTerm,
      emptyInput: false,
      page: 1,
      images: [],
      isLoading: true,
      error: null,
      total: 1,
    });

    try {
      const data = await searchImage(searchTerm, 1);
      this.setState({
        images: data.hits,
        total: data.total,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  };

  handleLoadMore = async () => {
    const { search, page } = this.state;
    const nextPage = page + 1;
    this.setState({ isLoading: true });
    try {
      const data = await searchImage(search, nextPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: nextPage,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  openModal(id) {
    this.setState({
      modalIsVisible: true,
      selectedImages: id,
    });
  }

  closeModal() {
    this.setState({
      modalIsVisible: false,
      selectedImages: null,
    });
  }

  render() {
    const { images, isLoading, error, emptyInput, total, page } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        {emptyInput && Notiflix.Notify.failure('Please insert search term!')}
        {error &&
          Notiflix.Notify.failure(
            'Ops something went wrong please try again later!'
          )}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery openModal={this.openModal} images={images} />
        )}
        {total / 12 > page && <Button loadMore={this.handleLoadMore} />}
        {this.state.modalIsVisible && this.state.selectedImages && (
          <Modal
            openModal={this.openModal}
            imageURL={this.state.selectedImages.largeImageURL}
            tag={this.state.selectedImages.tags}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
