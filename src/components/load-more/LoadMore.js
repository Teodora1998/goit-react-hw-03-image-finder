const LoadMore = ({ updatePageNum }) => {
  const handleClick = () => {
    updatePageNum();
  };
  return (
    <button className="Button" onClick={handleClick}>
      Load more
    </button>
  );
};
export default LoadMore;
