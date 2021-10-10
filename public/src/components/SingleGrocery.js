const SingleGrocery = ({ grocery_item_id, grocery_item_name, grocery_tag }) => {
  return (
    <div key={grocery_item_id}>
      {(grocery_tag = "not bought" ? "x" : "y")}
      ------
      {grocery_item_name}
    </div>
  );
};
// write axios chain here to get the time, to add to refrigeter

export default SingleGrocery;
