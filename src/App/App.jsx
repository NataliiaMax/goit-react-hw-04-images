import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryValues, fetchGallery } from 'components/API/API';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showButton, setShowButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');

  const handleFormSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setShowButton(false);
    setStatus('idle');
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const renderGallery = async () => {
      setStatus('pending');
      try {
        const { hits, totalHits } = await fetchGallery(query, page);
        if (totalHits === 0) {
          setShowButton(false);
          setStatus('idle');
          return toast.warn('No images on your query!');
        }

        const newImages = queryValues(hits);
        setImages(images => [...images, ...newImages], totalHits);
        setShowButton(true);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        toast.error('Oops... Something went wrong');
      } finally {
        setStatus('idle');
      }
    };
    renderGallery();
  }, [page, query]);

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

        return (
    <div>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal}></ImageGallery>
      )}{' '}
      {status === 'pending' && <Loader />}
      {showButton && <Button onLoadMore={loadMoreImages}></Button>}
      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
