import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserCourses, resetUser } from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";
import Kengram from "../components/Kengram";

const LearnerCoursesView = () => {
  let { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, courses, token, userLoading } = useSelector(
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
      dispatch(getUserCourses(id));
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
            <th>Cur. Velocity</th>
            <th>Req. Velocity</th>
            <th>Intensity</th>
            <th>Goal</th>
            <th>Goal Status</th>
            <th>Deadline</th>
            <th>Streak</th>
            <th>Strength</th>
            <th>Goal Reset Date</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {courses.map((course) => (
            <Fragment key={course.id}>
              <tr>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td className="pointer" onClick={handleKengramShow}>
                  {course.kengram !== null
                    ? course.kengram.substring(0, 10) + "..."
                    : null}
                </td>
                <td>{course.progress}</td>
                <td>{course.stability}</td>
                <td>{course.current_velocity}</td>
                <td>{course.required_velocity}</td>
                <td>{course.intensity}</td>
                <td>{course.goal}</td>
                <td>{course.goal_status}</td>
                <td>{new Date(course.deadline).toDateString()}</td>
                <td>{course.streak}</td>
                <td>{course.strength}</td>
                <td>{new Date(course.goal_reset_date).toDateString()}</td>
                <td>{new Date(course.creation_date).toDateString()}</td>
              </tr>
              <Kengram
                show={kengramShow}
                handleClose={handleKengramClose}
                header={course.name}
                body={course.kengram}
                sudo={true}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
    </AppContainer>
  );
};

export default LearnerCoursesView;
