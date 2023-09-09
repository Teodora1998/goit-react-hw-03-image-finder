import PropTypes from 'prop-types';
import './ImageGallery.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <div className="gallery">
      <ul className="ImageGallery">
        <ImageGalleryItem openModal={openModal} images={images} />
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
