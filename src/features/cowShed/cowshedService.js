import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCowSheds = async () => {
  // const response = await axios.get(`${base_url}/cow-shed/`);
  const token = localStorage.getItem('token'); 
  const response = await axios.get(
    `${base_url}/cow-shed`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data.data.data;
};



const createCowShed = async (cowshedData) => {
  try {
    const formData = new FormData();

    // Convert JSON object to FormData fields
    Object.keys(cowshedData).forEach((key) => {
      formData.append(key, cowshedData[key]);
    });

    // Retrieve token from local storage
    const token = localStorage.getItem('token'); // Adjust the key if different

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    // Make the POST request with the formData
    const response = await axios.post(
      `${base_url}/cow-shed`,
      formData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating cow shed:', error.response?.data || error.message);
    throw error;
  }
};


const getCowShed = async (id) => {
  
  const token = localStorage.getItem('token'); 
  const response = await axios.get(
    `${base_url}/cow-shed/${id}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data.data;
};

const updateCowShed = async (cowshedData) => {
  const response = await axios.put(
    `${base_url}cowshed/${cowshedData.id}`,
    {
      name: cowshedData.cowShedData.name,
      total_capacity: cowshedData.cowShedData.total_capacity,
      current_capacity: cowshedData.cowShedData.current_capacity,
      productive_cows: cowshedData.cowShedData.productive_cows,
      unproductive_cows: cowshedData.cowShedData.unproductive_cows,
      description_line1: cowshedData.cowShedData.description_line1,
      GST: cowshedData.cowShedData.GST,
      total_area: cowshedData.cowShedData.total_area,
      total_employees: cowshedData.cowShedData.total_employees,
      incorporation_date: cowshedData.cowShedData.incorporation_date,
      monthly_expenses: cowshedData.cowShedData.monthly_expenses,
      address: cowshedData.cowShedData.address,
      phone_number: cowshedData.cowShedData.phone_number,
    },
    config
  );
  return response.data;
};

const deleteCowShed = async (id) => {
  const response = await axios.delete(`${base_url}cowshed/${id}`, config);
  return response.data;
};

const cowshedService = {
  getCowSheds,
  createCowShed,
  getCowShed,
  updateCowShed,
  deleteCowShed,
};

export default cowshedService;
