const LargeNtf = ({ tagArray, handleUsageTag, user }) => {
  return (
    <div className="largeNtf">
      <div>{tagArray}</div>
      <h5 className="nty-font">Are you sure you want to mark as used?</h5>
      <button
        className="nty-btn"
        onClick={() => handleUsageTag("used", user, tagArray)}
      >
        MARK AS USED
      </button>
      <button className="nty-btn-danger">NEVERMIND</button>
    </div>
  );
};

export default LargeNtf;
