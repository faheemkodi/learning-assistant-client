import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import ProgressBar from "react-bootstrap/ProgressBar";
import { IconContext } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Course from "../components/Course";
import AppContainer from "../components/AppContainer";
import { calculateCourseDeadline } from "../utils/course";
import { getUser, updateUser, resetUser } from "../features/user/userSlice";
import {
  getCourses,
  createCourse,
  resetCourse,
} from "../features/course/courseSlice";
import Kengram from "../components/Kengram";
import KengramEditor from "../components/KengramEditor";

const DashboardView = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [courseData, setCourseData] = useState({
    name: "",
    goal: 10,
    intensity: "Normal",
    deadline: calculateCourseDeadline(new Date()),
  });

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setCourseData({
      ...courseData,
      name: "",
      goal: 10,
      intensity: "Normal",
      deadline: calculateCourseDeadline(new Date()),
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token,
    user,
    userLoading,
    getUserError,
    updateUserError,
    updateUserSuccess,
    userMessage,
  } = useSelector((state) => state.user);

  const {
    courses,
    courseLoading,
    getCoursesError,
    createCourseError,
    createCourseSuccess,
    updateCourseError,
    updateCourseSuccess,
    deleteCourseError,
    deleteCourseSuccess,
    courseMessage,
  } = useSelector((state) => state.course);

  const [userData, setUserData] = useState({
    kengram: user.kengram,
  });

  const { kengram } = userData;

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => setKengramShow(false);

  const [kengramEditShow, setKengramEditShow] = useState(false);
  const handleKengramEditShow = () => {
    setKengramEditShow(true);
    setUserData({ ...userData, kengram: user.kengram });
  };
  const handleKengramEditClose = () => {
    setKengramEditShow(false);
    setKengramShow(false);
  };

  const handleKengramEditChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, kengram: e.target.value });
  };

  const handleKengramEditSubmit = (e) => {
    e.preventDefault();
    if (kengram !== user.kengram) {
      dispatch(
        updateUser({
          id: user.id,
          name: user.name,
          kengram: kengram,
          username: user.username,
          email: user.email,
        })
      );
    }
    handleKengramEditClose();
  };

  const active = user.active;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (active === false) {
      navigate("/renewal");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate, active]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
      dispatch(getCourses());
    }
  }, [loggedIn, dispatch]);

  useEffect(() => {
    if (getUserError) {
      toast.error(userMessage);
    }
    if (updateUserSuccess) {
      toast.info("User updated.");
    }
    if (updateUserError) {
      toast.error(userMessage);
    }
    if (getCoursesError) {
      toast.error("Oops, something went wrong! Please try reloading the page.");
    }
    if (createCourseError) {
      toast.error("Oops, something went wrong! Please try again.");
    }
    if (createCourseSuccess) {
      toast.success("Course created. Happy learning!");
    }
    if (updateCourseSuccess) {
      toast.info("Course updated.");
    }
    if (updateCourseError) {
      toast.error(courseMessage);
    }
    if (deleteCourseError) {
      toast.error(courseMessage);
    }
    if (deleteCourseSuccess) {
      toast.info("Course deleted.");
    }
  }, [
    getUserError,
    updateUserError,
    updateUserSuccess,
    userMessage,
    getCoursesError,
    createCourseError,
    createCourseSuccess,
    updateCourseError,
    updateCourseSuccess,
    deleteCourseError,
    deleteCourseSuccess,
    courseMessage,
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
      dispatch(resetCourse());
    };
  }, [dispatch]);

  const { name, goal, intensity, deadline } = courseData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(
        createCourse({
          name: name.trim(),
          intensity,
          deadline: new Date(deadline).toISOString(),
          goal,
        })
      );
      handleClose();
    } else {
      handleClose();
    }
  };

  if (userLoading || courseLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <AppContainer>
      {/* User stats */}
      <Row className="mx-lg-auto">
        <h1 className="text-center text-uppercase mb-3">
          <Badge
            className="mw-100 text-truncate pointer"
            onClick={handleKengramShow}
          >
            {user.name}
          </Badge>
        </h1>
        <Card border="light" className="dash-card mx-auto mb-4 py-3">
          <p className="text-center text-uppercase text-primary fw-bold">
            Overall Stats
          </p>
          <Row xs={2} className="text-center">
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge className="course-badge" bg="primary">
                    {user.level}
                  </Badge>
                </span>
              </p>
              <p className="text-uppercase text-primary small lh-1">Level</p>
            </Col>
            <Col>
              <p className="text-uppercase text-primary">
                <span className="number fs-1">
                  <Badge className="course-badge" bg="primary">
                    {user.strength}
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
                  user.goal_status > 50 && user.goal_status < 100
                    ? "primary"
                    : user.goal_status > 99
                    ? "success"
                    : user.goal_status < 25
                    ? "danger"
                    : "warning"
                }
                now={user.goal_status}
              />
              <p className="text-primary text-uppercase metric-label">
                Progress
              </p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  user.progress > 50 && user.progress < 100
                    ? "primary"
                    : user.progress > 99
                    ? "success"
                    : user.progress < 25
                    ? "danger"
                    : "warning"
                }
                now={user.progress}
              />
            </Stack>
          </Row>
        </Card>

        {/* Course list */}
        <Row className="mx-auto">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Col
                key={course.id}
                xs={12}
                md={6}
                lg={4}
                xxl={3}
                className="mb-4"
              >
                <Course course={course} />
              </Col>
            ))
          ) : (
            <>
              <Col className="">
                <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20schedule%20a%20mentoring%20session,%20please!">
                  <Button
                    variant="danger"
                    className="w-100 text-uppercase mb-3"
                  >
                    Book Mentoring
                  </Button>
                </a>
              </Col>
              <p className="text-muted text-center">
                Please add courses to start learning.
              </p>
            </>
          )}
        </Row>
        <Row className="mx-auto">
          <Col className="">
            <Button
              variant="primary"
              className="w-100 text-uppercase"
              onClick={handleShow}
            >
              Add Course
            </Button>
          </Col>
        </Row>

        {/* Create course modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Add a new course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Course name */}
              <Form.Floating className="mb-3 text-primary small">
                <Form.Control
                  id="course-name"
                  type="text"
                  placeholder="Course Name"
                  value={name}
                  onChange={(e) =>
                    setCourseData({ ...courseData, name: e.target.value })
                  }
                  autoComplete="off"
                />
                <label htmlFor="course-name">Course Name</label>
              </Form.Floating>
              {/* Course goal */}
              <Form.Floating className="mb-3 text-primary small">
                <Form.Control
                  id="course-goal"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Hours/Week"
                  value={goal}
                  onChange={(e) =>
                    setCourseData({ ...courseData, goal: e.target.value })
                  }
                  autoComplete="off"
                />
                <label htmlFor="course-goal">Hours/Week</label>
              </Form.Floating>
              {/* Course intensity */}
              <Form.Floating className="mb-3 text-primary small">
                <Form.Select
                  id="course-intensity"
                  placeholder="Intensity"
                  value={intensity}
                  onChange={(e) =>
                    setCourseData({ ...courseData, intensity: e.target.value })
                  }
                  autoComplete="off"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </Form.Select>
                <label htmlFor="course-intensity">Intensity</label>
              </Form.Floating>
              {/* Course deadline */}
              <Form.Floating className="mb-3 text-primary small">
                <Form.Control
                  id="course-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      deadline: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
                <label htmlFor="course-deadline">Deadline</label>
              </Form.Floating>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
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
          header={user.name}
          body={user.kengram}
          sudo={false}
        />

        <KengramEditor
          show={kengramEditShow}
          handleClose={handleKengramEditClose}
          handleChange={handleKengramEditChange}
          handleSubmit={handleKengramEditSubmit}
          header={user.name}
          body={kengram}
        />
      </Row>
    </AppContainer>
  );
};

export default DashboardView;
