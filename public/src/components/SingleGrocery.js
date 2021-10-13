const SingleGrocery = ({
  grocery_item_id,
  grocery_item_name,
  grocery_tag,
  display_tag,
  query_id = 16623,
}) => {
  return (
    <div key={grocery_item_id}>
      <button>{(grocery_tag = "not bought" ? "x" : "y")}</button>
      {grocery_item_name}
      -----{query_id}
    </div>
  );
};
// write axios chain here to get the time, to add to refrigeter

export default SingleGrocery;
