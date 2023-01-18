import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

function Searchbar() {
  const [query, setQuery] = useState('');

  const handleImageChange = event => {
    setQuery({ query: event.currentTarget.value.toLowerCase() });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter image title!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    //  onSubmit({ query });
    setQuery({ query: '' });
    event.target.reset();
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button type="submit" className={style.button}>
          <ImSearch style={{ marginRight: 8 }} />
          <span className={style.buttonLabel}></span>
        </button>
        <input
          className={style.input}
          type="text"
          name="nameImage"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleImageChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
