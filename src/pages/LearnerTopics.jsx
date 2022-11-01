import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserTopics, resetUser } from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";
import Kengram from "../components/Kengram";

const LearnerTopicsView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, topics, token, userLoading } = useSelector(
    (state) => state.user
  );

  const superuser = user.superuser;

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => setKengramShow(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (superuser === false) {
      navigate("/dashboard");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate, superuser]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
      dispatch(getUserTopics(id));
    }
  }, [loggedIn, dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  if (userLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <AppContainer>
      <Table bordered hover size="sm" className="small text-center" responsive>
        <thead className="text-light bg-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Kengram</th>
            <th>Completed</th>
            <th>Revised</th>
            <th>Revision Count</th>
            <th>Revision Date</th>
            <th>Stability</th>
            <th>Creation Date</th>
            <th>Lesson</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {topics.map((topic) => (
            <Fragment key={topic.id}>
              <tr>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td className="pointer" onClick={handleKengramShow}>
                  {topic.kengram !== null
                    ? topic.kengram.substring(0, 10) + "..."
                    : null}
                </td>
                <td
                  className={
                    topic.completed === true
                      ? "bg-success text-light"
                      : "bg-danger text-light"
                  }
                >
                  {topic.completed === true ? "T" : "F"}
                </td>
                <td
                  className={
                    topic.revised === true
                      ? "bg-success text-light"
                      : "bg-danger text-light"
                  }
                >
                  {topic.revised === true ? "T" : "F"}
                </td>
                <td>{topic.revision_count}</td>
                <td>
                  {topic.revision_date !== null
                    ? new Date(topic.revision_date).toDateString()
                    : null}
                </td>
                <td>{topic.stability}</td>
                <td>{new Date(topic.creation_date).toDateString()}</td>
                <td>{topic.lesson_id}</td>
                <td>{topic.course_id}</td>
              </tr>
              <Kengram
                show={kengramShow}
                handleClose={handleKengramClose}
                header={topic.name}
                body={topic.kengram}
                sudo={true}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
    </AppContainer>
  );
};

export default LearnerTopicsView;
