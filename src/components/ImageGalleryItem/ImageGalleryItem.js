import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const onSelect = () => {
    setUrl(image.largeImageURL);
    setDescription(image.tags);
  };

  const onModalClose = () => {
    setUrl('');
    setDescription('');
  };

  return (
    <div>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.ImageGalleryItem_image}
        onClick={onSelect}
      />
      {url && <Modal link={url} alt={description} onClose={onModalClose} />}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
