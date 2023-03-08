import css from './ImageGalleryItem.module.css';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    url: '', 
    description: '',
  }

  onSelect = () => {
    const { image } = this.props;
    this.setState({url: image.largeImageURL, description: image.tags})
  }

  onModalClose = () => {
    this.setState({url: '', description: ''})
  }

  render() {
    const { image } = this.props;
    const { url, description } = this.state;
    return (
      <div>
        <img src={image.webformatURL} alt={image.tags} className={css.ImageGalleryItem_image} onClick={this.onSelect} />
        {url && <Modal link={url} alt={description} onClose={this.onModalClose}/>}
     </div>
    )
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired
}