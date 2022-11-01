import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { IconContext } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import {
  getUser,
  getAllUsers,
  updateSudo,
  renew,
  resetUser,
  deleteUser,
  sudoInvite,
} from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";
import Kengram from "../components/Kengram";

const SuperuserView = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, users, token, userLoading } = useSelector(
    (state) => state.user
  );

  const superuser = user.superuser;

  const [kengramShow, setKengramShow] = useState(false);
  const handleKengramShow = () => setKengramShow(true);
  const handleKengramClose = () => setKengramShow(false);

  const [inviteData, setInviteData] = useState({
    phone: "",
    email: "",
  });

  const { phone, email } = inviteData;

  const [inviteShow, setInviteShow] = useState(false);
  const handleInviteShow = () => setInviteShow(true);
  const handleInviteClose = () => setInviteShow(false);

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
      dispatch(getAllUsers());
    }
  }, [loggedIn, dispatch]);

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
      <Button className="mb-3" onClick={handleInviteShow}>
        Send Invite
      </Button>
      <Table bordered hover size="sm" className="small text-center" responsive>
        <thead className="text-light bg-primary">
          <tr>
            <th>ID</th>
            <th>SU</th>
            <th>Active</th>
            <th>Name</th>
            <th>Kengram</th>
            <th>Level</th>
            <th>Goal Status</th>
            <th>Strength</th>
            <th>Progress</th>
            <th>Username</th>
            <th>Email</th>
            <th>Courses</th>
            <th>Lessons</th>
            <th>Topics</th>
            <th>Bursts</th>
            <th>Reset Code</th>
            <th>Expiry Date</th>
            <th>Creation Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {users.map((learner) => (
            <Fragment key={learner.id}>
              <tr>
                <td>{learner.id}</td>
                <td
                  className={learner.superuser === true ? "bg-success" : null}
                >
                  {learner.superuser === true ? (
                    <Form.Check type="switch" disabled />
                  ) : (
                    <Form.Check
                      type="switch"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to create this superuser?"
                          )
                        ) {
                          dispatch(updateSudo({ id: learner.id }));
                        }
                      }}
                    />
                  )}
                </td>
                <td
                  className={
                    learner.active === true
                      ? "bg-success text-uppercase"
                      : "bg-danger text-uppercase"
                  }
                >
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to renew this user's membership for 1 year?"
                        )
                      ) {
                        dispatch(renew({ id: learner.id }));
                      }
                    }}
                  >
                    Renew
                  </Button>
                </td>
                <td>{learner.name}</td>
                <td className="pointer" onClick={handleKengramShow}>
                  {learner.kengram !== null
                    ? learner.kengram.substring(0, 10) + "..."
                    : null}
                </td>
                <td>{learner.level}</td>
                <td>{learner.goal_status}</td>
                <td>{learner.strength}</td>
                <td>{learner.progress}</td>
                <td>{learner.username}</td>
                <td>{learner.email}</td>
                <td>
                  <Link to={`/superuser/courses/${learner.id}`}>View</Link>
                </td>
                <td>
                  <Link to={`/superuser/lessons/${learner.id}`}>View</Link>
                </td>
                <td>
                  <Link to={`/superuser/topics/${learner.id}`}>View</Link>
                </td>
                <td>
                  <Link to={`/superuser/bursts/${learner.id}`}>View</Link>
                </td>
                <td>{learner.reset_code}</td>
                <td>{new Date(learner.expiry_date).toDateString()}</td>
                <td>{new Date(learner.creation_date).toDateString()}</td>
                <td>
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this user?"
                        )
                      ) {
                        dispatch(deleteUser({ id: learner.id }));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              <Kengram
                show={kengramShow}
                handleClose={handleKengramClose}
                header={learner.name}
                body={learner.kengram}
                sudo={true}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>

      {/* Invite modal */}
      <Modal show={inviteShow} onHide={handleInviteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Send invite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="phone"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setInviteData({ ...inviteData, phone: e.target.value })
                }
                autoComplete="off"
              />
              <label htmlFor="phone">Phone</label>
            </Form.Floating>
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setInviteData({ ...inviteData, email: e.target.value })
                }
                autoComplete="off"
              />
              <label htmlFor="email">Email</label>
            </Form.Floating>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-uppercase"
            onClick={() => {
              dispatch(sudoInvite({ phone, email }));
              handleInviteClose();
            }}
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
        </Modal.Footer>
      </Modal>
    </AppContainer>
  );
};

export default SuperuserView;
