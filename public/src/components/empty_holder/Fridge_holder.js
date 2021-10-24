const FridgeHolder = ({ img, message, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p className="p-font">{message}</p>
      <div>
        <img src={img} alt="holder_image" />
      </div>
    </div>
  );
};

export default FridgeHolder;
