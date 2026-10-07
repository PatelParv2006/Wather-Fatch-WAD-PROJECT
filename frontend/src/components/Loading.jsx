const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">{text}</p>
    </div>
  );
};

export default Loading;
