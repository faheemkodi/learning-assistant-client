import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { updateTopic, deleteTopic } from "../features/topic/topicSlice";
import Kengram from "./Kengram";
import KengramEditor from "./KengramEditor";

const Topic = ({ topic }) => {
  const [topicData, setTopicData] = useState({
    id: topic.id,
    name: topic.name,
    kengram: topic.kengram,
    completed: topic.completed,
    revised: topic.revised,
    revision_count: topic.revision_count,
    revision_date: topic.revision_date,
    stability: topic.stability,
  });

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  const [modifyShow, setModifyShow] = useState(false);
  const handleModifyShow = () => setModifyShow(true);
  const handleModifyClose = () => {
    setModifyShow(false);
    setTopicData({ ...topicData, name: topic.name });
  };

  const dispatch = useDispatch();
  const { topicLoading } = useSelector((state) => state.topic);

  const {
    id,
    name,
    kengram,
    completed,
    revised,
    revision_count,
    revision_date,
    stability,
  } = topicData;

  const handleEdit = (e) => {
    e.preventDefault();
    if (name !== topic.name) {
      dispatch(
        updateTopic({
          id,
          name,
          kengram,
          completed,
          revised,
          revision_count,
          revision_date,
          stability,
        })
      );
      handleModifyClose();
    } else {
      handleModifyClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTopic(id));
  };

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => setKengramShow(false);

  const [kengramEditShow, setKengramEditShow] = useState(false);
  const handleKengramEditShow = () => {
    setKengramEditShow(true);
    setTopicData({ ...topicData, kengram: topic.kengram });
  };
  const handleKengramEditClose = () => {
    setKengramEditShow(false);
  };

  const handleKengramEditChange = (e) => {
    e.preventDefault();
    setTopicData({ ...topicData, kengram: e.target.value });
  };

  const handleKengramEditSubmit = (e) => {
    e.preventDefault();
    if (kengram !== topic.kengram) {
      dispatch(
        updateTopic({
          id,
          name,
          kengram,
          completed,
          revised,
          revision_count,
          revision_date,
          stability,
        })
      );
      handleKengramEditClose();
    } else {
      handleKengramEditClose();
    }
  };

  if (topicLoading) {
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
        text={
          topic.completed && topic.revised
            ? "success"
            : topic.completed && !topic.revised
            ? "danger"
            : "primary"
        }
      >
        <Card.Header className="bg-white small text-uppercase fw-bold">
          <Row>
            <Col xs={10} className="mw-100 text-truncate">
              {topic.name}
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

        <Card.Body className="small pointer" onClick={handleKengramShow}>
          <Stack className="small">
            <p className="metric-label text-uppercase">Stability</p>
            <ProgressBar
              animated
              className="mb-2 progress-slim"
              variant={
                topic.stability > 50 && topic.stability < 80
                  ? "primary"
                  : topic.stability > 80
                  ? "success"
                  : topic.stability < 25
                  ? "danger"
                  : "warning"
              }
              now={topic.stability}
            />
          </Stack>
          {topic.revision_date ? (
            <Row className="mt-2 text-uppercase">
              <Col className="text-start">
                <span>Revision date</span>
              </Col>
              <Col className="text-end">
                <span>{new Date(topic.revision_date).toDateString()}</span>
              </Col>
            </Row>
          ) : (
            <Row className="mt-2 text-uppercase">
              <Col className="text-end text-muted">
                <span>To be completed</span>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Update modal */}
      <Modal show={modifyShow} onHide={handleModifyClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="topic-name"
                type="text"
                placeholder="Topci Name"
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
          <Modal.Title className="text-danger">Delete topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <span className="text-secondary">{topic.name}</span>? This cannot be
            undone.
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

      <Kengram
        show={kengramShow}
        handleClose={handleKengramClose}
        handleEdit={handleKengramEditShow}
        header={topic.name}
        body={topic.kengram}
        sudo={false}
      />

      <KengramEditor
        show={kengramEditShow}
        handleClose={handleKengramEditClose}
        handleChange={handleKengramEditChange}
        handleSubmit={handleKengramEditSubmit}
        header={topic.name}
        body={kengram}
      />
    </>
  );
};

export default Topic;
