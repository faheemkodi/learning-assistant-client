import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { IconContext } from "react-icons";
import {
  BsCheckLg,
  BsCheckSquareFill,
  BsCircleFill,
  BsEmojiSmileFill,
  BsForwardFill,
  BsHeadphones,
  BsPlayCircleFill,
  BsSoundwave,
  BsStopCircleFill,
  BsToggleOn,
  BsVolumeMuteFill,
  BsVolumeUpFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { getTopics, resetTopic } from "../features/topic/topicSlice";
import { getLesson, resetLesson } from "../features/lesson/lessonSlice";
import { getCourse, resetCourse } from "../features/course/courseSlice";
import { createBurst, resetBurst } from "../features/burst/burstSlice";
import TopicController from "../components/TopicController";

const LearnView = () => {
  let { id } = useParams();

  const [audio] = useState(new Audio("/40Hz.mp3"));
  audio.loop = true;
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, playing]);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const {
    topics,
    topicLoading,
    getTopicsError,
    updateTopicError,
    updateTopicSuccess,
    topicMessage,
  } = useSelector((state) => state.topic);
  const { lesson, lessonLoading, getLessonError, lessonMessage } = useSelector(
    (state) => state.lesson
  );
  const { course, courseLoading, getCourseError, courseMessage } = useSelector(
    (state) => state.course
  );
  const { createBurstError } = useSelector((state) => state.burst);

  const [burstData, setBurstData] = useState({
    lesson_id: id,
    duration: 0,
    interrupted: false,
    interruption: "",
  });
  const { lesson_id, duration, interrupted, interruption } = burstData;

  // Timer
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [active]);

  const handleStart = () => {
    if (topics.length > 0) {
      setActive(true);
      setPlaying(true);
    } else {
      navigate("/dashboard");
    }
  };

  const handleStop = () => {
    setPlaying(false);
    setActive(false);
    setBurstData({ ...burstData, duration: Math.floor(time / 60000) });
    setTime(0);
    handleFirstShow();
  };

  // First modal
  const [wasInterrupted, setWasInterrupted] = useState(false);

  const handleInterrupted = () => {
    setWasInterrupted(!wasInterrupted);
    setBurstData({ ...burstData, interrupted: !wasInterrupted });
  };

  const [firstShow, setFirstShow] = useState(false);
  const handleFirstShow = () => setFirstShow(true);
  const handleFirstClose = () => {
    setFirstShow(false);
    setWasInterrupted(false);
    setBurstData({ ...burstData, interrupted: false, interruption: "" });
    handleSecondShow();
  };

  // Second modal
  const [secondShow, setSecondShow] = useState(false);
  const handleSecondShow = () => {
    setSecondShow(true);
  };
  const handleSecondClose = () => {
    setSecondShow(false);
    handleThirdShow();
  };

  // Third modal
  const [thirdShow, setThirdShow] = useState(false);
  const handleThirdShow = () => {
    setThirdShow(true);
  };
  const handleThirdClose = () => {
    setThirdShow(false);
    dispatch(resetTopic());
    navigate(-1);
  };

  useEffect(() => {
    if (loggedIn) {
      dispatch(getLesson(id));
    }
  }, [id, loggedIn, dispatch, navigate]);

  useEffect(() => {
    if (lesson.course_id) {
      dispatch(getCourse(lesson.course_id));
    }
  }, [lesson.course_id, dispatch]);

  useEffect(() => {
    dispatch(getTopics(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (getCourseError) {
      toast.error(courseMessage);
      dispatch(resetCourse());
      navigate(-1);
    }
    if (getLessonError) {
      toast.error(lessonMessage);
      dispatch(resetLesson());
      navigate(-1);
    }
    if (getTopicsError) {
      toast.error("Oops, something went wrong! Please try reloading the page.");
    }
    if (updateTopicError) {
      toast.error(topicMessage);
    }
    if (updateTopicSuccess) {
      toast.success("Topic updated.");
    }
    if (createBurstError) {
      toast.error("Oops, something went wrong! Please try again.");
    }
  }, [
    getCourseError,
    getLessonError,
    getTopicsError,
    updateTopicError,
    updateTopicSuccess,
    createBurstError,
    courseMessage,
    lessonMessage,
    topicMessage,
    navigate,
    dispatch,
  ]);

  const handleBurstSubmit = (e) => {
    e.preventDefault();
    if (duration < 1) {
      navigate(-1);
    } else if (wasInterrupted && interruption === "") {
      toast(
        "Please select an interruption, or toggle the button if you were not interrupted."
      );
    } else {
      dispatch(
        createBurst({
          course_id: lesson.course_id,
          lesson_id,
          duration,
          interrupted,
          interruption,
        })
      );
      handleFirstClose();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetLesson());
      dispatch(resetCourse());
      dispatch(resetTopic());
      dispatch(resetBurst());
    };
  }, [dispatch]);

  if (topicLoading || lessonLoading || courseLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <Container fluid>
      <Row className="viewport-height align-items-center justify-content-center">
        <Col lg={6} className="">
          {active ? (
            <Row>
              <Col xs={2}>
                <h4>
                  {playing ? (
                    <Badge
                      bg="success pointer"
                      onClick={() => {
                        setPlaying(false);
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          style: { verticalAlign: "middle" },
                          className: "course-icon",
                        }}
                      >
                        <BsVolumeUpFill />
                      </IconContext.Provider>
                    </Badge>
                  ) : (
                    <Badge
                      bg="danger pointer"
                      onClick={() => {
                        setPlaying(true);
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          style: { verticalAlign: "middle" },
                        }}
                      >
                        <BsVolumeMuteFill />
                      </IconContext.Provider>
                    </Badge>
                  )}
                </h4>
              </Col>
              <Col xs={10} className="text-end">
                <h4>
                  {playing ? (
                    <Badge bg="success">
                      <IconContext.Provider
                        value={{
                          style: { verticalAlign: "top" },
                        }}
                      >
                        <BsSoundwave /> 40Hz Binaural Beat
                      </IconContext.Provider>
                    </Badge>
                  ) : null}
                </h4>
              </Col>
            </Row>
          ) : null}
          <Card border="light" className="brand-shadow">
            <Card.Header
              className={
                active
                  ? "bg-success text-center fs-5"
                  : "bg-primary text-center fs-5"
              }
            >
              <div className="text-light text-uppercase mw-100 text-truncate">
                {course.name}
              </div>
              <div className="text-light fw-bold mw-100 text-truncate">
                {lesson.name}
              </div>
            </Card.Header>
            <Card.Body className="mx-auto py-5">
              <span
                className={
                  active
                    ? "timer-font fw-bold text-success w-100 timer number px-3 brand-shadow"
                    : "timer-font fw-bold text-primary w-100 timer number px-3 brand-shadow"
                }
              >
                {time >= 6000000
                  ? ("0" + Math.floor(time / 60000)).slice(-3)
                  : ("0" + Math.floor(time / 60000)).slice(-2)}
              </span>
              <span
                className={
                  active ? "timer-font text-success" : "timer-font text-primary"
                }
              >
                {" "}
                :{" "}
              </span>
              <span
                className={
                  active
                    ? "timer-font fw-bold text-success w-100 timer number px-3 brand-shadow"
                    : "timer-font fw-bold text-primary w-100 timer number px-3 brand-shadow"
                }
              >
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </span>
            </Card.Body>
            <Card.Footer
              className={
                active
                  ? "text-center bg-success py-3"
                  : "text-center bg-primary py-3"
              }
            >
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "timer-icon pointer",
                }}
              >
                {active ? (
                  <span onClick={handleStop}>
                    <BsStopCircleFill />
                  </span>
                ) : (
                  <span onClick={handleStart}>
                    <BsPlayCircleFill />
                  </span>
                )}
              </IconContext.Provider>
            </Card.Footer>
          </Card>
          {playing ? (
            <Row className="mt-4 text-center">
              <h5>
                <Badge bg="success">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "top" },
                    }}
                  >
                    <BsHeadphones /> Use headphones at low volume
                  </IconContext.Provider>
                </Badge>
              </h5>
            </Row>
          ) : null}
        </Col>
      </Row>

      {/* First modal -- record burst */}
      <Modal
        show={firstShow}
        onHide={handleFirstClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className={wasInterrupted ? "bg-danger" : "bg-success"}>
          <Modal.Title className="text-light">
            {wasInterrupted ? "Session interrupted" : "Session completed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h5>Was the session interrupted?</h5>
            <Form.Check
              className={wasInterrupted ? "text-primary" : "text-muted"}
              type="switch"
              onChange={handleInterrupted}
              label={
                wasInterrupted
                  ? "Session was interrupted."
                  : "Toggle the switch if session was interrupted. Or else, please continue."
              }
            />
            {wasInterrupted ? (
              <>
                <hr />
                <h5>Select interruption category</h5>
                <Form.Group className="text-primary">
                  <Form.Check
                    name="distraction"
                    onChange={(e) =>
                      setBurstData({
                        ...burstData,
                        interruption: e.target.value,
                      })
                    }
                    value="Self"
                    type="radio"
                    label="Self"
                    id="distraction-1"
                  />
                  <Form.Check
                    name="distraction"
                    onChange={(e) =>
                      setBurstData({
                        ...burstData,
                        interruption: e.target.value,
                      })
                    }
                    value="People"
                    type="radio"
                    label="People"
                    id="distraction-2"
                  />
                  <Form.Check
                    name="distraction"
                    onChange={(e) =>
                      setBurstData({
                        ...burstData,
                        interruption: e.target.value,
                      })
                    }
                    value="Digital"
                    type="radio"
                    label="Digital"
                    id="distraction-3"
                  />
                </Form.Group>
              </>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={wasInterrupted ? "danger" : "success"}
            onClick={handleBurstSubmit}
          >
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "course-icon",
              }}
            >
              <BsForwardFill />
            </IconContext.Provider>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Second modal -- mark topics completer/revised */}
      <Modal
        show={secondShow}
        onHide={handleSecondClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-primary">
          <Modal.Title className="text-light">Session outcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {topics.length > 0 ? (
            <>
              <p className="text-muted">
                Select topics and mark them as completed or revised.
              </p>
              <div className="small">
                <p className="small text-muted lh-1">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "text-muted",
                    }}
                  >
                    <BsCircleFill /> To be completed
                  </IconContext.Provider>
                </p>
                <p className="small text-danger lh-1">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "text-danger",
                    }}
                  >
                    <BsCircleFill /> To be revised
                  </IconContext.Provider>
                </p>
                <p className="small text-success lh-1">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "text-success",
                    }}
                  >
                    <BsCircleFill /> No action needed
                  </IconContext.Provider>
                </p>
                <p className="small text-primary lh-sm">
                  Toggle{" "}
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "top" },
                      className: "text-primary fs-6",
                    }}
                  >
                    <BsToggleOn />
                  </IconContext.Provider>{" "}
                  to select topic and press{" "}
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "text-primary",
                    }}
                  >
                    <BsCheckSquareFill />
                  </IconContext.Provider>{" "}
                  to confirm completion or revision
                </p>
              </div>

              <hr />
            </>
          ) : null}
          {topics.length > 0 ? (
            topics.map((topic) => (
              <Row key={topic.id}>
                <TopicController topic={topic} />
              </Row>
            ))
          ) : (
            <p className="text-muted text-center">
              Please add topics to start learning.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSecondClose}>
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "course-icon",
              }}
            >
              <BsForwardFill />
            </IconContext.Provider>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Third modal -- handle finish */}
      <Modal
        show={thirdShow}
        onHide={handleThirdClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-success">
          <Modal.Title className="text-light">Great work!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">
            You are one step closer to mastering{" "}
            <span className="text-success">{lesson.name}</span> and{" "}
            <span className="text-success">{course.name}</span>.
          </p>
          <p className="lead">
            Time for a short break. You earned it!{" "}
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "text-success fs-3",
              }}
            >
              <BsEmojiSmileFill />
            </IconContext.Provider>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleThirdClose}>
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
    </Container>
  );
};

export default LearnView;
