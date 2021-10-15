import emptyfridge from "../../assets/Empty_Fridge_Logo.png";

const FridgeHolder = () => {
  return (
    <div>
      <div>
        <img src={emptyfridge} />
      </div>
      You don't have any items yet
    </div>
  );
};

export default FridgeHolder;
