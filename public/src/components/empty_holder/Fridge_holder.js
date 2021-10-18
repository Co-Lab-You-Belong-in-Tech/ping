const FridgeHolder = ({ img, message, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      {message}
      <div>
        <img src={img} alt="holder_image" />
      </div>
    </div>
  );
};

export default FridgeHolder;
