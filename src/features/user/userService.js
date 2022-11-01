import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/users/`;
const AUTH_URL = `${process.env.REACT_APP_API}/api/login`;

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

// Sudo get all users service
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

// Sudo get user courses service
const getUserCourses = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `courses/${id}`, config);
  return response.data;
};

// Sudo get user courses service
const getUserLessons = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `lessons/${id}`, config);
  return response.data;
};

// Sudo get user topics service
const getUserTopics = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `topics/${id}`, config);
  return response.data;
};

// Sudo get user topics service
const getUserBursts = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `bursts/${id}`, config);
  return response.data;
};

// Sudo update superuser service
const updateSudo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "sudo", id, config);
  return response.data;
};

// Sudo renew user service
const renew = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "renew", id, config);
  return response.data;
};

// Sudo delete user service
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `${id}`, config);
  return response.data;
};

// Sudo invite create service
const sudoInvite = async (inviteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "create-invite",
    inviteData,
    config
  );
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
  getAllUsers,
  getUserCourses,
  getUserLessons,
  getUserTopics,
  getUserBursts,
  updateSudo,
  renew,
  deleteUser,
  sudoInvite,
};

export default userService;
