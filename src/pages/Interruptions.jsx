import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import { getInterruptions, resetBurst } from "../features/burst/burstSlice";
import AppContainer from "../components/AppContainer";
import CustomPieChart from "../components/CustomPieChart";
import { toast } from "react-toastify";

const InterruptionsView = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const { interruptions, burstLoading, getInterruptionsError } = useSelector(
    (state) => state.burst
  );

  useEffect(() => {
    if (loggedIn) {
      dispatch(getInterruptions());
    }
  }, [loggedIn, dispatch]);

  useEffect(() => {
    if (getInterruptionsError) {
      toast.error("Oops, something went wrong! Please try reloading the page.");
    }
  }, [getInterruptionsError]);

  useEffect(() => {
    return () => {
      dispatch(resetBurst());
    };
  }, [dispatch]);

  if (burstLoading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <AppContainer>
      <h1 className="text-center text-uppercase">
        <Badge>Interruptions</Badge>
      </h1>
      <CustomPieChart data={interruptions} />
    </AppContainer>
  );
};

export default InterruptionsView;
