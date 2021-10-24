import { store } from "react-notifications-component";
import { ReactComponent as FridegeUn } from "../../assets/FridgeUnselected.svg";
import LargeExp from "../Notifications/largeExp";
import Ellipse from "../../assets/Ellipse.png";

const FridgeNav = ({ expiredItem }) => {
  /**this is the react notifications part */

  const handleClick = () => {
    store.addNotification({
      content: <LargeExp expireItems={expiredItem} />, // content:MyNotify (custom notification)
      type: "success",
      insert: "top",
      container: "center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  };
  return (
    <div>
      {expiredItem.length > 0 ? (
        <div onClick={() => handleClick()} style={{ position: "relative" }}>
          <FridegeUn />
          <div id="circle"></div>
        </div>
      ) : (
        <FridegeUn />
      )}
    </div>
  );
};

export default FridgeNav;
