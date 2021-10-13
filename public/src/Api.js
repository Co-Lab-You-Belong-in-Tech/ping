import axios from "axios";

const OWN_URL = "https://food-ping.herokuapp.com";

// create a api class so i put all functions here for better organization and reuse purpuse

// i create these functions based on the route anita provided. but it is crashed today so it is not available to test now
class OwnAPI {
  // isUser? determine whether user existed in the user table
  static async isUser(email) {
    let data = await axios.get(`${OWN_URL}/getUser?email=${email}`);
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
    try {
      let { data } = await axios.get(`${OWN_URL}/getInventory?user_id=${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  /****post routes */
  // create user
  static async addUser(email) {
    try {
      let resp = await axios.post(`${OWN_URL}/addUser?email=${email}`);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  //get details
  static async getDetails(id) {
    const { data } = await axios.get(`${OWN_URL}/getDetails`, {
      params: { query_id: id },
    });
    return data;
  }

  //add grocery
  static async addGrocery(item_name, user_id) {
    try {
      let resp = await axios.post(
        `${OWN_URL}/addGroceryItem?item_name=${item_name}&user_id=${user_id}`
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  // edit fridge inventory method
  static async editFridge(tag, user_id, item_id) {
    try {
      let resp = await axios.put(
        `${OWN_URL}/editInventoryTag?tag=${tag}&user_id=${user_id}&item_id=${item_id}`
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  // put the grocery item into fridge ( add to inventory)
  static async addFridge(item_name, user_id, expiry_time, query_id) {
    try {
      let resp = await axios.post(
        `${OWN_URL}/addInventoryItem?item_name=${item_name}&user_id=${user_id}&expiry_time=${expiry_time}&query_id=${query_id}`
      );
      return resp.data;
    } catch (e) {
      console.error(e);
    }
  }
}

export default OwnAPI;
