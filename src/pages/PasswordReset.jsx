import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { IconContext } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import {
  getResetCode,
  resetPassword,
  resetUser,
} from "../features/user/userSlice";
import FormContainer from "../components/FormContainer";
import logo from "../assets/logo.svg";
import { LinkContainer } from "react-router-bootstrap";

const LoginView = () => {
  // Toast messages and frontend validation refactor
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    token,
    userLoading,
    getResetCodeError,
    getResetCodeSuccess,
    resetPasswordError,
    resetPasswordSuccess,
    userMessage,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData === "") {
      toast("Please enter your email address.");
    } else {
      dispatch(getResetCode({ email: [userData.trim()] }));
      handlePasswordShow();
    }
  };

  // Password change modal
  const [passwordData, setPasswordData] = useState({
    reset_code: "",
    new_password: "",
    confirm_new_password: "",
  });
  const { reset_code, new_password, confirm_new_password } = passwordData;
  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordShow = () => setPasswordShow(true);
  const handlePasswordClose = () => {
    setPasswordShow(false);
    setPasswordData({
      ...passwordData,
      email_address: "",
      reset_code: "",
      new_password: "",
      confirm_new_password: "",
    });
  };
  const handlePasswordSubmit = () => {
    if (
      reset_code !== "" &&
      new_password !== "" &&
      confirm_new_password !== ""
    ) {
      if (new_password === confirm_new_password) {
        dispatch(
          resetPassword({ email_address: userData, reset_code, new_password })
        );
        handlePasswordClose();
        setUserData("");
      } else {
        toast("Passwords do not match");
      }
    }
  };

  useEffect(() => {
    if (getResetCodeSuccess) {
      toast.success("Password reset code sent to your email");
    }
    if (getResetCodeError) {
      toast.error(userMessage);
    }
    if (resetPasswordError) {
      toast.error(userMessage);
    }
    if (resetPasswordSuccess) {
      toast.success(
        "Password reset successful. Please login with your new password."
      );
      navigate("/login");
    }
  }, [
    getResetCodeError,
    getResetCodeSuccess,
    resetPasswordError,
    resetPasswordSuccess,
    userMessage,
    navigate,
  ]);

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
    <>
      <FormContainer>
        <Row>
          <span className="text-center">
            <LinkContainer to="/login">
              <img
                src={logo}
                alt="logo"
                height="100"
                width="100"
                className="pointer"
              />
            </LinkContainer>
          </span>
          <h1 className="text-primary text-center mt-2">Reset your password</h1>
        </Row>
        <Form className="my-4">
          {/* Email */}
          <Form.Floating className="text-primary small mb-4">
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              value={userData}
              onChange={(e) => setUserData(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
            <Form.Text className="text-muted">
              We'll send a password reset code to your registered email address.
            </Form.Text>
          </Form.Floating>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleSubmit}>
              Generate Reset Code
            </Button>
          </div>
        </Form>
      </FormContainer>
      {/* Reset password modal */}
      <Modal
        show={passwordShow}
        onHide={handlePasswordClose}
        backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-primary">Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Reset code */}
            <Form.Floating className="mb-3 text-primary small">
              <Form.Control
                id="reset-code"
                type="text"
                placeholder="Reset Code"
                value={reset_code}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    reset_code: e.target.value,
                  })
                }
                autoComplete="off"
              />
              <label htmlFor="reset-code">Reset Code</label>
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
    </>
  );
};
export default LoginView;
