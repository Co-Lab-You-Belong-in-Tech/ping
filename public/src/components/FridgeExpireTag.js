import Helper from "../hooks/Helpers";

const FridgeExpireTag = ({ inventory_tag, expiry_date }) => {
  const days = Helper.calTime(expiry_date);
  return (
    <div style={{ display: "inline-block" }}>
      {inventory_tag === "expired" && (
        <div style={{ color: "#9A0000" }}>{`already expired for 
          ${days} Days`}</div>
      )}
      {inventory_tag === "not expired" && days <= 2 && (
        <div style={{ color: "#e76f51" }}>{`expires in ${days} Days`} </div>
      )}
      {inventory_tag === "not expired" && days > 2 && (
        <div style={{ color: "#2A9D8F" }}>
          {`expires in 
          ${days} Days`}
        </div>
      )}
    </div>
  );
};

export default FridgeExpireTag;
