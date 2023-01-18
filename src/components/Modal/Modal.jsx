import {useEffect} from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

function Modal ({tags,onModalClick,largeImageURL}){

  useEffect =() => {
    window.addEventListener('keydown', onKeyDown);
  }

  useEffect =()=>{
    window.removeEventListener('keydown', onKeyDown);
  }

 const onKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClick();
    }
  };

  const onOverleyClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

     return (
      <div className={style.overlay} onClick={onOverleyClick}>
        <div className={style.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }

  Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
};
  
export default Modal;
