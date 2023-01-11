import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { IconContext } from "react-icons";
import {
  BsWhatsapp,
  BsHeartFill,
  BsTelephone,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrency } from "../utils/user";
import { loadScript } from "../utils/misc";

import TestimonialCard from "../components/TestimonialCard";
import RefundsText from "../components/RefundsText";
import PrivacyText from "../components/PrivacyText";
import TermsText from "../components/TermsText";
import DisclaimerText from "../components/DisclaimerText";
import logo from "../assets/logo-full-light.svg";
import hero from "../assets/images/hero.png";
import atlassian from "../assets/images/atlassian.svg";
import squarespace from "../assets/images/squarespace.svg";
import grubhub from "../assets/images/grubhub.svg";
import exactsciences from "../assets/images/exact-sciences.svg";
import yext from "../assets/images/yext.svg";
import vmware from "../assets/images/vmware.svg";
import vanguard from "../assets/images/vanguard.svg";
import illumio from "../assets/images/illumio.svg";
import cargurus from "../assets/images/cargurus.svg";
import superhero from "../assets/images/superhero.png";
import workshop from "../assets/images/workshop.png";
import mentoring from "../assets/images/mentoring.png";
import moneyback from "../assets/images/moneyback.png";
import founder from "../assets/images/founder.png";
import hasna from "../assets/images/test-hasna.png";
import ashiq from "../assets/images/test-ashiq.png";
import unais from "../assets/images/test-unais.png";
import sani from "../assets/images/test-sani.png";
import nazish from "../assets/images/test-nazish.png";
import fahad from "../assets/images/test-fahad.png";

