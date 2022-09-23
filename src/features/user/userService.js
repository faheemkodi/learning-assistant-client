import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_DEV}/api/users/`;
const AUTH_URL = `${process.env.REACT_APP_API_DEV}/api/login`;

// User registration service
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

// User login service
const login = async (userData) => {
  const response = await axios.post(AUTH_URL, userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

// User logout service
const logout = () => {
  localStorage.removeItem("token");
};

// Get user service
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update user service
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, userData, config);
  return response.data;
};

// Update password service
const updatePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "password", passwordData, config);
  return response.data;
};

// Get reset code service
const getResetCode = async (userData) => {
  const response = await axios.post(API_URL + "get-reset-code", userData);
  return response.data;
};

// Get reset code service
const resetPassword = async (userData) => {
  const response = await axios.post(API_URL + "reset-password", userData);
  return response.data;
};

const userService = {
  register,
  login,
  logout,
  getUser,
  updateUser,
  updatePassword,
  getResetCode,
  resetPassword,
};

export default userService;
