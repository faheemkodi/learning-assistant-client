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
import { updateLesson, deleteLesson } from "../features/lesson/lessonSlice";

const Lesson = ({ lesson }) => {
  const [lessonData, setLessonData] = useState({
    id: lesson.id,
    name: lesson.name,
    kengram: lesson.kengram,
  });

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  const [modifyShow, setModifyShow] = useState(false);
  const handleModifyShow = () => setModifyShow(true);
  const handleModifyClose = () => {
    setModifyShow(false);
    setLessonData({ ...lessonData, name: lesson.name });
  };

  const dispatch = useDispatch();
  const { lessonLoading } = useSelector((state) => state.lesson);

  const { id, name, kengram } = lessonData;

  const handleEdit = (e) => {
    e.preventDefault();
    if (name !== lesson.name) {
      dispatch(updateLesson({ id, name: name.trim(), kengram }));
      handleModifyClose();
    } else {
      handleModifyClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteLesson(id));
  };

  if (lessonLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <>
      <Card
        bg=""
        className="brand-shadow text-start mx-auto"
        border="light"
        text="primary"
      >
        <Card.Header className="bg-white small text-uppercase fw-bold">
          <Row>
            <Col xs={10} className="mw-100 text-truncate">
              {lesson.name}
            </Col>
            <Col xs={2} className="text-end">
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "pointer",
                }}
              >
                <span onClick={handleModifyShow}>
                  <BsPencilFill />
                </span>
              </IconContext.Provider>
            </Col>
          </Row>
        </Card.Header>
        <LinkContainer to={`/lesson/${id}`}>
          <Card.Body className="small pointer">
            <Stack className="small">
              <p className="metric-label text-uppercase">Progress</p>
              <ProgressBar
                animated
                className="mb-2 progress-slim"
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
              <p className="metric-label text-uppercase">Stability</p>
              <ProgressBar
                animated
                className="mb-2 progress-slim"
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
          </Card.Body>
        </LinkContainer>
      </Card>

      {/* Update modal */}
      <Modal show={modifyShow} onHide={handleModifyClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit lesson</Modal.Title>
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
          <Modal.Title className="text-danger">Delete lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <span className="text-secondary">{lesson.name}</span>? This cannot
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

export default Lesson;
