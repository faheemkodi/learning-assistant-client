import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginView from "./pages/Login";
import RegisterView from "./pages/Register";
import DashboardView from "./pages/Dashboard";
import CourseView from "./pages/Course";
import LessonView from "./pages/Lesson";
import LearnView from "./pages/Learn";
import GuideView from "./pages/Guide";
import InterruptionsView from "./pages/Interruptions";
import SettingsView from "./pages/Settings";
import PasswordResetView from "./pages/PasswordReset";
import SuperuserView from "./pages/Superuser";
import LearnerCoursesView from "./pages/LearnerCourses";
import LearnerLessonsView from "./pages/LearnerLessons";
import LearnerTopicsView from "./pages/LearnerTopics";
import LearnerBurstsView from "./pages/LearnerBursts";
import RenewalView from "./pages/Renewal";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/guide" element={<GuideView />} />
          <Route path="/interruptions" element={<InterruptionsView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/lesson/:id/learn" element={<LearnView />} />
          <Route path="/lesson/:id" element={<LessonView />} />
          <Route path="/password-reset" element={<PasswordResetView />} />
          <Route path="/superuser" element={<SuperuserView />} />
          <Route
            path="/superuser/courses/:id"
            element={<LearnerCoursesView />}
          />
          <Route
            path="/superuser/lessons/:id"
            element={<LearnerLessonsView />}
          />
          <Route path="/superuser/topics/:id" element={<LearnerTopicsView />} />
          <Route path="/superuser/bursts/:id" element={<LearnerBurstsView />} />
          <Route path="/renewal" element={<RenewalView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        newestOnTop
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
