import yes from "../../assets/yes.png";

const AddItem = ({ item_name }) => {
  return (
    <div className="addItemNty">
      <img src={yes} alt="yes" />
      You've added {item_name} to your list!
    </div>
  );
};

export default AddItem;
