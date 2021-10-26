class Helper {
  static calTime = (t) => {
    var currentDate = new Date();
    var time = new Date(t);
    var one_day = 1000 * 60 * 60 * 24;
    var result = Math.abs(time - currentDate) / one_day;
    return Math.floor(result);
  };

  static getExpiredArray(data) {
    let result = [];
    if (!data) return ["carrot"];
    data = data.filter(
      (a) =>
        Helper.calTime(a.expiry_date) <= 2 &&
        a.usage_tag === null &&
        a.inventory_tag === "not expired"
    ); // need to rerange the data standard
    for (var i in data) {
      //result.push(data[i].inventory_item_name.replace(/ .*/, "").toLowerCase());
      result = [
        ...result,
        data[i].inventory_item_name.replace(/ .*/, "").toLowerCase(),
      ];
    }
    return result;
  }
}

export default Helper;
