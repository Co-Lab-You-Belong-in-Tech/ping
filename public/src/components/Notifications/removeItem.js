import yes from "../../assets/yes.png";

const RemoveItem = ({ item_name }) => {
  return (
    <div className="addItemNty" style={{ background: "#E76F51" }}>
      <img src={yes} alt="yes" />
      You've removed {item_name} to your fridge!
    </div>
  );
};

export default RemoveItem;
