import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if(e.code === 'Escape') {
        this.props.onClose();
      }
  }

  handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    const { link, alt } = this.props;
    return createPortal ( 
    <div className={css.Overlay} onClick={this.handleBackdropClick}>
      <div className={css.Modal}>
        <img src={link} alt={alt} />
      </div>
    </div>, modalRoot);
  } 
};

Modal.propTypes = {
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

