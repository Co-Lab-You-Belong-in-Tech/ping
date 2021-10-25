const LargeExp = ({ expireItems }) => {
  return (
    <div className="largeNtf">
      <div style={{ paddingTop: "18%", paddingBottom: "10%" }}>
        <h5 className="nty-font">
          Your {expireItems.join(" and ")} are about to expire!
        </h5>
      </div>
      <div style={{ padding: "10px", display: "inline-block" }}>
        <button className="nty-btn">GOT IT!</button>
      </div>
      <a href="/recipes">
        <button className="nty-btn-danger">SHOW RECIPES</button>
      </a>
    </div>
  );
};

export default LargeExp;
