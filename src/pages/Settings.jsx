import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import {
  BsBugFill,
  BsCheckLg,
  BsDownload,
  BsEyeFill,
  BsKeyFill,
  BsPersonFill,
  BsPlugFill,
  BsThreeDotsVertical,
  BsWhatsapp,
} from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { GoDesktopDownload } from "react-icons/go";
import {
  getUser,
  updateUser,
  updatePassword,
  logout,
  resetUser,
} from "../features/user/userSlice";
import AppContainer from "../components/AppContainer";

const SettingsView = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    token,
    user,
    userLoading,
    getUserError,
    updateUserError,
    updateUserSuccess,
    updatePasswordError,
    updatePasswordSuccess,
    userMessage,
  } = useSelector((state) => state.user);

  // Edit user modal
  const [userData, setUserData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
  });
  const { name, username, email } = userData;
  const [userShow, setUserShow] = useState(false);
  const handleUserShow = () => {
    setUserShow(true);
    setUserData({
      ...userData,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  };
  const handleUserClose = () => {
    setUserShow(false);
    setUserData({
      ...userData,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  };
  const handleUserSubmit = () => {
    if (
      name !== user.name ||
      username !== user.username ||
      email !== user.email
    ) {
      dispatch(
        updateUser({
          id: user.id,
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
        })
      );
      handleUserClose();
    } else {
      handleUserClose();
    }
  };

  // Password change modal
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const { current_password, new_password, confirm_new_password } = passwordData;
  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordShow = () => setPasswordShow(true);
  const handlePasswordClose = () => {
    setPasswordShow(false);
    setPasswordData({
      ...passwordData,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    });
  };
  const handlePasswordSubmit = () => {
    if (
      current_password !== "" &&
      new_password !== "" &&
      confirm_new_password !== ""
    ) {
      if (new_password === confirm_new_password) {
        dispatch(updatePassword({ current_password, new_password }));
        handlePasswordClose();
      } else {
        toast("Passwords do not match");
      }
    } else {
      handlePasswordClose();
    }
  };

  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const handleSubscriptionShow = () => setSubscriptionShow(true);
  const handleSubscriptionClose = () => setSubscriptionShow(false);

  const [installShow, setInstallShow] = useState(false);
  const handleInstallShow = () => setInstallShow(true);
  const handleInstallClose = () => setInstallShow(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
    }
  }, [loggedIn, dispatch]);

  useEffect(() => {
    if (getUserError) {
      toast(userMessage);
    }
    if (updateUserError) {
      toast.error(userMessage);
    } else if (updateUserSuccess) {
      toast.info("User details updated.");
    }
    if (updatePasswordError) {
      toast.error(userMessage);
    } else if (updatePasswordSuccess) {
      toast.info("Password changed.");
    }
  }, [
    getUserError,
    updateUserError,
    updateUserSuccess,
    updatePasswordError,
    updatePasswordSuccess,
    userMessage,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
  };

  if (userLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <AppContainer>
      <h1 className="text-center text-uppercase mb-5">
        <Badge>Settings</Badge>
      </h1>
      <Row
        xs={1}
        md={3}
        className="mx-auto text-primary justify-content-center text-center"
      >
        <Col>
          {/* Install PWA */}
          <Row className="fs-4 mb-4 mb-3">
            <Col xs={10} className="text-start">
              Install the app
            </Col>
            <Col xs={2} className="text-end">
              <Badge className="pointer">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "course-icon",
                  }}
                >
                  <BsDownload onClick={handleInstallShow} />
                </IconContext.Provider>
              </Badge>
            </Col>
          </Row>

          {/* Edit user details */}
          <Row className="fs-4 mb-4 mb-3">
            <Col xs={10} className="text-start">
              Edit user details
            </Col>
            <Col xs={2} className="text-end">
              <Badge className="pointer" onClick={handleUserShow}>
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "course-icon",
                  }}
                >
                  <BsPersonFill />
                </IconContext.Provider>
              </Badge>
            </Col>
          </Row>
          {/* Change password */}
          <Row className="fs-4 mb-4">
            <Col xs={10} className="text-start">
              Change password
            </Col>
            <Col xs={2} className="text-end">
              <Badge className="pointer" onClick={handlePasswordShow}>
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "course-icon",
                  }}
                >
                  <BsKeyFill />
                </IconContext.Provider>
              </Badge>
            </Col>
          </Row>

          {/* Subscription details */}
          <Row className="fs-4 mb-4">
            <Col xs={10} className="text-start">
              Subscription details
            </Col>
            <Col xs={2} className="text-end">
              <Badge className="pointer" onClick={handleSubscriptionShow}>
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "course-icon",
                  }}
                >
                  <BsEyeFill />
                </IconContext.Provider>
              </Badge>
            </Col>
          </Row>
          {/* Book mentoring */}
          <Row className="fs-4 mb-4">
            <Col xs={10} className="text-start">
              Book mentoring
            </Col>
            <Col xs={2} className="text-end">
              <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20schedule%20a%20mentoring%20session,%20please!">
                <Badge className="pointer">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "course-icon",
                    }}
                  >
                    <BsWhatsapp />
                  </IconContext.Provider>
                </Badge>
              </a>
            </Col>
          </Row>
          {/* Report bug */}
          <Row className="fs-4 mb-4">
            <Col xs={10} className="text-start">
              Report a bug
            </Col>
            <Col xs={2} className="text-end">
              <a href="https://wa.me/919895893111?text=Hey,%20I'm%20facing%20issues%20with%20the%20Learning%20Assistant!">
                <Badge className="pointer">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "course-icon",
                    }}
                  >
                    <BsBugFill />
                  </IconContext.Provider>
                </Badge>
              </a>
            </Col>
          </Row>
          {/* Logout */}
          <Row className="fs-4 mb-4">
            <Col xs={10} className="text-start">
              Logout
            </Col>
            <Col xs={2} className="text-end">
              <Badge className="pointer" onClick={handleLogout}>
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "course-icon",
                  }}
                >
                  <BsPlugFill />
                </IconContext.Provider>
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modals */}
      {/* Edit user details modal */}
      <Modal show={userShow} onHide={handleUserClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit user details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Full name */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="full-name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                autoComplete="off"
              />
              <label htmlFor="full-name">Full Name</label>
            </Form.Floating>
            {/* Username */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                autoComplete="off"
              />
              <label htmlFor="username">Username</label>
            </Form.Floating>
            {/* Email */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                autoComplete="off"
              />
              <label htmlFor="email">Email</label>
            </Form.Floating>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUserSubmit}>
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
      {/* Change password modal */}
      <Modal show={passwordShow} onHide={handlePasswordClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Current password */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="current-password"
                type="password"
                placeholder="Current Password"
                value={current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
                autoComplete="off"
              />
              <label htmlFor="current-password">Current Password</label>
            </Form.Floating>
            {/* New password */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="new-password"
                type="password"
                placeholder="New Password"
                value={new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value,
                  })
                }
                autoComplete="off"
              />
              <label htmlFor="new-password">New Password</label>
            </Form.Floating>
            {/* Confirm new password */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="confirm-new-password"
                type="password"
                placeholder="Confirm New Password"
                value={confirm_new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm_new_password: e.target.value,
                  })
                }
                autoComplete="off"
              />
              <label htmlFor="confirm-new-password">Confirm New Password</label>
            </Form.Floating>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordSubmit}>
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
      {/* Subscription Status Modal */}
      <Modal show={subscriptionShow} onHide={handleSubscriptionClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Subscription details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h3 className="">
            <Badge bg="success">Insiders Lifetime Access</Badge>
          </h3>
          <p className="text-success">
            Valid till 01-07-2025<span className="small">*</span>
          </p>
          <p className="text-muted small">
            Kengram Learning Assistant v0.1-beta
          </p>
          <p className="text-muted small">
            <span className="small">*</span>Validity will be renewed during
            every version upgrade
          </p>
        </Modal.Body>
      </Modal>
      {/* Install guidance Modal */}
      <Modal show={installShow} onHide={handleInstallClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Install the app</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-primary">Android</h5>
          <p>
            To install on Android phones and tablets, open the app in{" "}
            <span className="fw-bold">Chrome</span>, click the 3-dot overflow
            button{" "}
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "text-primary",
              }}
            >
              <BsThreeDotsVertical />
            </IconContext.Provider>{" "}
            at the top-right corner of the browser's address bar, and click{" "}
            <span className="text-primary">Add to home screen</span>.
          </p>
          <h5 className="text-primary">iOS</h5>
          <p>
            To install on iOS devices, open the app in{" "}
            <span className="fw-bold">Safari</span>, click the{" "}
            <span className="fw-bold">Share</span> button{" "}
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "text-primary",
              }}
            >
              <FiShare />
            </IconContext.Provider>{" "}
            from the bottom navigation bar, and click{" "}
            <span className="text-primary">Add to home screen</span>.
          </p>
          <h5 className="text-primary">Laptops & Desktops</h5>
          <p>
            To install on Windows, macOS or Linux, open the app in any browser,
            click the 3-dot overflow button{" "}
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "text-primary",
              }}
            >
              <BsThreeDotsVertical />
            </IconContext.Provider>{" "}
            at the top-right corner of the browser's address bar, and click{" "}
            <span className="text-primary">Install</span>{" "}
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "text-primary",
              }}
            >
              <GoDesktopDownload />
            </IconContext.Provider>{" "}
            , or alternatively, you may find the same button near the address
            bar.
          </p>
        </Modal.Body>
      </Modal>
    </AppContainer>
  );
};

export default SettingsView;
