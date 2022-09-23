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
import { BsBookFill, BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  getLesson,
  resetLesson,
  updateLesson,
} from "../features/lesson/lessonSlice";
import {
  getTopics,
  createTopic,
  resetTopic,
} from "../features/topic/topicSlice";
import AppContainer from "../components/AppContainer";
import Kengram from "../components/Kengram";
import KengramEditor from "../components/KengramEditor";
import Topic from "../components/Topic";

const LessonView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTopicData({ ...topicData, name: "" });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const {
    lesson,
    lessonLoading,
    getLessonError,
    updateLessonError,
    updateLessonSuccess,
    lessonMessage,
  } = useSelector((state) => state.lesson);
  const {
    topics,
    topicLoading,
    getTopicsError,
    createTopicError,
    createTopicSuccess,
    updateTopicError,
    updateTopicSuccess,
    deleteTopicError,
    deleteTopicSuccess,
    topicMessage,
  } = useSelector((state) => state.topic);

  const [topicData, setTopicData] = useState({
    name: "",
    lesson_id: id,
  });

  const { name, lesson_id } = topicData;

  const [lessonData, setLessonData] = useState({
    kengram: lesson.kengram,
  });

  const { kengram } = lessonData;

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => {
    setKengramShow(false);
  };

  const [kengramEditShow, setKengramEditShow] = useState(false);
  const handleKengramEditShow = () => {
    setKengramEditShow(true);
    setLessonData({ ...lessonData, kengram: lesson.kengram });
  };
  const handleKengramEditClose = () => {
    setKengramEditShow(false);
    setKengramShow(false);
  };

  const handleKengramEditChange = (e) => {
    e.preventDefault();
    setLessonData({ ...lessonData, kengram: e.target.value });
  };

  const handleKengramEditSubmit = (e) => {
    e.preventDefault();
    if (kengram !== lesson.kengram) {
      dispatch(
        updateLesson({
          id: lesson_id,
          name: lesson.name,
          kengram: kengram,
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
      dispatch(getLesson(lesson_id));
      dispatch(getTopics(lesson_id));
    }
  }, [loggedIn, lesson_id, dispatch]);

  useEffect(() => {
    if (getLessonError) {
      toast.error(lessonMessage);
      dispatch(resetLesson());
      navigate(-1);
    }
    if (updateLessonError) {
      toast.error(lessonMessage);
    }
    if (updateLessonSuccess) {
      toast.info("Lesson kengram updated.");
    }
    if (getTopicsError) {
      toast.error(topicMessage);
    }
    if (createTopicError) {
      toast.error("Oops, something went wrong! Please try again.");
    }
    if (createTopicSuccess) {
      toast.success("Topic created. Happy learning!");
    }
    if (updateTopicError) {
      toast.error(topicMessage);
    }
    if (updateTopicSuccess) {
      toast.info("Topic updated.");
    }
    if (deleteTopicError) {
      toast.error(topicMessage);
    }
    if (deleteTopicSuccess) {
      toast.info("Topic deleted.");
    }
  }, [
    getLessonError,
    updateLessonError,
    updateLessonSuccess,
    lessonMessage,
    getTopicsError,
    createTopicError,
    createTopicSuccess,
    updateTopicError,
    updateTopicSuccess,
    deleteTopicError,
    deleteTopicSuccess,
    topicMessage,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetLesson());
      dispatch(resetTopic());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(
        createTopic({
          name: name.trim(),
          lesson_id,
          course_id: lesson.course_id,
        })
      );
      handleClose();
    } else {
      handleClose();
    }
  };

  if (lessonLoading || topicLoading) {
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
            {lesson["name"]}
          </Badge>
        </h1>
        <Card border="light" className="dash-card mx-auto mb-4 py-3">
          <Row className="">
            <p className="text-center text-uppercase text-primary fw-bold">
              Lesson Stats
            </p>
            <Stack className="small">
              <p className="text-primary text-uppercase metric-label">
                Progress
              </p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  lesson.progress > 50 && lesson.progress < 100
                    ? "primary"
                    : lesson.progress > 99
                    ? "success"
                    : lesson.progress < 25
                    ? "danger"
                    : "warning"
                }
                now={lesson.progress}
              />
              <p className="text-primary text-uppercase metric-label">
                Stability
              </p>
              <ProgressBar
                className="mb-2 progress-medium"
                variant={
                  lesson.stability > 50 && lesson.stability < 80
                    ? "primary"
                    : lesson.stability > 80
                    ? "success"
                    : lesson.stability < 25
                    ? "danger"
                    : "warning"
                }
                now={lesson.stability}
              />
            </Stack>
          </Row>
          {topics.length > 0 ? (
            <Row className="text-center mt-4">
              <span>
                <Button
                  className="text-uppercase fw-bold"
                  onClick={() => {
                    dispatch(resetTopic());
                    navigate(`/lesson/${id}/learn`);
                  }}
                >
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "bottom" },
                      className: "learn-icon",
                    }}
                  >
                    <BsBookFill />
                  </IconContext.Provider>
                </Button>
              </span>
              <p className="text-primary text-uppercase mt-2 small metric-label">
                Start learning now
              </p>
            </Row>
          ) : null}
        </Card>

        {topics.length === 0 ? (
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

        {/* Topic list */}
        <Row className="mx-auto">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <Col key={topic.id} xs={12} lg={6} className="mb-4">
                <Topic topic={topic} />
              </Col>
            ))
          ) : (
            <p className="text-muted text-center">
              Please add topics to start learning.
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
              Add Topic
            </Button>
          </Col>
        </Row>

        {/* Create topic modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Add a new topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Floating className="mb-3 text-primary small">
                <Form.Control
                  id="topic-name"
                  type="text"
                  placeholder="Topic Name"
                  value={name}
                  onChange={(e) =>
                    setTopicData({ ...topicData, name: e.target.value })
                  }
                  autoComplete="off"
                />
                <label htmlFor="topic-name">Topic Name</label>
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
          header={lesson.name}
          body={lesson.kengram}
        />

        <KengramEditor
          show={kengramEditShow}
          handleClose={handleKengramEditClose}
          handleChange={handleKengramEditChange}
          handleSubmit={handleKengramEditSubmit}
          header={lesson.name}
          body={kengram}
        />
      </Row>
    </AppContainer>
  );
};

export default LessonView;
