import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

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
          className={css.ImageGalleryItem}
        >
          <img
            loading="lazy"
            className={css.ImageGalleryItem_img}
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
