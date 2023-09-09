import { Component } from 'react';

class Modal extends Component {
  handleEscape = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  closeBtnHandle = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="large" />
          <button
            type="button"
            className="close-btn"
            onClick={this.closeBtnHandle}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }
}
export default Modal;
