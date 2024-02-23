import { Component } from 'react';

export class Modal extends Component {
  closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  handleClickEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleClickEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClickEsc);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.closeModalBackdrop}>
        <img src={this.props.img} alt={this.props.text} width={'80%'} />
      </div>
    );
  }
}
