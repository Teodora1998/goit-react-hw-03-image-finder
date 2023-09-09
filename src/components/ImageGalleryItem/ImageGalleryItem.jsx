import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ images, openModal }) => {
  const handleClick = image => {
    openModal(image);
  };
  return (
    <>
      {images.map(image => (
        <li
          key={image.id}
          onClick={() => handleClick(image)}
          className="ImageGalleryItem"
        >
          <img
            loading="lazy"
            className="ImageGalleryItem_img"
            src={image.webformatURL}
            alt={image.tags}
          />
        </li>
      ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
