import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import topicService from "./topicService";

const initialState = {
  topic: {},
  topics: [],
  getTopicsError: false,
  getTopicsSuccess: false,
  getTopicError: false,
  getTopicSuccess: false,
  createTopicError: false,
  createTopicSuccess: false,
  updateTopicError: false,
  updateTopicSuccess: false,
  deleteTopicError: false,
  deleteTopicSuccess: false,
  topicLoading: false,
  topicMessage: "",
};

// Create topic
export const createTopic = createAsyncThunk(
  "topic/create",
  async (topicData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await topicService.createTopic(topicData, token);
    } catch (error) {
      const topicMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(topicMessage);
    }
  }
);

// Get single topic
export const getTopic = createAsyncThunk("topic/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.token;
    return await topicService.getTopic(id, token);
  } catch (error) {
    const topicMessage = error.response.data["detail"];
    return thunkAPI.rejectWithValue(topicMessage);
  }
});

// Get lesson topics
export const getTopics = createAsyncThunk(
  "topic/getAll",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await topicService.getTopics(id, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

// Update topic
export const updateTopic = createAsyncThunk(
  "topic/update",
  async (topicData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await topicService.updateTopic(topicData, token);
    } catch (error) {
      const topicMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(topicMessage);
    }
  }
);

// Delete topic
export const deleteTopic = createAsyncThunk(
  "topic/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await topicService.deleteTopic(id, token);
    } catch (error) {
      const topicMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(topicMessage);
    }
  }
);

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    resetTopic: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTopic.pending, (state) => {
        state.topicLoading = true;
        state.createTopicError = false;
        state.createTopicSuccess = false;
        state.getTopicsError = false;
        state.getTopicsSuccess = false;
        state.getTopicError = false;
        state.getTopicSuccess = false;
        state.updateTopicError = false;
        state.updateTopicSuccess = false;
        state.deleteTopicError = false;
        state.deleteTopicSuccess = false;
        state.topicMessage = "";
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.topicLoading = false;
        state.createTopicSuccess = true;
        state.topics.push(action.payload);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.topicLoading = false;
        state.createTopicError = true;
        state.topicMessage = action.payload;
      })
      .addCase(getTopic.pending, (state) => {
        state.topicLoading = true;
        state.createTopicError = false;
        state.createTopicSuccess = false;
        state.getTopicsError = false;
        state.getTopicsSuccess = false;
        state.getTopicError = false;
        state.getTopicSuccess = false;
        state.updateTopicError = false;
        state.updateTopicSuccess = false;
        state.deleteTopicError = false;
        state.deleteTopicSuccess = false;
        state.topicMessage = "";
      })
      .addCase(getTopic.fulfilled, (state, action) => {
        state.topicLoading = false;
        state.getTopicSuccess = true;
        state.topic = action.payload;
      })
      .addCase(getTopic.rejected, (state, action) => {
        state.topicLoading = false;
        state.getTopicError = true;
        state.topicMessage = action.payload;
      })
      .addCase(getTopics.pending, (state) => {
        state.topicLoading = true;
        state.createTopicError = false;
        state.createTopicSuccess = false;
        state.getTopicsError = false;
        state.getTopicsSuccess = false;
        state.getTopicError = false;
        state.getTopicSuccess = false;
        state.updateTopicError = false;
        state.updateTopicSuccess = false;
        state.deleteTopicError = false;
        state.deleteTopicSuccess = false;
        state.topicMessage = "";
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.topicLoading = false;
        state.getTopicsSuccess = true;
        state.topics = action.payload;
        state.topics.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.topicLoading = false;
        state.getTopicsError = true;
        state.topicMessage = action.payload;
      })
      .addCase(updateTopic.pending, (state) => {
        state.topicLoading = true;
        state.createTopicError = false;
        state.createTopicSuccess = false;
        state.getTopicsError = false;
        state.getTopicsSuccess = false;
        state.getTopicError = false;
        state.getTopicSuccess = false;
        state.updateTopicError = false;
        state.updateTopicSuccess = false;
        state.deleteTopicError = false;
        state.deleteTopicSuccess = false;
        state.topicMessage = "";
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.topicLoading = false;
        state.updateTopicSuccess = true;
        state.topic = action.payload;
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload.id
        );
        state.topics.push(action.payload);
        state.topics.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.topicLoading = false;
        state.updateTopicError = true;
        state.topicMessage = action.payload;
      })
      .addCase(deleteTopic.pending, (state) => {
        state.topicLoading = true;
        state.createTopicError = false;
        state.createTopicSuccess = false;
        state.getTopicsError = false;
        state.getTopicsSuccess = false;
        state.getTopicError = false;
        state.getTopicSuccess = false;
        state.updateTopicError = false;
        state.updateTopicSuccess = false;
        state.deleteTopicError = false;
        state.deleteTopicSuccess = false;
        state.topicMessage = "";
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.topicLoading = false;
        state.deleteTopicSuccess = true;
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload
        );
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.topicLoading = false;
        state.deleteTopicError = true;
        state.topicMessage = action.payload;
      });
  },
});

export const { resetTopic } = topicSlice.actions;
export default topicSlice.reducer;
