import { Component } from 'react';
import * as Pixabay from 'api/pixabay';
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components';

export class App extends Component {
  state = {
    searchText: '',
    page: 1,
    photos: [],
    showBtn: false,
    isEmpty: false,
    isLoading: false,
    isShowModal: false,
    modalImg: '',
    textAlt: '',
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (searchText !== prevState.searchText || page !== prevState.page) {
      this.setState({ isLoading: true });
      Pixabay.getPhotos(searchText, page)
        .then(({ hits, totalHits }) => {
          if (Array.isArray(hits) && !hits.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...hits],
            showBtn: page < Math.ceil(totalHits / 15),
          }));
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = searchText => {
    this.setState({
      searchText,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
      isShowModal: false,
      modalImg: '',
      textAlt: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = ({ modalImg, textAlt }) => {
    this.setState({ isShowModal: true, modalImg, textAlt });
  };

  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImg: '', textAlt: '' });
  };

  render() {
    const {
      searchText,
      photos,
      showBtn,
      isEmpty,
      isLoading,
      isShowModal,
      modalImg,
      textAlt,
      error,
    } = this.state;
    return (
      <div className="App">
        <Searchbar handleSubmit={this.handleSubmit} />
        {photos.length > 0 && (
          <ImageGallery photos={photos} onOpenModal={this.handleOpenModal} />
        )}
        {showBtn && (
          <Button onClick={this.handleLoadMore}>Load more ...</Button>
        )}
        {!searchText && <p className="error">Search to find some images</p>}
        {isEmpty && <p className="error">Sorry. There are no images ... 😭</p>}
        {error && (
          <p className="error">
            Oops, something went wrong 😱
            <br />
            {error}
          </p>
        )}
        {isLoading && <Loader />}

        {isShowModal && (
          <Modal
            img={modalImg}
            textAlt={textAlt}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
