import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { resetLesson } from "../features/lesson/lessonSlice";
import { resetCourse } from "../features/course/courseSlice";
import { resetTopic } from "../features/topic/topicSlice";
import { resetUser } from "../features/user/userSlice";
import { resetBurst } from "../features/burst/burstSlice";

const Nav = ({ icon, label, link }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.pathname;
  useEffect(() => {
    if (path === link) {
      setActive(true);
    }
  }, [path, link]);
  return (
    <Row className="ms-1">
      <Col
        xs={3}
        className="text-start pointer"
        onClick={() => {
          dispatch(resetLesson());
          dispatch(resetCourse());
          dispatch(resetTopic());
          dispatch(resetBurst());
          dispatch(resetUser());
          navigate(`${link}`);
        }}
      >
        {icon}
      </Col>

      {active ? (
        <Col xs={9} className="text-end">
          <p className="text-primary text-uppercase nav-label">{label}</p>
        </Col>
      ) : (
        <Col xs={9}>
          <p></p>
        </Col>
      )}
    </Row>
  );
};

export default Nav;
