import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import { IconContext } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  getCourse,
  updateCourse,
  resetCourse,
} from "../features/course/courseSlice";
import {
  getLessons,
  createLesson,
  resetLesson,
} from "../features/lesson/lessonSlice";
import AppContainer from "../components/AppContainer";
import Lesson from "../components/Lesson";
import Kengram from "../components/Kengram";
import KengramEditor from "../components/KengramEditor";
import { calculateDaysToDate } from "../utils/course";

const CourseView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setLessonData({ ...lessonData, name: "" });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const {
    course,
    courseLoading,
    getCourseError,
    updateCourseError,
    updateCourseSuccess,
    courseMessage,
  } = useSelector((state) => state.course);
  const {
    lessons,
    lessonLoading,
    getLessonsError,
    createLessonError,
    createLessonSuccess,
    updateLessonError,
    updateLessonSuccess,
    deleteLessonError,
    deleteLessonSuccess,
    lessonMessage,
  } = useSelector((state) => state.lesson);

  const [lessonData, setLessonData] = useState({
    name: "",
    course_id: id,
  });

  const { name, course_id } = lessonData;

  const [courseData, setCourseData] = useState({
    kengram: course.kengram,
  });

  const { kengram } = courseData;

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => setKengramShow(false);

  const [kengramEditShow, setKengramEditShow] = useState(false);
  const handleKengramEditShow = () => {
    setKengramEditShow(true);
    setCourseData({ ...courseData, kengram: course.kengram });
  };
  const handleKengramEditClose = () => {
    setKengramEditShow(false);
    setKengramShow(false);
  };

  const handleKengramEditChange = (e) => {
    e.preventDefault();
    setCourseData({ ...courseData, kengram: e.target.value });
  };

  const handleKengramEditSubmit = (e) => {
    e.preventDefault();
    if (kengram !== course.kengram) {
      dispatch(
        updateCourse({
          id: course_id,
          name: course.name,
          kengram: kengram,
          stability: course.stability,
          current_velocity: course.current_velocity,
          required_velocity: course.required_velocity,
          intensity: course.intensity,
          goal: course.goal,
          goal_reset_date: course.goal_reset_date,
          deadline: new Date(course.deadline).toISOString(),
          streak: course.streak,
          strength: course.strength,
        })
      );
    }
    handleKengramEditClose();
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getCourse(course_id));
      dispatch(getLessons(course_id));
    }
  }, [loggedIn, course_id, dispatch]);

  useEffect(() => {
    if (getCourseError) {
      toast.error(courseMessage);
      navigate("/dashboard");
    }
    if (updateCourseError) {
      toast.error(courseMessage);
    }
    if (updateCourseSuccess) {
      toast.info("Course updated.");
    }
    if (getLessonsError) {
      toast.error("Oops, something went wrong! Please try reloading the page.");
    }
    if (createLessonError) {
      toast.error("Oops, something went wrong! Please try again.");
    }
    if (createLessonSuccess) {
      toast.success("Lesson created. Happy learning!");
    }
    if (updateLessonError) {
      toast.error(lessonMessage);
    }
    if (updateLessonSuccess) {
      toast.info("Lesson updated.");
    }
    if (deleteLessonError) {
      toast.error(lessonMessage);
    }
    if (deleteLessonSuccess) {
      toast.info("Lesson deleted.");
    }
  }, [
    getCourseError,
    updateCourseError,
    updateCourseSuccess,
    courseMessage,
    getLessonsError,
    createLessonError,
    createLessonSuccess,
    updateLessonError,
    updateLessonSuccess,
    deleteLessonError,
    deleteLessonSuccess,
    lessonMessage,
    navigate,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetCourse());
      dispatch(resetLesson());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(createLesson({ name: name.trim(), course_id }));
      handleClose();
    } else {
      handleClose();
    }
  };

  if (courseLoading || lessonLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <AppContainer>
      <Row className="mx-lg-auto">
        <h1 className="text-center text-uppercase mb-3">
          <Badge
            className="mw-100 text-truncate pointer"
            onClick={handleKengramShow}
          >
            {course.name}
          </Badge>
        </h1>
        {/* Course stats */}
        <Card border="light" className="dash-card mx-auto mb-4 py-3">
          <p className="text-center text-uppercase text-primary fw-bold">
            Course Stats
          </p>
          <Row xs={2} md={4} className="text-center mt-4">
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge
                    className="course-badge"
                    bg={
                      course.current_velocity < course.required_velocity
                        ? "danger"
                        : "success"
                    }
                  >
                    {course.current_velocity}%
                  </Badge>
                </span>
              </p>
              <p className="text-uppercase text-primary small lh-1">
                {course.progress === 100
                  ? "Average Velocity"
                  : "Current Velocity"}
              </p>
            </Col>
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge
                    className="course-badge"
                    bg={
                      course.required_velocity > course.current_velocity
                        ? "danger"
                        : "success"
                    }
                  >
                    {course.required_velocity}%
                  </Badge>
                </span>
              </p>
              <p className="text-uppercase text-primary small lh-1">
                Required Velocity
              </p>
            </Col>
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge
                    className="course-badge"
                    bg={
                      course.streak < 10
                        ? "danger"
                        : course.streak > 20
                        ? "success"
                        : "warning"
                    }
                  >
                    {course.streak}
                  </Badge>
                </span>
              </p>
              <p className="text-uppercase text-primary small lh-1">Streak</p>
            </Col>
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge
                    className="course-badge"
                    bg={
                      course.strength < 10
                        ? "danger"
                        : course.strength > 20
                        ? "success"
                        : "warning"
                    }
                  >
                    {course.strength}
                  </Badge>
                </span>
              </p>
              <p className="text-uppercase text-primary small lh-1">Strength</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Stack className="small">
              <p className="text-primary text-uppercase metric-label">Goal</p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  course.goal_status > 50 && course.goal_status < 100
                    ? "primary"
                    : course.goal_status > 99
                    ? "success"
                    : course.goal_status < 25
                    ? "danger"
                    : "warning"
                }
                now={course.goal_status}
              />
              <p className="text-primary text-uppercase metric-label">
                Progress
              </p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  course.progress > 50 && course.progress < 100
                    ? "primary"
                    : course.progress > 99
                    ? "success"
                    : course.progress < 25
                    ? "danger"
                    : "warning"
                }
                now={course.progress}
              />
              <p className="text-primary text-uppercase metric-label">
                Stability
              </p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  course.stability > 50 && course.stability < 80
                    ? "primary"
                    : course.stability > 80
                    ? "success"
                    : course.stability < 25
                    ? "danger"
                    : "warning"
                }
                now={course.stability}
              />
            </Stack>
          </Row>
          <Row className="mt-3 text-primary text-uppercase">
            <Col className="text-start">
              <Badge
                bg={
                  course.intensity === "High"
                    ? "danger"
                    : course.intensity === "Low"
                    ? "success"
                    : "primary"
                }
              >
                {course.intensity} intensity
              </Badge>
            </Col>
            <Col className="text-end">
              <Badge>{calculateDaysToDate(course.deadline)} days left</Badge>
            </Col>
          </Row>
        </Card>

        {/*  */}
        {course.current_velocity < course.required_velocity ||
        lessons.length === 0 ? (
          <Row className="mx-auto">
            <Col className="">
              <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20schedule%20a%20mentoring%20session,%20please!">
                <Button variant="danger" className="w-100 text-uppercase mb-3">
                  Book Mentoring
                </Button>
              </a>
            </Col>
          </Row>
        ) : null}
        {/* Lesson list */}
        <Row className="mx-auto">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Col key={lesson.id} xs={12} lg={6} className="mb-4">
                <Lesson lesson={lesson} />
              </Col>
            ))
          ) : (
            <p className="text-muted text-center">
              Please add lessons to start learning.
            </p>
          )}
        </Row>

        <Row className="mx-auto">
          <Col className="">
            <Button
              variant="primary"
              className="w-100 text-uppercase"
              onClick={handleShow}
            >
              Add Lesson
            </Button>
          </Col>
        </Row>

        {/* Create lesson modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Add a new lesson</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Floating className="mb-3 text-primary small">
                <Form.Control
                  id="lesson-name"
                  type="text"
                  placeholder="Lesson Name"
                  value={name}
                  onChange={(e) =>
                    setLessonData({ ...lessonData, name: e.target.value })
                  }
                  autoComplete="off"
                />
                <label htmlFor="lesson-name">Lesson Name</label>
              </Form.Floating>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary text-uppercase" onClick={handleSubmit}>
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "course-icon",
                }}
              >
                <BsCheckLg />
              </IconContext.Provider>
            </Button>
          </Modal.Footer>
        </Modal>

        <Kengram
          show={kengramShow}
          handleClose={handleKengramClose}
          handleEdit={handleKengramEditShow}
          header={course.name}
          body={course.kengram}
        />

        <KengramEditor
          show={kengramEditShow}
          handleClose={handleKengramEditClose}
          handleChange={handleKengramEditChange}
          handleSubmit={handleKengramEditSubmit}
          header={course.name}
          body={kengram}
        />
      </Row>
    </AppContainer>
  );
};

export default CourseView;
