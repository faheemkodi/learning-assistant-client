import { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateTopic } from "../features/topic/topicSlice";
import Kengram from "./Kengram";
import KengramEditor from "./KengramEditor";

const TopicController = ({ topic }) => {
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

  const dispatch = useDispatch();

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

  const handleComplete = () => {
    setTopicData({
      ...topicData,
      completed: !completed,
      revised: !revised,
    });
    handleKengramShow();
  };

  const handleRevise = () => {
    setTopicData({
      ...topicData,
      revised: !revised,
    });
    handleKengramShow();
  };

  const handleCompleteSubmit = () => {
    dispatch(
      updateTopic({
        id,
        name,
        kengram,
        completed: true,
        revised: true,
        revision_count,
        revision_date,
        stability,
      })
    );
    handleKengramEditClose();
  };

  const handleReviseSubmit = () => {
    dispatch(
      updateTopic({
        id,
        name,
        kengram,
        completed,
        revised: true,
        revision_count: topic.revision_count + 1,
        revision_date,
        stability,
      })
    );
    handleKengramEditClose();
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

  return (
    <>
      <Form>
        <Row className="mb-2">
          <Col xs={12}>
            {topic.completed && topic.revised ? (
              <Form.Group className="text-success" key={topic.id}>
                <Form.Check
                  type="switch"
                  disabled
                  readOnly
                  label={topic.name}
                />
              </Form.Group>
            ) : !topic.completed ? (
              <Form.Group
                className={completed ? "text-primary lead" : "text-muted"}
                key={topic.id}
              >
                <Form.Check
                  type="switch"
                  onChange={handleComplete}
                  label={topic.name}
                />
              </Form.Group>
            ) : !topic.revised ? (
              <Form.Group
                className={revised ? "text-primary lead" : "text-danger"}
                key={topic.id}
              >
                <Form.Check
                  type="switch"
                  onChange={handleRevise}
                  label={topic.name}
                />
              </Form.Group>
            ) : null}
          </Col>
        </Row>
      </Form>

      <Kengram
        show={kengramShow}
        handleClose={handleKengramClose}
        handleEdit={handleKengramEditShow}
        header={topic.name}
        body={topic.kengram}
      />

      <KengramEditor
        show={kengramEditShow}
        handleClose={handleKengramEditClose}
        handleChange={handleKengramEditChange}
        handleSubmit={
          !topic.completed ? handleCompleteSubmit : handleReviseSubmit
        }
        header={topic.name}
        body={kengram}
      />
    </>
  );
};

export default TopicController;
