const SingleGrocery = ({ grocery_item_id, grocery_item_name, grocery_tag }) => {
  return (
    <div key={grocery_item_id}>
      {(grocery_tag = "not bought" ? "x" : "y")}
      ------
      {grocery_item_name}
    </div>
  );
};

export default SingleGrocery;
