import axios from "axios";

const OWN_URL = "https://food-ping.herokuapp.com";

// create a api class so i put all functions here for better organization and reuse purpuse
class OwnAPI {
  // to pull data from users inventory using userID
  static async getTheUserInventory(id) {
    let { data } = await axios.get(`${OWN_URL}/getInventory?user_id=${id}`);
    return data;
  }
}

export default OwnAPI;
