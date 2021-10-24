import yes from "../../assets/yes.png";

const SmUsed = () => {
  return (
    <div className="addItemNty">
      <div style={{ paddingRight: "70px" }}>
        <img src={yes} alt="yes" />
      </div>

      <div style={{ color: "white" }}>Congrats on using your items!</div>
    </div>
  );
};

export default SmUsed;
