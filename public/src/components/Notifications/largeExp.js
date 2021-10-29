import { Link } from "react-router-dom";

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
      <Link to="/recipes">
        <button className="nty-btn-danger">SHOW RECIPES</button>
      </Link>
    </div>
  );
};

export default LargeExp;
