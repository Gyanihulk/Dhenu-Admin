import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// const getTokenFromLocalStorage = localStorage.get("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const login = async (user) => {
  const { email, password } = user;

  try {
    // Construct the URL with query parameters
    const response = await axios.post(
      `${base_url}/user/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      {
        "username": email,
        "password" : password,
        "is_mobile": true,
        "device_uuid": "unique1",
        "fcm_token": "fcm_1",
        "device_info": "information",
        "os_type": "android",
        "app_version": "v.1.0.0.1",
        "google_login": false
    }
    );


    if (response.data.data.auth_token) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      const authToken = response.data.data.auth_token.replace(/^"|"$/g, "");
  localStorage.setItem("token", authToken);
      // console.log(response.data.data,"test")
      return response.data.data;
    }
  } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      console.log("Error Data:", error.response.data);
      console.log("Error Status:", error.response.status);
      return { error: error.response.data.message || "Login failed" };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: error.message };
    }
  }
};
const getOrders = async (data) => {
  const response = await axios.get(`${base_url}user/getallorders`, data);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`,

    config
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    config
  );

  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,

    data
  );

  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,

    data
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
