import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/bursts/`;

// Burst creation service'
const createBurst = async (burstData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, burstData, config);
  return response.data;
};

// Interruptions fetching service
const getInterruptions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "interruptions", config);
  return response.data;
};

const burstService = {
  createBurst,
  getInterruptions,
};

export default burstService;
