import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { register, resetUser } from "../features/user/userSlice";
import { checkPasswordStrength } from "../utils/user";
import FormContainer from "../components/FormContainer";
import logo from "../assets/logo-full.svg";
import { LinkContainer } from "react-router-bootstrap";

const RegisterView = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
  });

  const { name, username, email, password, confirmPassword, inviteCode } =
    registerData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userLoading, registerError, registerSuccess, userMessage } =
    useSelector((state) => state.user);

  const allFields = () => {
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !inviteCode
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    if (registerError) {
      toast.error(userMessage);
    }
    if (registerSuccess) {
      toast("You've succesfully registered. Welcome to Kengram!");
    }
    dispatch(resetUser());
  }, [token, registerError, registerSuccess, userMessage, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFields()) {
      toast.error("Please ensure you've filled in all fields.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords don't match. Please try again.");
    } else if (!checkPasswordStrength(password)) {
      toast.error(
        "Password should be of at least 8 characters, with at least one letter and digit."
      );
    } else {
      dispatch(
        register({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
          invite_code: inviteCode.trim(),
        })
      );
    }
  };

  if (userLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <FormContainer>
      <Row className="mt-lg-4">
        <span className="text-center">
          <LinkContainer to="/">
            <img
              src={logo}
              alt="logo"
              height="80.5"
              width="250"
              className="pointer"
            />
          </LinkContainer>
        </span>
      </Row>

      <Form className="mt-4" onSubmit={handleSubmit}>
        {/* Invite Code */}
        <Form.Floating className="mb-3 text-primary fw-bold small">
          <Form.Control
            id="inviteCode"
            type="text"
            placeholder="Invite Code"
            value={inviteCode}
            onChange={(e) =>
              setRegisterData({ ...registerData, inviteCode: e.target.value })
            }
            autoComplete="off"
          />
          <label htmlFor="inviteCode">Invite Code</label>
        </Form.Floating>
        {/* Name */}
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            autoComplete="off"
          />
          <label htmlFor="name">Full Name</label>
        </Form.Floating>

        {/* Username */}
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
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
              setRegisterData({ ...registerData, email: e.target.value })
            }
            autoComplete="off"
          />
          <label htmlFor="email">Email</label>
        </Form.Floating>

        {/* Password and confirmation*/}
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </Form.Floating>
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                confirmPassword: e.target.value,
              })
            }
          />
          <label htmlFor="confirm-password">Confirm Password</label>
        </Form.Floating>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
      <Row className="mt-4">
        <Col className="text-secondary text-center">
          <Link to="/">Need an invite code?</Link>
        </Col>
      </Row>
      <Row className="mt-4 mb-lg-4">
        <Col className="text-secondary text-center">
          Already a member? <Link to="/login">Login.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterView;
