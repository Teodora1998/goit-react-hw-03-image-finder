import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { imageURL, tag, closeModal } = this.props;
    return (
      <div className="Overlay" onClick={closeModal}>
        <div className="Modal" onClick={e => e.stopPropagation()}>
          <img src={imageURL} alt={tag} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
