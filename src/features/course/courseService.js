import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/courses/`;

// Course creation service
const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, courseData, config);
  return response.data;
};

// Course list fetching service
const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Single course fetching service
const getCourse = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Course updation service
const updateCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, courseData, config);
  return response.data;
};

// Course deletion service
const deleteCourse = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const courseService = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};

export default courseService;
