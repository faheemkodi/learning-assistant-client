import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserBursts, resetUser } from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";

const LearnerBurstsView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, bursts, token, userLoading } = useSelector(
    (state) => state.user
  );

  const superuser = user.superuser;

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
      dispatch(getUserBursts(id));
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
            <th>Duration</th>
            <th>Interrupted</th>
            <th>Interruption</th>
            <th>Course</th>
            <th>Lesson</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {bursts.map((burst) => (
            <tr key={burst.id}>
              <td>{burst.id}</td>
              <td>{burst.duration}</td>
              <td
                className={
                  burst.interrupted === true
                    ? "bg-danger text-light"
                    : "bg-success text-light"
                }
              >
                {burst.interrupted === true ? "T" : "F"}
              </td>
              <td>{burst.interruption === "" ? "None" : burst.interruption}</td>
              <td>{burst.course_id}</td>
              <td>{burst.lesson_id}</td>
              <td>{new Date(burst.creation_date).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AppContainer>
  );
};

export default LearnerBurstsView;
