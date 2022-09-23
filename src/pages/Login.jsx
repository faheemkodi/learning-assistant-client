import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { login, resetUser } from "../features/user/userSlice";
import FormContainer from "../components/FormContainer";
import logo from "../assets/logo.svg";

const LoginView = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userLoading, loginError, loginSuccess, userMessage } =
    useSelector((state) => state.user);

  const allFields = () => {
    if (!username || !password) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (loginError) {
      toast.error(userMessage);
    }
    if (loginSuccess) {
      toast("You've succesfully logged in. Happy learning!");
    }
    if (token) {
      navigate("/dashboard");
    }
    dispatch(resetUser());
  }, [token, loginError, loginSuccess, userMessage, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFields()) {
      toast.error("Please enter your username and password.");
    } else {
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("password", password);
      dispatch(login(formData));
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
      <Row>
        <span className="text-center">
          <LinkContainer to="/">
            <img
              src={logo}
              alt="logo"
              height="100"
              width="100"
              className="pointer"
            />
          </LinkContainer>
        </span>
      </Row>
      <Form className="mt-4" onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            autoComplete="off"
          />
          <label htmlFor="username">Username</label>
        </Form.Floating>

        {/* Password */}
        <Form.Floating className="mb-3 text-primary small">
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </Form.Floating>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <Row className="mt-4">
        <Col className="text-secondary text-center">
          Don't have an account? <Link to="/register">Join now!</Link>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-secondary text-center">
          <Link to="/password-reset">Forgot your passsword?</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginView;
