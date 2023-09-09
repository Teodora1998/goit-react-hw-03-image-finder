import { Component } from 'react';
import css from './App.module.css';
import { imgSearch } from './api/apiPixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      empty: false,
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

  //cautarea
  handleSearch = async searchTerm => {
    if (searchTerm.trim().length === 0) {
      this.setState({ empty: true }); 
      return;
    }
    this.setState({
      search: searchTerm,
      empty: false,
      page: 1,
      images: [],
      isLoading: true,
      error: null,
      total: 1,
    });

    try {
      const data = await imgSearch(searchTerm, 1);
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
      const data = await imgSearch(search, nextPage);
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
    const { images, isLoading, error, empty, total, page } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSearch={this.handleSearch} />
        {empty && <p className={css.empty}>Please enter a search term.</p>}
        {error && <p>Oops! Something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (<ImageGallery openModal={this.openModal} images={images} />)}
        {total/12 > page && <Button onClickLoadMore={this.handleLoadMore} />}
        {this.state.modalIsVisible && this.state.selectedImages && (<Modal
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
