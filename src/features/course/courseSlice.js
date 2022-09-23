import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
  course: {},
  courses: [],
  createCourseError: false,
  createCourseSuccess: false,
  getCoursesError: false,
  getCoursesSuccess: false,
  getCourseError: false,
  getCourseSuccess: false,
  updateCourseError: false,
  updateCourseSuccess: false,
  deleteCourseError: false,
  deleteCourseSuccess: false,
  courseLoading: false,
  courseMessage: "",
};

// Create course
export const createCourse = createAsyncThunk(
  "course/create",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await courseService.createCourse(courseData, token);
    } catch (error) {
      const courseMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

// Get list of user's courses
export const getCourses = createAsyncThunk(
  "course/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await courseService.getCourses(token);
    } catch (error) {
      const courseMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

// Get single course
export const getCourse = createAsyncThunk(
  "course/get",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await courseService.getCourse(id, token);
    } catch (error) {
      const courseMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

// Update course
export const updateCourse = createAsyncThunk(
  "course/update",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await courseService.updateCourse(courseData, token);
    } catch (error) {
      const courseMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

// Delete course
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await courseService.deleteCourse(id, token);
    } catch (error) {
      const courseMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourse: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.courseLoading = true;
        state.createCourseError = false;
        state.createCourseSuccess = false;
        state.getCoursesError = false;
        state.getCoursesSuccess = false;
        state.getCourseError = false;
        state.getCourseSuccess = false;
        state.updateCourseError = false;
        state.updateCourseSuccess = false;
        state.deleteCourseError = false;
        state.deleteCourseSuccess = false;
        state.courseMessage = "";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.createCourseSuccess = true;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.courseLoading = false;
        state.createCourseError = true;
        state.courseMessage = action.payload;
      })
      .addCase(getCourses.pending, (state) => {
        state.courseLoading = true;
        state.createCourseError = false;
        state.createCourseSuccess = false;
        state.getCoursesError = false;
        state.getCoursesSuccess = false;
        state.getCourseError = false;
        state.getCourseSuccess = false;
        state.updateCourseError = false;
        state.updateCourseSuccess = false;
        state.deleteCourseError = false;
        state.deleteCourseSuccess = false;
        state.courseMessage = "";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.getCoursesSuccess = true;
        state.courses = action.payload;
        state.courses.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.courseLoading = false;
        state.getCoursesError = true;
        state.courseMessage = action.payload;
      })
      .addCase(getCourse.pending, (state) => {
        state.courseLoading = true;
        state.createCourseError = false;
        state.createCourseSuccess = false;
        state.getCoursesError = false;
        state.getCoursesSuccess = false;
        state.getCourseError = false;
        state.getCourseSuccess = false;
        state.updateCourseError = false;
        state.updateCourseSuccess = false;
        state.deleteCourseError = false;
        state.deleteCourseSuccess = false;
        state.courseMessage = "";
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.getCourseSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.courseLoading = false;
        state.getCourseError = true;
        state.courseMessage = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.courseLoading = true;
        state.createCourseError = false;
        state.createCourseSuccess = false;
        state.getCoursesError = false;
        state.getCoursesSuccess = false;
        state.getCourseError = false;
        state.getCourseSuccess = false;
        state.updateCourseError = false;
        state.updateCourseSuccess = false;
        state.deleteCourseError = false;
        state.deleteCourseSuccess = false;
        state.courseMessage = "";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.updateCourseSuccess = true;
        state.course = action.payload;
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload.id
        );
        state.courses.push(action.payload);
        state.courses.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.courseLoading = false;
        state.updateCourseError = true;
        state.courseMessage = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.courseLoading = true;
        state.createCourseError = false;
        state.createCourseSuccess = false;
        state.getCoursesError = false;
        state.getCoursesSuccess = false;
        state.getCourseError = false;
        state.getCourseSuccess = false;
        state.updateCourseError = false;
        state.updateCourseSuccess = false;
        state.deleteCourseError = false;
        state.deleteCourseSuccess = false;
        state.courseMessage = "";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.deleteCourseSuccess = true;
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.courseLoading = false;
        state.deleteCourseError = true;
        state.courseMessage = action.payload;
      });
  },
});

export const { resetCourse } = courseSlice.actions;
export default courseSlice.reducer;
