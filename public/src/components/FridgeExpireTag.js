const FridgeExpireTag = ({ inventory_tag, expiry_date }) => {
  function calTime(t) {
    var currentDate = new Date();
    var time = new Date(t);
    var one_day = 1000 * 60 * 60 * 24;
    var result = Math.abs(time - currentDate) / one_day;
    return Math.floor(result);
  }
  const days = calTime(expiry_date);
  return (
    <div>
      {days <= 2 ? (
        <div style={{ color: "#2A9D8F" }}>
          {inventory_tag === "not expired"
            ? "expires in "
            : "already expired for "}
          {days} Days
        </div>
      ) : (
        <div style={{ color: "#9A0000" }}>
          {inventory_tag === "not expired"
            ? "expires in "
            : "already expired for "}
          {days} Days
        </div>
      )}
    </div>
  );
};

export default FridgeExpireTag;
