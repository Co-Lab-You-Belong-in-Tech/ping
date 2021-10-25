const LargeToss = ({ user, tagArray, handleUsageTag }) => {
  return (
    <div className="largeNtf">
      <div style={{ paddingTop: "18%", paddingBottom: "10%" }}>
        <h5 className="nty-font">Are you sure you want to toss?</h5>
      </div>
      <div style={{ padding: "10px", display: "inline-block" }}>
        <button
          className="nty-btn"
          onClick={() => handleUsageTag("tossed", user, tagArray)}
        >
          TOSS
        </button>
      </div>

      <button className="nty-btn-danger">NEVERMIND</button>
    </div>
  );
};

export default LargeToss;
