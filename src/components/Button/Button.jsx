import css from './Button.module.css';
//import PropTypes from 'prop-types';

export const Button = ({ onClickLoadMore }) => {
  return (
    <div className={css.Button_div}>
      <button className={css.Button} onClick={onClickLoadMore}> Load More </button>
    </div>
  );
};

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };
