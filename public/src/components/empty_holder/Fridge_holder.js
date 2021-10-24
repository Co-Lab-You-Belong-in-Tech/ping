import "../../recipe.css";

const FridgeHolder = ({ img, message, title }) => {
  return (
    <div className="holder-box">
      <div className="holder-title">
        <h3>{title}</h3>
        <p className="p-font">{message}</p>
      </div>

      <div style={{ paddingTop: "25px" }}>

        <img src={img} alt="holder_image" />
      </div>
    </div>
  );
};

export default FridgeHolder;
