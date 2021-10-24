const LargeExp = ({ expireItems }) => {
  return (
    <div className="largeNtf">
      <div>
        <h5 className="nty-font">Your {expireItems} are about to expire!</h5>
      </div>
      <button className="nty-btn">GOT IT!</button>

      <a href="/recipes">
        <button className="nty-btn-danger">SHOW RECIPES</button>
      </a>
    </div>
  );
};

export default LargeExp;
