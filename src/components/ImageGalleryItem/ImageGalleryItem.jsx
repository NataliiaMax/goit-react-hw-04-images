import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, openModal }) => {
  return (
    <li className={style.galleryItem}>
      <img
        className={style.galleryItem__image}
        src={webformatURL}
        onClick={() => openModal(largeImageURL, tags)}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