// Landing Page component
const LandingView = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

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

    const payment_endpoint = `${process.env.REACT_APP_API}/api/users/payment`;

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
      description: "Mastery Learning Challenge",
      image:
        "https://res.cloudinary.com/drm4arlog/image/upload/v1662650045/kengram-assets/logo-symbol_yxbdac.png",
      order_id: data.id,
      handler: function (response) {
        if (response) {
          navigate("/register");
          toast.success(
            "Thank you for your purchase! Please check your email for instructions."
          );
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

  // Legal sections modals
  const [termsShow, setTermsShow] = useState(false);
  const [privacyShow, setPrivacyShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [disclaimerShow, setDisclaimerShow] = useState(false);

  const handleTermsShow = () => setTermsShow(true);
  const handleTermsClose = () => setTermsShow(false);
  const handlePrivacyShow = () => setPrivacyShow(true);
  const handlePrivacyClose = () => setPrivacyShow(false);
  const handleCancelShow = () => setCancelShow(true);
  const handleCancelClose = () => setCancelShow(false);
  const handleDisclaimerShow = () => setDisclaimerShow(true);
  const handleDisclaimerClose = () => setDisclaimerShow(false);

  if (loading) {
    return (
      <Row className="align-items-center justify-content-center viewport-height">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <Container fluid>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="kengram-logo" className="landing-logo" />
          </Navbar.Brand>
          <LinkContainer to="/login">
            <Button variant="outline-light" className="text-uppercase">
              Log In
            </Button>
          </LinkContainer>
        </Container>
      </Navbar>

      {/* Hero */}
      <Row xs={1} lg={2} className="my-5 py-5 bg-primary">
        <Col className="my-lg-auto">
          <h1 className="text-light text-center headline-font fw-bold">
            Superpowers for students
          </h1>
          <p className="text-light lead text-center mx-2">
            Make your student life more fun and less frustrating
          </p>
          <br />
          <Row className="mx-auto justify-content-center mb-5">
            <Col xs={12} md={6} lg={9}>
              <Button
                className="w-100 text-uppercase text-primary fw-bold py-2"
                variant="light"
                onClick={() => {
                  setLoading(true);
                  displayRazorpay();
                }}
              >
                Unlock Your Brainpower For{" "}
                <span className="number">
                  {currency === "INR" ? "₹999" : "$18"}
                </span>
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="mx-auto justify-content-center">
            <Image src={hero} alt="hero" fluid />
          </Row>
        </Col>
      </Row>

      {/* Problem */}
      <Row className="my-5">
        <h2 className="text-center fw-bold text-dark mb-5">
          Do you find learning <span className="text-danger">boring</span>,{" "}
          <span className="text-danger">hard</span> and{" "}
          <span className="text-danger">pointless</span>?
        </h2>

        <Row xs={1} className="mx-auto justify-content-center">
          <Col xs={12} md={9} lg={6}>
            <p className=" text-center text-dark fs-4">
              Of the students we talked to,
            </p>
            <Card border="light">
              <Card.Body>
                <ul className="text-dark lead">
                  <li className="mb-3">
                    <span className="number text-danger fs-2">39%</span> look
                    forward to school or college only because of their buddies
                  </li>
                  <li className="mb-3">
                    <span className="number text-danger fs-2">69%</span> study
                    mainly because of parental pressure to perform well on exams
                  </li>
                  <li>
                    <span className="number text-danger fs-2">90%</span> admit
                    that learning involves too much effort and is rarely
                    enjoyable
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h3 className="fw-bold text-dark text-center mt-5">
              Kengram helps you excel as a student without studying all the
              time.
              <br />
              <br />
              Say goodbye to{" "}
              <span className="text-danger">frustrated learning</span> and hello
              to <span className="text-success">mastery learning</span>.
            </h3>
          </Col>
        </Row>
      </Row>

      {/* Solution */}
      <Row className="bg-primary text-light py-5 my-5">
        <h2 className="text-uppercase text-center solution-title fw-bold">
          Mastery Learning Challenge
        </h2>
        <p className="solution-subheading text-center mb-5 px-3">
          {/* Become a master learner in 3 days
          <br /> */}
          Crack any exam in 90 days, or your money back
        </p>
        <Row xs={1} md={3} className="mx-auto justify-content-center">
          <Col className="mb-5 mb-md-0">
            <Card className="text-center" text="dark" border="primary">
              <Card.Img
                className="py-3"
                variant="top"
                src={workshop}
                alt="workshop"
              />
              <Card.Body>
                <Card.Title className="text-uppercase product-title fw-bold">
                  3-day Online Workshop
                </Card.Title>
                <Card.Text className="feature-description-height">
                  Discover your hidden potential, turbocharge your learning
                  efficiency and chart your journey to becoming an expert
                </Card.Text>
                <ListGroup variant="flush" className="text-start fw-bold">
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Day 1 - Mental Reprogramming
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Day 2 - Mastery Learning Formula
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Day 3 - Expert Evolution Blueprint
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-5 mb-md-0">
            <Card className="text-center" text="dark" border="primary">
              <Card.Img
                className="py-3"
                variant="top"
                src={superhero}
                alt="learning-assistant"
              />
              <Card.Body>
                <Card.Title className="text-uppercase product-title fw-bold">
                  90-day Learning Challenge
                </Card.Title>
                <Card.Text className="feature-description-height">
                  Implement the Mastery Learning Formula to achieve your
                  particular learning goal using Kengram, a web-based learning
                  assistant
                </Card.Text>
                <ListGroup variant="flush" className="text-start fw-bold">
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Build a powerful learning habit
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Automate the learning process
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Measure and improve performance
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-5 mb-md-0">
            <Card className="text-center" text="dark" border="primary">
              <Card.Img
                className="py-3"
                variant="top"
                src={mentoring}
                alt="mentoring"
              />
              <Card.Body>
                <Card.Title className="text-uppercase product-title fw-bold">
                  1-on-1 personal mentoring
                </Card.Title>
                <Card.Text className="feature-description-height">
                  Get the extra push that guarantees your success by having our
                  learning scientists as your accountability partners
                </Card.Text>
                <ListGroup variant="flush" className="text-start fw-bold">
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    On-demand mentoring
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Weekly live group sessions
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="dark"
                    className="text-dark feature-list-height"
                  >
                    Personalized remedies and solutions
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row xs={1} className="mx-auto mt-md-5 justify-content-center">
          <h3 className="fw-bold text-center text-light mb-5">
            The average cost of attending college in{" "}
            <span>{currency === "INR" ? "India" : "the US"}</span> is{" "}
            <span className="number fs-2">
              {currency === "INR" ? "₹ 3,50,000" : "$ 40,000"}
            </span>
            .
            <br />
            <br />
            For the price of a textbook or two, get the tools to make your
            education worth every penny.
          </h3>
          <Col xs={12} md={6}>
            <Button
              className="w-100 text-uppercase text-primary fw-bold py-2"
              variant="light"
              onClick={() => {
                setLoading(true);
                displayRazorpay();
              }}
            >
              Unlock Your Brainpower For{" "}
              <span className="number">
                {currency === "INR" ? "₹999" : "$18"}
              </span>
            </Button>
          </Col>
        </Row>
      </Row>

      {/* Credibility */}
      <Row xs={1} className="mx-auto mt-lg-5 justify-content-center">
        <h3 className="fw-bold text-center text-dark mb-3 mb-lg-5">
          Efficient learning ability is the{" "}
          <span className="text-secondary">#</span>
          <span className="number fs-2 text-secondary">1</span> sought after
          skill at top brands
        </h3>
      </Row>
      <Row xs={4} md={5} className="mx-md-5 justify-content-center">
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.atlassian.com" target="_blank" rel="noreferrer">
            <Image fluid src={atlassian} alt="atlassian" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.cargurus.com" target="_blank" rel="noreferrer">
            <Image fluid src={cargurus} alt="cargurus" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a
            href="https://www.exactsciences.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image fluid src={exactsciences} alt="exactsciences" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.grubhub.com" target="_blank" rel="noreferrer">
            <Image fluid src={grubhub} alt="grubhub" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.illumio.com" target="_blank" rel="noreferrer">
            <Image fluid src={illumio} alt="illumio" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a
            href="https://www.squarespace.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image fluid src={squarespace} alt="squarespace" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.vanguard.com" target="_blank" rel="noreferrer">
            <Image fluid src={vanguard} alt="vanguard" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.vmware.com" target="_blank" rel="noreferrer">
            <Image fluid src={vmware} alt="vmware" />
          </a>
        </Col>
        <Col className="mx-auto mb-3 mb-md-5">
          <a href="https://www.yext.com" target="_blank" rel="noreferrer">
            <Image fluid src={yext} alt="yext" />
          </a>
        </Col>
      </Row>

      {/* Social Proof */}
      <Row className="bg-primary py-5 justify-content-center text-center text-light">
        <h2 className="fw-bold mb-3 mb-lg-5 fs-1">Join the crowd today</h2>
        <Row className="mx-md-5 justify-content-center">
          <Col xs={12} md={6} className="mx-auto fs-5 ">
            <span className="number fs-3 fw-bold">3,000+</span> learners strong
          </Col>
          <Col xs={12} md={6} className="mx-auto fs-5 ">
            <span className="number fs-3 fw-bold">2,70,000+</span> hours learned
          </Col>
        </Row>
        {/* Testimonials */}
        <h2 className="text-center headline-font text-light my-5">
          <IconContext.Provider
            value={{
              style: { verticalAlign: "middle" },
            }}
          >
            <BsHeartFill />
          </IconContext.Provider>
        </h2>
        <Carousel controls={false}>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Hasna"
              avatar={hasna}
              details="TCS, Kochi"
              review="I was able to clear my Professional Scrum Master(PSM-1) certification exam with 98% marks on my first attempt, after just over 2 weeks of preparation using the Mastery Learning Formula. It feels like I am empowered with a magical power that enables me to learn anything!"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Fahad"
              avatar={fahad}
              details="NIT, Calicut"
              review="By using the Mastery Learning Formula, I am able to study more in less time. I am also able to find time for other activities like sports and hanging out with friends. Plus, it has saved me from the sleepless struggle I usually go through on the night before my term-end exams."
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Ashiq"
              avatar={ashiq}
              details="GEC, Thrissur"
              review="I secured S grade in a subject that I had great difficulty studying by applying the principles taught in the Mastery Learning Workshop. In my opinion, colleges and universities should offer similar training on learning methodology for all students, as most cases of student failure is due to poor study technique."
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Ehsan"
              avatar={sani}
              details="Class 12, SCERT Kerala"
              review="I got A+ grade in all subjects for my Class 11 board examinations by following the 90-day Mastery Learning Challenge. After completing Class 12, my dream is to join the Indian Air Force, and I am preparing to attend the NDA and AFCAT exams next year."
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Unais"
              avatar={unais}
              details="ABB Limited, UAE"
              review="I have a demanding job and a strict schedule. 
                        Making time for learning after a long day of work is challenging. Mastery Learning has helped me fit learning into
                        my schedule. I use the Learning Assistant app to track my performance."
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <TestimonialCard
              name="Nazish"
              avatar={nazish}
              details="NAFFCO, UAE"
              review="I had purchased several online courses but was never able to complete them. By attending
                the Mastery Learning Workshop and 90-day challenge, I was able to beat procrastination and build a daily learning habit. This gives me confidence that I can build skills at any point in my career."
            />
          </Carousel.Item>
        </Carousel>
      </Row>

      {/* Risk reversal, Final CTA */}
      <Row
        xs={1}
        className="mx-auto my-5 px-md-5 text-center text-dark justify-content-center"
      >
        <h2 className="fw-bold fs-1">Try risk-free</h2>
        <Col>
          <Image src={moneyback} alt="hero-1" className="moneyback" fluid />
        </Col>
        <Col>
          <p className="lead">
            <span
              onClick={handleCancelShow}
              className="link-dark text-decoration-underline pointer"
            >
              We offer a 100% moneyback guarantee for 30 days
            </span>
          </p>
        </Col>
        <Col xs={12} md={6}>
          <Button
            className="w-100 text-uppercase fw-bold py-2"
            variant="primary"
            onClick={() => {
              setLoading(true);
              displayRazorpay();
            }}
          >
            Unlock Your Brainpower For{" "}
            <span className="number">
              {currency === "INR" ? "₹999" : "$18"}
            </span>
          </Button>
        </Col>
      </Row>

      {/* FAQs */}
      <hr />
      <h2 className="text-center fw-bold my-5 text-dark">
        Frequently Asked Questions
      </h2>
      <Container fluid>
        <Accordion className="mx-1 mx-md-5 mb-5" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className="text-dark">
                What exactly is the Mastery Learning Challenge?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>
                Mastery Learning Challenge is a holistic solution to help you
                master the art and science of learning effectively. It is a
                combination of:
              </p>
              <ul className="fw-bold">
                <li>
                  A 3-day online workshop where you'll learn the{" "}
                  <span className="fst-italic">Mastery Learning Formula</span>{" "}
                  for efficient learning
                </li>
                <li>
                  A 90-day challenge where you'll implement the{" "}
                  <span className="fst-italic">Mastery Learning Formula</span>{" "}
                  using <span className="fst-italic">Kengram</span>, a web-based
                  learning assistant, to prepare for any exam, or to master any
                  skill or subject
                </li>
                <li>
                  1-on-1 personal mentoring with our learning scientists to
                  ensure that you never fall off track and your learning
                  ambitions are achieved without fail
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <p className="text-dark">
                What is the Kengram Learning Assistant?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>
                The Kengram Learning Assistant is a progressive web application
                that allows users to organize, track and analyze their learning
                journey.
              </p>
              <p>
                Users can add courses, lessons and topics to the app. They can
                also create and store notes for each of the same, using an
                editor that supports{" "}
                <a href="https://www.markdownguide.org/">markdown</a> and{" "}
                <a href="https://katex.org/">KaTeX</a>.
              </p>
              <p>
                Most importantly, they can use the app for their learning
                sessions. And track duration, progress, stability, velocity and
                a plethora of other metrics that help them analyze and improve
                their learning efficiency and ability.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <p className="text-dark">
                How will Mastery Learning Challenge be conducted?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>Mastery Learning Challenge is a fully online program.</p>
              <p>
                Upon joining you will receive an email with your proof of
                purchase, an invite code to the Kengram Learning Assistant, and
                a link to schedule your Orientation Session. During the
                Orientation Session, you will interact 1-on-1 with a mentor and
                be briefed about the program agenda. You will also receive
                invite links to our exclusive groups on Facebook and/or
                WhatsApp.
              </p>
              <p>
                The 3-day online workshop will be a combination of live and
                recorded videos, delivered via Facebook Groups and/or WhatsApp.
                On-demand personal mentoring and other program-related
                communication will be through WhatsApp.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <p className="text-dark">
                Is Mastery Learning Challenge suitable for me?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>
                Mastery Learning Challenge is a great program for all learners
                above the age of 12, regardless of what they are trying to
                learn.
              </p>
              <p>
                It works equally well for academic learning, skill/hobby mastery
                and language learning.
              </p>
              <p>
                Even so, we have shortlisted a few scenarios where the program
                would be especially useful for the learner. If you fall into one
                of these categories, Mastery Learning Challenge is not just
                'nice-to-have' - <b>you need it.</b>
              </p>
              <ul className="fw-bold">
                <li>Students preparing for any kind of competitive exam</li>
                <li>
                  College and high school students having a hard time learning
                </li>
                <li>Online learners having difficulty completing courses</li>
                <li>
                  Learners trying to master complex skills like computer
                  programming
                </li>
                <li>
                  Working professionals trying to upskill and enrich their
                  careers
                </li>
                <li>
                  Adult learners coming back to learn after a break, or trying
                  to learn something completely new, in order to switch careers
                </li>
              </ul>
              <p>
                And if you are the <b>perfectionist learner</b> who wants to
                settle for nothing less than true mastery and expertise, then
                Mastery Learning Challenge would be a match made in heaven.
              </p>
              <p>
                Having said this, it is inevitable not to mention who the
                Mastery Learning Challenge is{" "}
                <b>
                  <em>not</em>
                </b>{" "}
                for:
              </p>
              <ul className="text-danger">
                <li>
                  Students trying to cram for a fast-approaching exam date -
                  crack any exam in 90 days, or more,{" "}
                  <span className="fw-bold fst-italic">not less</span>
                </li>
                <li>
                  Those looking for the non-existent easy shortcut to master
                  tough concepts and skills
                </li>
                <li>
                  Although we are researching it, our current program does not
                  cover differently-abled learners
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <p className="text-dark">
                What benefits can I gain by joining Mastery Learning Challenge?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>
                By the end of the Mastery Learning Challenge, you would have
                unlocked your unlimited potential to learn any concept or skill
                under the sun.
              </p>
              <p>
                You would have discovered the big picture of human learning -
                how, when and why humans began collecting and storing knowledge.
              </p>
              <p>
                If you joined to perform well in any particular exam, you should
                have cracked it with flying colors!
              </p>
              <p>
                Furthermore, you would have acquired the following key benefits:
              </p>
              <ul className="fw-bold">
                <li>Ability to focus at will, without distractions</li>
                <li>
                  Retention of the knowledge acquired and ability to retrieve it
                  at will
                </li>
                <li>
                  Proper mastery of concepts and skills, contrary to the
                  learn-and-forget methodology
                </li>
                <li>
                  Increased opportunity, courtesy to your new-found
                  superlearning ability
                </li>
                <li>
                  Confidence to learn anything, regardless of complexity, owing
                  to the poweful and efficient learning habit you have built
                </li>
                <li>
                  A thorough understanding of your strengths and weaknesses as a
                  learner, in the context of how learning works in the brain
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <p className="text-dark">
                How does Mastery Learning Challenge help me achieve my learning
                goal?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>The human learning process consists of 3 cyclic steps:</p>
              <ol>
                <li>
                  <span className="fw-bold">Encoding</span>: The intake of new
                  information using working memory
                </li>
                <li>
                  <span className="fw-bold">Storage</span>: The storing of
                  encoded information into long-term memory
                </li>
                <li>
                  <span className="fw-bold">Retrieval</span>: The recollection
                  of encoded information from long-term memory when required
                </li>
              </ol>
              <p>
                During the 3-day workshop, you will learn the{" "}
                <span className="fst-italic">Mastery Learning Formula</span>, a
                step-by-step method that aids all 3 steps of the human learning
                process, and works for learning any concept, skill or idea.
              </p>
              <p>
                The 90-day challenge will help you implement and put the{" "}
                <span className="fst-italic">Mastery Learning Formula</span> to
                practice, in order to accomplish your specific learning goal.
              </p>
              <p>
                Finally, through dedicated 1-on-1 mentoring, we make sure you
                stick to plan and don't fall prey to lack of motivation,
                laziness or procrastination.
              </p>
              <p>
                To know more, call or chat with us to schedule a free 1-on-1
                consultation.
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <p className="text-dark">
                Can I really crack any exam in 90 days?
              </p>
            </Accordion.Header>
            <Accordion.Body className="text-dark">
              <p>
                90 days is a pretty long period of time. Amazing feats can be
                achieved in 90 days, so much so that we would dare say -{" "}
                <span className="fw-bold">
                  yes, you can crack any exam in 90 days
                </span>
                .
              </p>
              <p>
                But, as you might have expected, there are a couple of caveats:
              </p>
              <ul>
                <li>
                  <b>Your cooperation</b>: Learning is an activity that requires
                  energy, effort and time. Sure, it is one of our primary goals
                  to train you to do more in less, but the importance of
                  behavior change, habit-building and the learning mechanisms of
                  the brain cannot be ignored. Therefore, we request your total
                  cooperation and faith in following our instructions to the
                  letter, even if you cannot make sense of them at the time.
                </li>
                <li>
                  <b>Competitive exams</b>: When it comes to exams of a highly
                  competitive nature, there may be candidates who have been
                  putting in enormous efforts for years. This should not be
                  discouraging and while it is totally possible to crack even
                  these kind of exams in 90 days, it is only realistic that
                  there are chances you may fall slightly short. Due to the
                  limited nature of these exams and the number of candidates
                  appearing, these exams may simply require more than 90 days of
                  preparation. Persistence is key and you may have to try again,
                  but be assured that during your next attempt, your competitors
                  would be facing a true learning ninja who has mastered the art
                  and science of learning effectively!
                </li>
              </ul>
              <p>
                Having said that, we repeat -{" "}
                <b>Amazing feats can be achieved in 90 days.</b>
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <hr />
      {/* Founder's Note  */}
      <h2 className="text-center text-dark fw-bold my-5">Founder's Note</h2>
      <Row className="text-dark px-md-5">
        <Row xs={1} className="justify-content-center mx-auto">
          <Col className="text-center">
            <Image
              src={founder}
              alt="founder"
              className="founder-img"
              roundedCircle
            />
            <p className="lead mt-3">
              Hey! I'm Faheem Kodi. 👋
              <br />
              I'm a software engineer from Kerala, India. 🇮🇳
            </p>
          </Col>
        </Row>
        <p className="mt-3">
          Throughout high school and college, I had lofty goals. And I
          constantly made plans, strategies and blueprints to realize them.
          Funny thing is, I was never able to adhere to even one of those, and
          my performance was, at best, average.
        </p>
        <p>
          I came to realize that there was something fundamentally wrong with
          the way I was going about things. To sum up:
        </p>
        <ul className="px-5">
          <li>
            I refused to turn a page until I understood everything in it. Traded
            progress for perfection, achieving neither.
          </li>
          <li>
            I made plans that were incredibly hard to carry through - like
            learning too much of complex subjects like science and math in too
            little time.
          </li>
          <li>I was a serial procrastinator.</li>
        </ul>
        <p>
          Each of the above amplified the others' effect, and the results were
          disastrous. Let's just say that I was unable to make the most out of
          my formal education.
        </p>
        <p>
          But what intrigued me was the fact that even though the average person
          spends a quarter of their life in school and college, there was no
          emphasis or definitive guidance on{" "}
          <span className="fst-italic">how to learn</span> at institutions!
        </p>

        <p className="">
          In 2020, Kengram Edtech was formed, with a three-fold mission:
        </p>
        <ul className="px-5">
          <li>Spread awareness on the importance of learning</li>
          <li>Help students learn more efficiently</li>
          <li>Make learning more enjoyable</li>
        </ul>
        <p>
          Building upon the latest solid research from the learning sciences,
          and after consulting with expert educators, we created{" "}
          <span className="fst-italic">Mastery Learning</span>, a 3-day workshop
          to help learners improve their ability. Over the course of piloting
          the workshop for a few months, we made one crucial discovery.
        </p>

        <p>
          Today, it has evolved into a program I wish was available for me
          during my prime student years. It would have saved me a lot of
          frustration and failures. For you, it sure will!
        </p>
        <p>
          Looking forward to working closely with each one of you, to ensure
          that all your academic ambitions are realized.
        </p>
        <p>Happy learning! 💜</p>
      </Row>
      <hr />
      {/* Footer */}
      <Container fluid>
        <Row className="mx-auto justify-content-center">
          <Col xs={12} md={6}>
            <Row xs={3} className="mx-auto">
              <Col className="text-center">
                <a
                  href="https://www.facebook.com/kengramlearning"
                  title="Facebook"
                >
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "top" },
                      className: "text-primary fs-1",
                    }}
                  >
                    <BsFacebook />
                  </IconContext.Provider>
                </a>
              </Col>
              <Col className="text-center">
                <a
                  href="https://www.instagram.com/kengramlearning"
                  title="Instagram"
                >
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "top" },
                      className: "text-primary fs-1",
                    }}
                  >
                    <BsInstagram />
                  </IconContext.Provider>
                </a>
              </Col>
              <Col className="text-center">
                <a
                  href="https://www.linkedin.com/company/kengram"
                  title="LinkedIn"
                >
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "top" },
                      className: "text-primary fs-1",
                    }}
                  >
                    <BsLinkedin />
                  </IconContext.Provider>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mx-auto my-5 justify-content-center">
          <Col xs={12} md={6}>
            <Row xs={1} md={4} className="mx-auto">
              <Col className="text-center">
                <span
                  className="text-primary pointer"
                  onClick={handleTermsShow}
                >
                  Terms
                </span>
              </Col>
              <Col className="text-center">
                <span
                  className="text-primary pointer"
                  onClick={handlePrivacyShow}
                >
                  Privacy
                </span>
              </Col>
              <Col className="text-center">
                <span
                  className="text-primary pointer"
                  onClick={handleCancelShow}
                >
                  Refunds
                </span>
              </Col>
              <Col className="text-center">
                <span
                  className="text-primary pointer"
                  onClick={handleDisclaimerShow}
                >
                  Disclaimer
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="my-5 pb-5">
          <p className="text-primary text-center small">
            © 2022 Kengram Edtech Private Limited
            <br />
            All rights reserved
          </p>
        </Row>
      </Container>
      {/* Contact CTA */}
      <Container fluid>
        <Navbar fixed="bottom" bg="primary" variant="dark">
          <Container>
            <Col className="text-center">
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-light contact-font p-2",
                }}
              >
                <a href="tel:+919895893111" title="Call">
                  <BsTelephone />
                </a>
              </IconContext.Provider>
            </Col>
            <Col className="text-center">
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-light contact-font p-2",
                }}
              >
                <a
                  href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20know%20more%20about%20Mastery%20Learning%20Formula,%20please!"
                  title="Text"
                >
                  <BsWhatsapp />
                </a>
              </IconContext.Provider>
            </Col>
          </Container>
        </Navbar>
      </Container>

      {/* Legal modals */}
      <Modal show={termsShow} onHide={handleTermsClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Terms and Conditions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TermsText />
        </Modal.Body>
      </Modal>

      <Modal show={privacyShow} onHide={handlePrivacyClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PrivacyText />
        </Modal.Body>
      </Modal>

      <Modal show={cancelShow} onHide={handleCancelClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Cancellation & Refund Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RefundsText />
        </Modal.Body>
      </Modal>

      <Modal show={disclaimerShow} onHide={handleDisclaimerClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Legal Disclaimer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisclaimerText />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LandingView;
