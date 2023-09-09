import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(img => (
        <ImageGalleryItem key={img.id} image={img} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
