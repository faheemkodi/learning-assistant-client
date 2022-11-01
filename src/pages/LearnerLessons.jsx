import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserLessons, resetUser } from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";
import Kengram from "../components/Kengram";

const LearnerLessonsView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, lessons, token, userLoading } = useSelector(
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
      dispatch(getUserLessons(id));
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
            <th>Progress</th>
            <th>Stability</th>
            <th>Course</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {lessons.map((lesson) => (
            <Fragment key={lesson.id}>
              <tr>
                <td>{lesson.id}</td>
                <td>{lesson.name}</td>
                <td className="pointer" onClick={handleKengramShow}>
                  {lesson.kengram !== null
                    ? lesson.kengram.substring(0, 10) + "..."
                    : null}
                </td>
                <td>{lesson.progress}</td>
                <td>{lesson.stability}</td>
                <td>{lesson.course_id}</td>
                <td>{new Date(lesson.creation_date).toDateString()}</td>
              </tr>
              <Kengram
                show={kengramShow}
                handleClose={handleKengramClose}
                header={lesson.name}
                body={lesson.kengram}
                sudo={true}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
    </AppContainer>
  );
};

export default LearnerLessonsView;
