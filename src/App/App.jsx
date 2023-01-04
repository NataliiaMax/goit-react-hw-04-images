import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryValues, fetchGallery } from 'components/API/API';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: null,
    status: 'idle',
    showButton: false,
    largeImageURL: '',
    showModal: false,
    tags: '',
  };

  handleFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({
      query,
      page: 1,
      images: [],
      showButton: false,
      status: 'idle',
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.query;
    const nextName = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.renderGallery();
    }
  }

  renderGallery = async () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    try {
      const { hits, totalHits } = await fetchGallery(query, page);

      if (totalHits === 0) {
        this.setState({ showButton: false, status: 'idle' });
        return toast.warn('No images on your query!');
      }
      const newImages = queryValues(hits);
      this.setState(({ images }) => ({
        images: [...images, ...newImages],
        totalHits,
      }));
      this.setState({
        status: 'resolved',
        showButton: true,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      toast.error('Oops... Something went wrong');
    } finally {
      this.setState({ status: 'idle' });
    }
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, showButton, largeImageURL, tags, showModal } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {images.length > 0 && (
          <ImageGallery
            images={images}
            openModal={this.openModal}
          ></ImageGallery>
        )}{' '}
        {status === 'pending' && <Loader />}
        {showButton && <Button onLoadMore={this.loadMoreImages}></Button>}
        {showModal && (
          <Modal
            onModalClick={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    );
  }
}

export default App;
