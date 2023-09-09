import { Component } from 'react';
import Searchbar from './search-bar/Searchbar';
import fetchImages from './fetch-data';
import ImageGallery from './image-gallery/ImageGallery';
import Modal from './modal/Modal';
import LoadMore from './load-more/LoadMore';

const perPage = 12;

export class App extends Component {
  state = {
    filter: '',
    images: [],
    pageNum: 1,
    maxPages: null,
    largeImageURL: null,
    modalIsVisible: false,
  };
  addToFilter = value => {
    this.setState(() => {
      return { images: [], filter: value, pageNum: 1 };
    });
  };

  closeModal = () => {
    this.setState({
      modalIsVisible: false,
      largeImageURL: null,
    });
  };

  openModal = largeImageURL => {
    this.setState({
      modalIsVisible: true,
      largeImageURL,
    });
  };

  addMovies = async (
    prevImagesLength,
    thisImagesLength,
    prevFilter,
    thisFilter
  ) => {
    if (prevImagesLength === thisImagesLength || prevFilter !== thisFilter) {
      const { filter, pageNum, images } = this.state;
      const response = await fetchImages(filter, pageNum);
      const { totalHits, hits } = response;
      const maxPages = Math.ceil(totalHits / perPage);
      const newImages = [...images, ...hits];
      this.setState({ images: newImages, maxPages });
    }
  };

  updatePageNum = () => {
    this.setState(prevState => {
      if (prevState.pageNum === this.state.maxPages) {
        return { pageNum: 1 };
      }
      return { pageNum: prevState.pageNum + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImagesLength = prevState.images.length;
    const thisImagesLength = this.state.images.length;
    const prevFilter = prevState.filter;
    const thisFilter = this.state.filter;
    if (this.state.modalIsVisible === prevState.modalIsVisible) {
      this.addMovies(
        prevImagesLength,
        thisImagesLength,
        prevFilter,
        thisFilter
      );
    }
  }
  render() {
    return (
      <div className="App">
        <Searchbar
          addToFilter={this.addToFilter.bind(this)}
          filter={this.state.filter}
        />
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            openModal={this.openModal.bind(this)}
          />
        )}
        {this.state.modalIsVisible && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            closeModal={this.closeModal}
          />
        )}
        {this.state.maxPages > 1 && this.state.images.length > 0 && (
          <LoadMore updatePageNum={this.updatePageNum.bind(this)} />
        )}
      </div>
    );
  }
}
