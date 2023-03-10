import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  
    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <li key={image.id} className={css.ImageGalleryItem}>
            <ImageGalleryItem image={image} />
          </li>
        ))}
      </ul>
    );
  };

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
