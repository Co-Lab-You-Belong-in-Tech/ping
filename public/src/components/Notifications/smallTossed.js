import yes from "../../assets/yes.png";

const SmTossed = () => {
  return (
    <div className="addItemNty" style={{ background: "#E76F51" }}>
      <div style={{ paddingRight: "70px" }}>
        <img src={yes} alt="yes" />
      </div>
      <div id="tossP" style={{ color: "white" }}>
        You tossed your items.
      </div>
    </div>
  );
};

export default SmTossed;
