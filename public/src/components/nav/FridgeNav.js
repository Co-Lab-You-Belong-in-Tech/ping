import { store } from "react-notifications-component";
import { ReactComponent as FridegeUn } from "../../assets/FridgeUnselected.svg";

const FridgeNav = ({ expiredItem }) => {
  return <div>{expiredItem.length > 0 ? "FridgeA" : <FridegeUn />}</div>;
};

export default FridgeNav;
