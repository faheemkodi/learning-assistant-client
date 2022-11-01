import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { resetLesson } from "../features/lesson/lessonSlice";
import { resetCourse } from "../features/course/courseSlice";
import { resetTopic } from "../features/topic/topicSlice";
import { resetUser } from "../features/user/userSlice";
import { resetBurst } from "../features/burst/burstSlice";
import {
  BsArrowLeftSquareFill,
  BsPieChartFill,
  BsPatchQuestionFill,
  BsShieldFillMinus,
  BsGearFill,
} from "react-icons/bs";
import Nav from "./Nav";

const NavBar = () => {
  const path = window.location.pathname.split("/");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Row className="">
      <Stack direction="horizontal" className="justify-content-around">
        {path.length > 2 ? (
          <Row className="ms-1">
            <Col xs={3} className="text-start pointer">
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "nav-icon",
                }}
              >
                <span
                  onClick={() => {
                    dispatch(resetLesson());
                    dispatch(resetCourse());
                    dispatch(resetTopic());
                    dispatch(resetBurst());
                    dispatch(resetUser());
                    navigate(-1);
                  }}
                >
                  <BsArrowLeftSquareFill />
                </span>
              </IconContext.Provider>
            </Col>
            <Col xs={8} className="text-end">
              <p className="text-primary text-uppercase nav-label">Back</p>
            </Col>
          </Row>
        ) : null}
        <Nav
          icon={
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "nav-icon",
              }}
            >
              <BsPieChartFill />
            </IconContext.Provider>
          }
          label="Dashboard"
          link="/dashboard"
        />
        <Nav
          icon={
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "nav-icon",
              }}
            >
              <BsShieldFillMinus />
            </IconContext.Provider>
          }
          label="Interruptions"
          link="/interruptions"
        />
        <Nav
          icon={
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "nav-icon",
              }}
            >
              <BsPatchQuestionFill />
            </IconContext.Provider>
          }
          label="Guide"
          link="/guide"
        />
        <Nav
          icon={
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
                className: "nav-icon",
              }}
            >
              <BsGearFill />
            </IconContext.Provider>
          }
          label="Settings"
          link="/settings"
        />
      </Stack>
    </Row>
  );
};

export default NavBar;
