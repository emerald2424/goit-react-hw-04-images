import { Component } from 'react';
import css from './ImageGallery.module.css';
import { getImages } from 'services/getImages';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    totalImages: 0,
    error: '',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      if (prevProps.query !== this.props.query) {
        this.setState({
          page: 1,
          images: [],
        });
      }

      getImages(this.props.query, this.state.page)
        .then(data => {
          this.setState({
            images: [...this.state.images, ...data.hits],
            totalImages: data.totalHits,
            status: 'resolved',
          });
        })
        .catch(error => {
          console.log('Error: ', error);
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, totalImages, status, page } = this.state;

    if (status === 'pending') return <Loader />;

    if (status === 'resolved')
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(image => (
              <li key={image.id} className={css.ImageGalleryItem}>
                <ImageGalleryItem image={image} />
              </li>
            ))}
          </ul>
          {totalImages > 12 && Math.ceil(totalImages / 12) > page && (
            <Button onClick={this.loadMore} />
          )}
        </>
      );

    if (status === 'rejected')
      return <p>Sorry, we couldn't complete your request</p>;
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
