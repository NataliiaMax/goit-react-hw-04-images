import PropTypes from 'prop-types';
import style from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button className={style.buttonLoadMore} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
