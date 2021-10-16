const FridgeHolder = ({ img, message, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      {message}
      <div>
        <img src={img} />
      </div>
    </div>
  );
};

export default FridgeHolder;
