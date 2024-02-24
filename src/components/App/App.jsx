import { useEffect, useState } from 'react';
import * as Pixabay from 'api/pixabay';
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components';

export const App = () => {
  const [searchText, setSerchText] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [textAlt, setTextAlt] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setSerchText('');
    setPage(1);
    setPhotos([]);
    setShowBtn(false);
    setIsEmpty(false);
    setIsLoading(false);
    setIsShowModal(false);
    setModalImg('');
    setTextAlt('');
    setError('');
  };

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setIsLoading(true);
    Pixabay.getPhotos(searchText, page)
      .then(({ hits, totalHits }) => {
        if (Array.isArray(hits) && !hits.length) {
          setIsEmpty(true);
          return;
        }
        setPhotos(prev => (prev ? [...prev, ...hits] : hits));
        setShowBtn(() => page < Math.ceil(totalHits / 15));
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText, page]);

  const handleSearch = text => {
    if (text === searchText) {
      return;
    }
    reset();
    setSerchText(text);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const handleOpenModal = ({ modalImg, textAlt }) => {
    setIsShowModal(true);
    setModalImg(modalImg);
    setTextAlt(textAlt);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setModalImg('');
    setTextAlt('');
  };

  return (
    <div className="App">
      <Searchbar handleSearch={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onOpenModal={handleOpenModal} />
      )}
      {showBtn && <Button onClick={handleLoadMore}>Load more ...</Button>}
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
        <Modal img={modalImg} textAlt={textAlt} onClose={handleCloseModal} />
      )}
    </div>
  );
};
