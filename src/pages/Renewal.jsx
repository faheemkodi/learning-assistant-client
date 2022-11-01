import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { getCurrency } from "../utils/user";
import { loadScript } from "../utils/misc";
import { getUser, resetUser } from "../features/user/userSlice";

const RenewalView = () => {
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  // Get pricing based on location
  const getPrice = async () => {
    const response = await getCurrency();
    if (typeof response === "string" && response.length === 3) {
      setCurrency(response);
    } else {
      setCurrency("INR");
    }
  };

  useEffect(() => {
    if (currency === "") {
      getPrice();
    }
  }, [currency]);

  const active = user.active;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (active === true) {
      navigate("/dashboard");
    } else {
      setLoggedIn(true);
    }
  }, [token, navigate, active]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
    }
  }, [loggedIn, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  // Display Razorpay
  const displayRazorpay = async () => {
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!loaded) {
      toast.error(
        "Oops, something's wrong! Please check your connection and try again."
      );
      return;
    }

    const payment_endpoint = `${process.env.REACT_APP_API}/api/users/renewal-payment`;

    const data = await fetch(payment_endpoint, {
      method: "POST",
      headers: {
        Local: currency,
      },
    }).then((res) => res.json());

    const options = {
      key: process.env.REACT_APP_RP_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Kengram",
      description: "Learning Assistant - Yearly Subscription",
      image:
        "https://res.cloudinary.com/drm4arlog/image/upload/v1662650045/kengram-assets/logo-symbol_yxbdac.png",
      order_id: data.id,
      handler: function (response) {
        if (response) {
          window.location.reload();
          toast.success("Your membership has been renewed. Happy learning!");
        }
      },
      theme: {
        color: "#4C175A",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  if (loading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <>
      <p className="text-muted text-center mt-5">
        Your membership has expired.
      </p>
      <Row className="justify-content-center text-center">
        <Col>
          <Button
            variant="primary"
            className="text-uppercase"
            onClick={() => {
              setLoading(true);
              displayRazorpay();
            }}
          >
            Renew Now
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default RenewalView;
