import './Button.css';

export const Button = ({ LoadMore }) => {
  return (
    <div className="div-button">
      <button className="Button" onClick={LoadMore}>
        {' '}
        Load More{' '}
      </button>
    </div>
  );
};
