import "../../recipe.css";

const FridgeHolder = ({ img, message, title }) => {
  return (
    <div>
      <h5 className="empty-title">{title}</h5>
      <p className="empty-message">{message}</p>
      <div>
        <img src={img} alt="holder_image" />
      </div>
    </div>
  );
};

export default FridgeHolder;
