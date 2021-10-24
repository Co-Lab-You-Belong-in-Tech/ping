const LargeToss = ({ user, tagArray, handleUsageTag }) => {
  return (
    <div className="largeNtf">
      <div>
        <h5 className="nty-font">Are you sure you want to toss?</h5>
      </div>
      <button
        className="nty-btn"
        onClick={() => handleUsageTag("tossed", user, tagArray)}
      >
        TOSS
      </button>
      <button className="nty-btn-danger">NEVERMIND</button>
    </div>
  );
};

export default LargeToss;
