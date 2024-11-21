

import axios from "axios";
import { base_url } from "./baseUrl";



const getTokenFromLocalStorage = localStorage.getItem("user")
  ? localStorage.getItem("token")
  : null;
console.log(getTokenFromLocalStorage)
const httpClient = axios.create({
  baseURL: base_url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
  },
});

// Optional: Add interceptors for handling responses and errors
// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle token expiration, logout, etc.
//     if (error.response?.status === 401) {
//       console.error("Unauthorized. Redirecting to login.");
//       // Optionally, clear localStorage and redirect to login
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};


export default httpClient;
