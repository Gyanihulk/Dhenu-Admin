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
      cowshedData,
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
  const token = localStorage.getItem('token');

  // Ensure FormData is sent directly
  const response = await axios.post(
    `${base_url}/cow-shed/${cowshedData.id}`,
    cowshedData.formData, // Pass FormData directly
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // FormData requires this header
      },
    }
  );

  return response.data;
};



const deleteCowShed = async (id) => {
  const token = localStorage.getItem('token');

  // Ensure FormData is sent directly
  const response = await axios.delete(
    `${base_url}/cow-shed/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
