import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getMonthlyDonations = async () => {
  const response = await axios.get(`${base_url}donations/monthly`, config);
  return response.data;
};

const getYearlyDonations = async () => {
  const response = await axios.get(`${base_url}donations/yearly`, config);
  return response.data;
};

const getRecentDonations = async () => {
  const response = await axios.get(`${base_url}donations/recent`, config);
  return response.data;
};

const donationService = {
  getMonthlyDonations,
  getYearlyDonations,
  getRecentDonations,
};

export default donationService;
