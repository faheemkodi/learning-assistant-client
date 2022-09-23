import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";
import lessonReducer from "../features/lesson/lessonSlice";
import topicReducer from "../features/topic/topicSlice";
import burstReducer from "../features/burst/burstSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    lesson: lessonReducer,
    topic: topicReducer,
    burst: burstReducer,
  },
});
