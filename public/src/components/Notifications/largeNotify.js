const LargeNtf = ({ tagArray, handleUsageTag, user }) => {
  return (
    <div>
      <div className="largeNtf">
        <div style={{ paddingTop: "18%", paddingBottom: "10%" }}>
          <h5 className="nty-font">Are you sure you want to mark as used?</h5>
        </div>
        <div style={{ padding: "10px", display: "inline-block" }}>
          <button
            className="nty-btn"
            onClick={() => handleUsageTag("used", user, tagArray)}
          >
            MARK AS USED
          </button>
        </div>

        <button className="nty-btn-danger">NEVERMIND</button>
      </div>
    </div>
  );
};

export default LargeNtf;
