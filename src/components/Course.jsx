import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { updateCourse, deleteCourse } from "../features/course/courseSlice";
import { calculateDaysToDate, calculateRemainingGoal } from "../utils/course";

const Course = ({ course }) => {
  const [courseData, setCourseData] = useState({
    id: course.id,
    name: course.name,
    intensity: course.intensity,
    goal: course.goal,
    goal_reset_date: course.goal_reset_date,
    deadline: course.deadline.substring(0, 10),
    streak: course.streak,
    strength: course.strength,
  });

  const {
    id,
    name,
    intensity,
    goal,
    deadline,
    streak,
    strength,
    goal_reset_date,
  } = courseData;

  const dispatch = useDispatch();
  const { courseLoading } = useSelector((state) => state.course);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  const [modifyShow, setModifyShow] = useState(false);
  const handleModifyShow = () => setModifyShow(true);
  const handleModifyClose = () => {
    setModifyShow(false);
    setCourseData({
      ...courseData,
      name: course.name,
      intensity: course.intensity,
      goal: course.goal,
      deadline: course.deadline.substring(0, 10),
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (
      name !== course.name ||
      intensity !== course.intensity ||
      goal !== course.goal ||
      deadline !== course.deadline.substring(0, 10)
    ) {
      dispatch(
        updateCourse({
          id,
          name: name.trim(),
          intensity,
          goal,
          goal_reset_date,
          deadline: new Date(deadline).toISOString(),
          streak,
          strength,
        })
      );
      handleModifyClose();
    } else {
      handleModifyClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCourse(id));
  };

  if (courseLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <>
      <Card className="brand-shadow text-start" border="light" text="primary">
        <Card.Header className="text-uppercase small fw-bold text-light bg-primary">
          <Row>
            <Col xs={10} className="mw-100 text-truncate">
              {course.name}
            </Col>
            <Col xs={2} className="text-end">
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "course-icon pointer",
                }}
              >
                <span onClick={handleModifyShow}>
                  <BsPencilFill />
                </span>
              </IconContext.Provider>
            </Col>
          </Row>
        </Card.Header>
        <LinkContainer to={`/course/${id}`}>
          <Card.Body className="small text-uppercase pointer">
            <Stack className="small">
              <p className="text-primary metric-label">Goal</p>
              <ProgressBar
                animated
                className="mb-2 progress-slim"
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
              <Row className="mt-2 text-lowercase">
                {/* No. of hours remaining goal_status */}
                <Col className="text-start">
                  {calculateRemainingGoal(course.goal_status, course.goal)[0]}h{" "}
                  {calculateRemainingGoal(course.goal_status, course.goal)[1]}m
                  remaining
                </Col>
                <Col className="text-end">
                  {calculateDaysToDate(course.goal_reset_date)} days left
                </Col>
              </Row>
            </Stack>
          </Card.Body>
        </LinkContainer>
      </Card>

      {/* Update modal */}
      <Modal show={modifyShow} onHide={handleModifyClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit course</Modal.Title>
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
          <Button
            variant="primary"
            className="text-uppercase"
            onClick={handleEdit}
          >
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "course-icon",
              }}
            >
              <BsCheckLg />
            </IconContext.Provider>
          </Button>
          <Button
            variant="primary"
            className="text-uppercase"
            onClick={() => {
              handleModifyClose();
              handleDeleteShow();
            }}
          >
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "course-icon",
              }}
            >
              <BsTrashFill />
            </IconContext.Provider>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete modal */}
      <Modal show={deleteShow} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <span className="text-secondary">{course.name}</span>? This cannot
            be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="text-uppercase"
            onClick={handleDelete}
          >
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "course-icon",
              }}
            >
              <BsTrashFill />
            </IconContext.Provider>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Course;
