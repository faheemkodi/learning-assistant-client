import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lessonService from "./lessonService";

const initialState = {
  lesson: {},
  lessons: [],
  getLessonsError: false,
  getLessonsSuccess: false,
  getLessonError: false,
  getLessonSuccess: false,
  createLessonError: false,
  createLessonSuccess: false,
  updateLessonError: false,
  updateLessonSuccess: false,
  deleteLessonError: false,
  deleteLessonSuccess: false,
  lessonLoading: false,
  lessonMessage: "",
};

// Create lesson
export const createLesson = createAsyncThunk(
  "lesson/create",
  async (lessonData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await lessonService.createLesson(lessonData, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

// Get single lesson
export const getLesson = createAsyncThunk(
  "lesson/get",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await lessonService.getLesson(id, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

// Get course lessons
export const getLessons = createAsyncThunk(
  "lesson/getAll",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await lessonService.getLessons(id, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

// Update lesson
export const updateLesson = createAsyncThunk(
  "lesson/update",
  async (lessonData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await lessonService.updateLesson(lessonData, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

// Delete lesson
export const deleteLesson = createAsyncThunk(
  "lesson/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await lessonService.deleteLesson(id, token);
    } catch (error) {
      const lessonMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(lessonMessage);
    }
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    resetLesson: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLesson.pending, (state) => {
        state.lessonLoading = true;
        state.createLessonError = false;
        state.createLessonSuccess = false;
        state.getLessonsError = false;
        state.getLessonsSuccess = false;
        state.getLessonError = false;
        state.getLessonSuccess = false;
        state.updateLessonError = false;
        state.updateLessonSuccess = false;
        state.deleteLessonError = false;
        state.deleteLessonSuccess = false;
        state.lessonMessage = "";
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.getLessonSuccess = true;
        state.lesson = action.payload;
      })
      .addCase(getLesson.rejected, (state, action) => {
        state.lessonLoading = false;
        state.getLessonError = true;
        state.lessonMessage = action.payload;
      })
      .addCase(createLesson.pending, (state) => {
        state.lessonLoading = true;
        state.createLessonError = false;
        state.createLessonSuccess = false;
        state.getLessonsError = false;
        state.getLessonsSuccess = false;
        state.getLessonError = false;
        state.getLessonSuccess = false;
        state.updateLessonError = false;
        state.updateLessonSuccess = false;
        state.deleteLessonError = false;
        state.deleteLessonSuccess = false;
        state.lessonMessage = "";
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.createLessonSuccess = true;
        state.lessons.push(action.payload);
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.lessonLoading = false;
        state.createLessonError = true;
        state.lessonMessage = action.payload;
      })
      .addCase(getLessons.pending, (state) => {
        state.lessonLoading = true;
        state.createLessonError = false;
        state.createLessonSuccess = false;
        state.getLessonsError = false;
        state.getLessonsSuccess = false;
        state.getLessonError = false;
        state.getLessonSuccess = false;
        state.updateLessonError = false;
        state.updateLessonSuccess = false;
        state.deleteLessonError = false;
        state.deleteLessonSuccess = false;
        state.lessonMessage = "";
      })
      .addCase(getLessons.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.getLessonsSuccess = true;
        state.lessons = action.payload;
        state.lessons.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getLessons.rejected, (state, action) => {
        state.lessonLoading = false;
        state.getLessonsError = true;
        state.lessonMessage = action.payload;
      })
      .addCase(updateLesson.pending, (state) => {
        state.lessonLoading = true;
        state.createLessonError = false;
        state.createLessonSuccess = false;
        state.getLessonsError = false;
        state.getLessonsSuccess = false;
        state.getLessonError = false;
        state.getLessonSuccess = false;
        state.updateLessonError = false;
        state.updateLessonSuccess = false;
        state.deleteLessonError = false;
        state.deleteLessonSuccess = false;
        state.lessonMessage = "";
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.updateLessonSuccess = true;
        state.lesson = action.payload;
        state.lessons = state.lessons.filter(
          (lesson) => lesson.id !== action.payload.id
        );
        state.lessons.push(action.payload);
        state.lessons.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.lessonLoading = false;
        state.updateLessonError = true;
        state.lessonMessage = action.payload;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.lessonLoading = true;
        state.createLessonError = false;
        state.createLessonSuccess = false;
        state.getLessonsError = false;
        state.getLessonsSuccess = false;
        state.getLessonError = false;
        state.getLessonSuccess = false;
        state.updateLessonError = false;
        state.updateLessonSuccess = false;
        state.deleteLessonError = false;
        state.deleteLessonSuccess = false;
        state.lessonMessage = "";
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.deleteLessonSuccess = true;
        state.lessons = state.lessons.filter(
          (lesson) => lesson.id !== action.payload
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.lessonLoading = false;
        state.deleteLessonError = true;
        state.lessonMessage = action.payload;
      });
  },
});

export const { resetLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
