import axios from "axios";

const OWN_URL = "https://food-ping.herokuapp.com";

// create a api class so i put all functions here for better organization and reuse purpuse

// i create these functions based on the route anita provided. but it is crashed today so it is not available to test now
class OwnAPI {
  // isUser? determine whether user existed in the user table
  static async isUser(email) {
    let { data } = await axios.get(`${OWN_URL}/getUser?email=${email}`);
    return data;
  }

  // get user's groceries
  static async getGroceries(id) {
    let { data } = await axios.get(`${OWN_URL}/getGroceries?user_id=${id}`);
    return data;
  }

  // to pull data from users inventory using userID
  /**** this one works****/
  static async getTheUserInventory(id) {
    let { data } = await axios.get(`${OWN_URL}/getInventory?user_id=${id}`);
    return data;
  }
}

export default OwnAPI;
