import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/topics/`;

// Topic creation service
const createTopic = async (topicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, topicData, config);
  return response.data;
};

// Single topic fetching service
const getTopic = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Lesson's topic list fetching service
const getTopics = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `lesson/${id}`, config);
  return response.data;
};

// Topic updation service
const updateTopic = async (topicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, topicData, config);
  return response.data;
};

// Topic deletion service
const deleteTopic = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const topicService = {
  createTopic,
  getTopic,
  getTopics,
  updateTopic,
  deleteTopic,
};

export default topicService;
