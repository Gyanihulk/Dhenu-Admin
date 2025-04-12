import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const token = localStorage.getItem("token");
const getUpcomingDonations = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/admin/upcoming-donations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; 
  };
  
  const getMetrics = async () => {
    const token = localStorage.getItem("token");
  
    const response = await axios.get(`${base_url}/metrics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data.data; // returns { total_donations, total_cow_sheds, ... }
  };
const getCompletedDonations = async () => {
  const response = await axios.get(`${base_url}/admin/completed-donations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const adminDonationService = {
  getUpcomingDonations,
  getCompletedDonations,
  getMetrics
};

export default adminDonationService;
