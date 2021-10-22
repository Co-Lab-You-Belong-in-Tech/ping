import { wrap } from "module";

const LargeExp = ({ expireItems }) => {
  return (
    <div className="largeNtf">
      <div style={{ overflowWrap: "break-word" }}>
        <p className="nty-font">Your {expireItems} are about to expire!</p>
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
