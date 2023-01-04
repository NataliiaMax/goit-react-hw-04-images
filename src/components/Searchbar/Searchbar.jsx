import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };
  state = {
    query: '',
  };

  handleImageChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Please enter image title!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    event.target.reset();
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <ImSearch style={{ marginRight: 8 }} />
            <span className={style.buttonLabel}></span>
          </button>
          <input
            className={style.input}
            type="text"
            name="nameImage"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleImageChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
