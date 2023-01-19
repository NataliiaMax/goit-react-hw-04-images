import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.cancelable && event.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === '') {
      toast.error('Please enter image title!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    onSubmit(normalizedQuery);
    setQuery({ query: '' });
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
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
