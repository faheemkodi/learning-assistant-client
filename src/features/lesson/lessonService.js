import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/lessons/`;

// Single lesson fetching service
const getLesson = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Course's lesson list fetching service
const getLessons = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `course/${id}`, config);
  return response.data;
};

// Lesson creation service
const createLesson = async (lessonData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, lessonData, config);
  return response.data;
};

// Lesson updation service
const updateLesson = async (lessonData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, lessonData, config);
  return response.data;
};

// Lesson deletion service
const deleteLesson = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const lessonService = {
  getLesson,
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};

export default lessonService;
