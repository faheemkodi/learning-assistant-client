import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { IconContext } from "react-icons";
import {
  BsBagPlusFill,
  BsBarChartSteps,
  BsBullseye,
  BsCalendar2EventFill,
  BsFileRichtextFill,
  BsGraphUp,
  BsHeartFill,
  BsMapFill,
  BsWhatsapp,
  BsTelephone,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrency } from "../utils/user";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";
import logo from "../assets/logo-full-light.svg";
import hero1 from "../assets/images/hero-1.png";
import hero2 from "../assets/images/hero-2.png";
import hero3 from "../assets/images/hero-3.png";
import hero4 from "../assets/images/hero-4.png";
import hero5 from "../assets/images/hero-5.png";
import hero6 from "../assets/images/hero-6.png";
import superhero from "../assets/images/superhero.png";
import moneyback from "../assets/images/moneyback.png";
import founder from "../assets/images/founder.png";

// Script loader function
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

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
      if (currency === "") {
        getPrice();
      }
    }
  }, [token, currency, navigate]);

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
      description: "Insiders Lifetime Access Suite",
      image:
        "https://res.cloudinary.com/drm4arlog/image/upload/v1662650045/kengram-assets/logo-symbol_yxbdac.png",
      order_id: data.id,
      handler: function (response) {
        if (response) {
          navigate("/register");
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
    <>
      <div>
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
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
        <section>
          <div className="mt-5 bg-primary py-5">
            <h1 className="text-light text-center headline-font fw-bold">
              Boost your learning ability
            </h1>
            <p className="text-light lead text-center px-2">
              A learning assistant to organize, track and analyze your learning
              journey
            </p>
            <br />
            <Row className="mx-auto justify-content-center mb-3">
              <Col xs={9} md={3}>
                <Button
                  className="w-100 text-uppercase text-primary fw-bold py-2"
                  variant="light"
                  onClick={() => {
                    setLoading(true);
                    displayRazorpay();
                  }}
                >
                  Become An Insider
                </Button>
              </Col>
            </Row>
            <br />
            <h2 className="text-light fw-bold text-center mb-2">
              Trusted by over 3,000 learners worldwide
            </h2>

            <Row className="mx-auto justify-content-center mb-5">
              <Col xs={12} md={6}>
                <Carousel controls={false} className="mb-3">
                  <Carousel.Item interval={2000}>
                    <Image src={hero1} alt="hero-1" className="w-100" />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Image src={hero2} alt="hero-2" className="w-100" />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Image src={hero3} alt="hero-3" className="w-100" />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Image src={hero4} alt="hero-4" className="w-100" />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Image src={hero5} alt="hero-5" className="w-100" />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Image src={hero6} alt="hero-6" className="w-100" />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </div>
        </section>
        {/* PFB Cards */}
        <section>
          <Row xs={1} md={2} lg={3} className="mx-auto my-5">
            <Col>
              <FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsBarChartSteps />
                  </IconContext.Provider>
                }
                feature="Improve your learning efficiency"
                problem="Aiming for the sky?"
                benefit="Crack any exam and master any skill by following 
              a universal, step-by-step formula"
              />
            </Col>
            <Col>
              <FeatureCard
                FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsMapFill />
                  </IconContext.Provider>
                }
                feature="Map entire courses in your mind"
                problem="Keep forgetting what you learned?"
                benefit="Leverage your subconscious mind to effortlessly encode knowledge into your brain"
              />
            </Col>
            <Col>
              <FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsFileRichtextFill />
                  </IconContext.Provider>
                }
                feature="All your notes in one place"
                problem="A single source of truth for all your learning quests"
                benefit="Take notes, even for Math and Chemistry, using our powerful editor
              that supports both markdown and KaTeX"
              />
            </Col>
            <Col>
              <FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsBullseye />
                  </IconContext.Provider>
                }
                feature="Meditative learning sessions"
                problem="Is your mind a daydreaming wanderer?"
                benefit="Attain monk-like focussing power during your learning sessions,
              using 40Hz binaural beats"
              />
            </Col>
            <Col>
              <FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsCalendar2EventFill />
                  </IconContext.Provider>
                }
                feature="True mastery learning"
                problem="Ditch the learn-and-forget methodology"
                benefit="Evolve into an expert in your domain through consistent practice and revision, guided by the Learning Assistant"
              />
            </Col>
            <Col>
              <FeatureCard
                icon={
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "feature-icon text-primary",
                    }}
                  >
                    <BsGraphUp />
                  </IconContext.Provider>
                }
                feature="Personalized 1-on-1 mentoring"
                problem="More than just technology"
                benefit="Based on insights generated by the app, our learning scientists craft
              personalized remedies and solutions, to guarantee your success"
              />
            </Col>
          </Row>
        </section>
        {/* Testimonial carousel */}
        <section>
          <h2 className="text-center headline-font text-primary mb-5">
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
                name="Ritwik"
                details="CS50x Programming Course, HarvardX"
                review="Finished the course in around 4 months, but
              most importantly, I learned how to learn."
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <TestimonialCard
                name="Arun"
                details="Online BS Degree in Data Science, IIT Madras"
                review="The ability to add Maths and Statistics equations as digital notes is so, so convenient!
              I hope you guys add image and audio insertion features soon."
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <TestimonialCard
                name="Nida"
                details="Self-taught Programmer"
                review="I'm constantly learning but not one minute without turning on the Kengram timer. It's strangely satisfying
              to watch all the metrics go green and the numbers go high!"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <TestimonialCard
                name="Vidya"
                details="IAS/Civil Services Aspirant"
                review="Excellent app for systematic revison and studying while travelling."
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <TestimonialCard
                name="Hasna"
                details="Professional Scrum Master"
                review="I'm a working professional on a tight schedule. It's hard to make time for learning
              after a long day's work. With Kengram, it's as simple as setting a weekly goal and sticking
              to it. Believe me, you will!"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <TestimonialCard
                name="Prabhat"
                details="English Language Learner"
                review="I began using the app for IELTS preparation. It helped a lot and I successfully cleared
              the exam. I still use it regularly, to upgrade my vocabulary."
              />
            </Carousel.Item>
          </Carousel>
        </section>
        {/* 2nd CTA */}
        <section className="bg-primary py-5">
          <h2 className="text-light text-center fs-1 fw-bold my-4">
            Kengram Insiders Program
          </h2>
          <p className="text-light text-center px-md-5">
            If you're a learner with great ambitions, we take vow to make them
            happen.
            <br />
            <span className="fw-bold">
              We invite you to try the Kengram Learning Experience.
            </span>
          </p>
          <Row xs={1} lg={2} className="mx-auto mt-4 mb-5">
            <Col className="mt-4">
              <Image src={superhero} alt="hero-1" className="w-100" />
            </Col>
            <Col>
              <Card className="mt-5 mt-lg-4 mx-md-4 mx-1" border="light">
                <Card.Body>
                  <Card.Title className="text-center fs-4 fw-bold text-primary mb-3">
                    What you'll gain
                  </Card.Title>
                  <Row>
                    <Col xs={2} className="text-center">
                      <span>
                        <IconContext.Provider
                          value={{
                            style: { verticalAlign: "top" },
                            className: "text-primary fs-5",
                          }}
                        >
                          <BsBagPlusFill />
                        </IconContext.Provider>
                      </span>
                    </Col>
                    <Col xs={10} className="text-primary">
                      <p>
                        <span className="fw-bold">Superpowers</span> that will
                        help you master any concept or skill
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2} className="text-center">
                      <span>
                        <IconContext.Provider
                          value={{
                            style: { verticalAlign: "top" },
                            className: "text-primary fs-5",
                          }}
                        >
                          <BsBagPlusFill />
                        </IconContext.Provider>
                      </span>
                    </Col>
                    <Col xs={10} className="text-primary">
                      <p>
                        <span className="fw-bold">Lifetime access</span> to the
                        Kengram Learning Assistant
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2} className="text-center">
                      <span>
                        <IconContext.Provider
                          value={{
                            style: { verticalAlign: "top" },
                            className: "text-primary fs-5",
                          }}
                        >
                          <BsBagPlusFill />
                        </IconContext.Provider>
                      </span>
                    </Col>
                    <Col xs={10} className="text-primary">
                      <p>
                        <span className="fw-bold">
                          Complementary 1-on-1 mentoring
                        </span>{" "}
                      </p>
                    </Col>
                  </Row>

                  <hr />
                  <Row xs={2}>
                    <Col className="text-center text-danger">
                      <span className="small text-uppercase">
                        Original Price
                      </span>
                      <p className="fs-2 fw-bold number">
                        {currency === "INR" ? <s>₹ 19,900</s> : <s>$ 369</s>}
                      </p>
                    </Col>
                    <Col className="text-center text-primary">
                      <span className="text-primary small text-center text-uppercase">
                        Insiders Price
                      </span>
                      <p className="fs-2 fw-bold number">
                        {currency === "INR" ? "₹ 3,699" : "$ 69"}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mx-auto justify-content-center">
            <Col xs={9} md={3}>
              <Button
                className="w-100 text-uppercase text-primary fw-bold py-2"
                variant="light"
                onClick={() => {
                  setLoading(true);
                  displayRazorpay();
                }}
              >
                Become An Insider
              </Button>
            </Col>
          </Row>
          <Row className="mx-auto mt-5 px-md-5 text-center justify-content-center">
            <h2 className="text-light fw-bold fs-1">Try risk-free</h2>
            <span className="text-center">
              <Image src={moneyback} alt="hero-1" className="moneyback" />
            </span>
            <p className="lead">
              <span
                onClick={handleCancelShow}
                className="link-light text-decoration-underline pointer"
              >
                We offer a 100% moneyback guarantee for 30 days
              </span>
            </p>
          </Row>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-center fw-bold my-5 text-primary">
            Frequently Asked Questions
          </h2>
          <Accordion className="mx-1 mx-md-5 mb-5" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className="lead text-primary">
                  What exactly is the Learning Assistant?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>
                  The Kengram Learning Assistant is a progressive web
                  application that allows users to organize, track and analyze
                  their learning quests.
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
                  sessions. Users can track duration, progress, stability,
                  velocity and a plethora of other metrics that help them
                  analyze and improve their learning efficiency and ability.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p className="lead text-primary">
                  Who is the Learning Assistant for?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>
                  The Learning Assistant is a great tool for all learners above
                  the age of 12, regardless of what they are trying to learn.
                </p>
                <p>
                  It works equally well for academic learning, skill/hobby
                  mastery and language learning.
                </p>
                <p>
                  Even so, we have shortlisted a few scenarios where the
                  Learning Assistant would be especially useful for the learner.
                  If you fall into one of these categories, the Learning
                  Assistant is not just 'nice-to-have' - <b>you need it.</b>
                </p>
                <ul className="fw-bold">
                  <li>Online course takers who find commitment hard</li>
                  <li>
                    Learners trying to master complex skills like computer
                    programming
                  </li>
                  <li>Adult learners coming back to learn after a break</li>
                  <li>
                    Working professionals trying to upskill and enrich their
                    careers
                  </li>
                  <li>
                    Those wanting to learn something completely new, in order to
                    switch careers
                  </li>
                  <li>
                    Students whose efforts don't reflect in their report cards
                  </li>
                </ul>
                <p>
                  And if you are the <b>perfectionist learner</b> who wants to
                  settle for nothing less than true mastery and expertise, the
                  Kengram Learning Experience would be a match made in heaven.
                </p>
                <p>
                  Having said this, it is inevitable not to mention who the
                  Learning Assistant is{" "}
                  <b>
                    <em>not</em>
                  </b>{" "}
                  for:
                </p>
                <ul className="text-danger">
                  <li>
                    Students trying to cram for a fast-approaching exam date
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
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <p className="lead text-primary">
                  What benefits are expected from using the Learning Assistant?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>
                  With consistent usage of the Learning Assistant, the following
                  key benefits can be acquired, among several others:
                </p>
                <ul className="fw-bold">
                  <li>Ability to focus at will, without distractions</li>
                  <li>
                    Retention of the knowledge acquired and ability to retrieve
                    it at will
                  </li>
                  <li>
                    Proper mastery of concepts and skills, contrary to the
                    learn-and-forget methodology
                  </li>
                  <li>
                    Increased opportunity, courtesy to your new-found
                    superlearner status
                  </li>
                  <li>
                    Confidence to learn anything, regardless of complexity
                  </li>
                  <li>
                    A thorough understanding of your strengths and weaknesses as
                    a learner, in the context of how learning works in the brain
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <p className="lead text-primary">
                  How does the Learning Assistant improve learning ability?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>The human learning process consists of 3 cyclic steps:</p>
                {/* <ol>
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
                </ol> */}
                <p>
                  The Learning Assistant assists you with all 3 of these
                  processes:
                </p>
                <ul>
                  <li>
                    Encoding is aided by the meditative learning sessions using
                    binaural beats.
                  </li>
                  <li>
                    Storage, although happening in your brain, is greatly aided
                    by the course-mapping and note-taking processes.
                  </li>
                  <li>
                    Retrieval is enforced by the Learning Assistant. In order to
                    maintain the <b>stability</b> metric, you have to revise and
                    retrieve previously encoded knowledge at regular intervals.
                  </li>
                </ul>
                <p>
                  And that is not even the tip of the iceberg! To know more,
                  call or chat with us to schedule a free 1-on-1 consultation.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <p className="lead text-primary">
                  How long does one need to use the Learning Assistant before
                  seeing results?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>
                  The time required to build solid learning ability will vary
                  between people, as there is a lot of{" "}
                  <b>behavior correction</b> and <b>habit building</b> involved.
                </p>
                <p>
                  However, with consistent usage of the Learning Assistant,
                  complemented by our world-class mentoring, the average Joe can
                  begin to see tangible improvement in 2-3 months.
                </p>
                <p>
                  And they will master the art and science of learning
                  efficiently in a matter of 6-8 months.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <p className="lead text-primary">
                  What is the Kengram Insiders Program?
                </p>
              </Accordion.Header>
              <Accordion.Body className="text-dark">
                <p>
                  The Kengram Insiders Program is a limited-time offer for the{" "}
                  <b>early adopters</b> of Kengram. It is characterized by the
                  following key perks and priveleges, among several others:
                </p>
                <ul>
                  <li>
                    <b>Lifetime access</b> to the Learning Assistant and
                    complementary mentoring for the price of a 1-year membership
                  </li>
                  <li>
                    <b>Early access</b> to all upcoming updates and versions of
                    the Learning Assistant
                  </li>
                  <li>
                    <b>Unparalleled personal attention</b>, including
                    interaction with the founders of Kengram
                  </li>
                  <li>
                    <b>Special discounts</b> and <b>coupons</b> for friends and
                    family of members
                  </li>
                  <li>
                    <b>Opportunity</b> to associate with Kengram as a mentor or
                    learning scientist
                  </li>
                  <li>
                    <b>Access</b> and <b>priority</b>, when it comes to Kengram
                    partner programs, such as referral programs and franchises
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>
        {/* Founder's note */}
        <section>
          <h2 className="text-center fw-bold my-5 text-primary">
            Founder's Note
          </h2>
          <Card border="light" className="m-3 mb-5">
            <Card.Body>
              <Image
                src={founder}
                alt="founder"
                className="mb-4 d-block d-md-none"
                roundedCircle
                height="200"
                width="200"
              />
              <div className="number text-dark">
                <Image
                  src={founder}
                  alt="founder"
                  className="float-start me-3 d-none d-md-block"
                  roundedCircle
                  height="225"
                  width="225"
                />
                <p className="fs-3 fw-bold">Hey! I'm Faheem Kodi. 👋</p>
                <p className="fs-4">
                  I'm a software engineer from Kerala, India. 🇮🇳
                </p>
                <p className="fs-4">
                  Although most of the things I end up doing turn out otherwise,
                  I am a perfectionist at heart. That's not always a very good
                  trait, but it ultimately resulted in the creation of Kengram.
                  🚀
                </p>
                <p className="fs-5">
                  My learning experience through high school and college was not
                  the smoothest. I had great ambitions at each level and always
                  made plans, strategies and blueprints to achieve them. Quite
                  funnily though, I was never able to stick to even a single one
                  of those, and my performance was, at best, mediocre. 🥸
                </p>
                <p className="fs-5">
                  I came to realize that there was something fundamentally wrong
                  with the way I was doing things and discovered myself to be in
                  possession of the following deadly trio of bad habits:
                </p>
                <ol className="fs-5">
                  <li>
                    I was a perfectionist who wanted to understand everything
                    about what I was learning, in one go - the what, the why,
                    the how and the big picture 🤦‍♂️
                  </li>
                  <li>
                    The plans I made were incredibly hard to follow - they
                    mostly revolved around learning too much of complex subjects
                    like science and math, in too little time 🤦‍♂️
                  </li>
                  <li>I was a serial procrastinator 🤦‍♂️</li>
                </ol>
                <p className="fs-5">
                  Well, in formal instituitions, and in life, in general, nobody
                  waits for you. I could argue that I never got much out of
                  formal education. 🤷‍♂️
                </p>
                <p className="fs-5">
                  But luckily for me, it was the advent of the information age.
                  Online learning was booming and there was nothing you couldn't
                  find on YouTube or Google, or Udemy or edX. I owe most of what
                  I know today to these platforms. For the knowledge-thirsty,
                  the web is indeed a goldmine. 💛
                </p>
                <p className="fs-5">
                  You didn't think I would stop creating plans, did you? 🤓
                </p>
                <p className="fs-5">
                  But this time around, I followed a scientific approach. I was
                  intrigued by the fact that even though the average person
                  spends a quarter of their life in school and college, there
                  was no emphasis or definitive guide on{" "}
                  <span className="fst-italic">how to learn</span>. 🤯
                </p>
                <p className="fs-5">
                  Through a lot trial and error, a lot more failed plans, and
                  after gathering a ton of research on the science of learning,
                  from the enterprises of neuroscience and cognitive psychology,
                  I was able to finally figure out a system that worked. 🥳
                </p>
                <p className="fs-5">
                  In 2020, Kengram Edtech was formed, with a three-fold mission:
                </p>
                <ul className="fs-5">
                  <li>Spread awareness on the importance of learning</li>
                  <li>Help students learn more effectively</li>
                  <li>Make learning more enjoyable</li>
                </ul>
                <p className="fs-5">
                  Building upon the research we had in hand, and after
                  consulting with expert educators, we created{" "}
                  <span className="fst-italic">Mastery Learning</span>, a 3-day
                  workshop to help learners improve their ability. Over the
                  course of running the workshop for a few months, we had one
                  crucial finding. 👇
                </p>
                <p className="fs-5">
                  Although people found the methodology useful, and vowed
                  commitment to their learning goals set during the workshop,
                  most of them failed to stick to plan, lost motivation, and
                  gave up. 😕
                </p>
                <p className="fs-5">
                  It seemed liked mere words and motivation simply didn't cut
                  it. So, as an experiment, we decided to build an app that
                  would help these learners actually implement these principles
                  on a day-to-day basis. And we assigned ourselves their
                  accountability partners. 😎
                </p>
                <p className="fs-5">
                  The results? Surprisingly, they exceeded expectations. It
                  worked, and thus, the{" "}
                  <span className="fst-italic">Learning Assistant</span> was
                  born! 🤖
                </p>
                <p className="fs-5">
                  Today, we present to you the same{" "}
                  <span className="fst-italic">Learning Assistant</span>, albeit
                  improvized over a couple of versions, and with a lot more
                  features added, through the{" "}
                  <span className="fst-italic">Insiders Program</span>, where
                  we're giving away lifetime memberships for a year's fee! 🏆
                </p>
                <p className="fs-5">
                  We look forward to working closely with each one of you, to
                  ensure that all your academic ambitions are realized.
                </p>
                <p className="fs-5">Happy learning! 💜</p>
              </div>
            </Card.Body>
          </Card>
        </section>
        {/* Social handles */}
        <section>
          <Navbar className="mb-5">
            <Nav className="mx-auto">
              <Stack direction="horizontal" gap={4}>
                <Nav.Item>
                  <Nav.Link href="https://www.facebook.com/kengramlearning">
                    <IconContext.Provider
                      value={{
                        style: { verticalAlign: "top" },
                        className: "text-primary fs-1",
                      }}
                    >
                      <BsFacebook />
                    </IconContext.Provider>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="https://www.instagram.com/kengramlearning">
                    <IconContext.Provider
                      value={{
                        style: { verticalAlign: "top" },
                        className: "text-primary fs-1",
                      }}
                    >
                      <BsInstagram />
                    </IconContext.Provider>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="https://www.linkedin.com/company/kengram">
                    <IconContext.Provider
                      value={{
                        style: { verticalAlign: "top" },
                        className: "text-primary fs-1",
                      }}
                    >
                      <BsLinkedin />
                    </IconContext.Provider>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="https://www.twitter.com/kengramlearning">
                    <IconContext.Provider
                      value={{
                        style: { verticalAlign: "top" },
                        className: "text-primary fs-1",
                      }}
                    >
                      <BsTwitter />
                    </IconContext.Provider>
                  </Nav.Link>
                </Nav.Item>
              </Stack>
            </Nav>
          </Navbar>
        </section>

        <footer>
          <Navbar className="mb-5">
            <Nav className="mx-auto">
              <Nav.Item>
                <Nav.Link onClick={handleTermsShow}>Terms</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handlePrivacyShow}>Privacy</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleCancelShow}>Cancellations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleDisclaimerShow}>Disclaimer</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
          <p className="text-muted text-center mb-5 pb-5">
            © 2022 Kengram Edtech Private Limited. All rights reserved.
          </p>
        </footer>
      </div>
      <Navbar fixed="bottom" bg="primary" variant="dark">
        <Container>
          <Col className="text-center">
            <IconContext.Provider
              value={{
                style: { verticalAlign: "top" },
                className: "text-light headline-font p-2",
              }}
            >
              <a href="tel:+919895893111">
                <BsTelephone />
              </a>
            </IconContext.Provider>
          </Col>
          <Col className="text-center">
            <IconContext.Provider
              value={{
                style: { verticalAlign: "top" },
                className: "text-light headline-font p-2",
              }}
            >
              <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20know%20more%20about%20the%20Kengram%20Insiders%20Program,%20please!">
                <BsWhatsapp />
              </a>
            </IconContext.Provider>
          </Col>
        </Container>
      </Navbar>

      {/* Legal modals */}
      <Modal show={termsShow} onHide={handleTermsClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Terms and Conditions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Last updated: September 22, 2022</p>
          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h3>Definitions</h3>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul>
            <li>
              <p>
                <strong>Application</strong> means the software program provided
                by the Company downloaded by You on any electronic device, named
                Kengram Learning Assistant
              </p>
            </li>
            <li>
              <p>
                <strong>Affiliate</strong> means an entity that controls, is
                controlled by or is under common control with a party, where
                &quot;control&quot; means ownership of 50% or more of the
                shares, equity interest or other securities entitled to vote for
                election of directors or other managing authority.
              </p>
            </li>
            <li>
              <p>
                <strong>Country</strong> refers to: Kerala, India
              </p>
            </li>
            <li>
              <p>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Agreement) refers to Kengram Edtech Private Limited, 1st
                Floor, Building No. 18/344, Valaprakandiyil, Cheruputhur,
                Mongam, Malappuram - 673642.
              </p>
            </li>
            <li>
              <p>
                <strong>Device</strong> means any device that can access the
                Service such as a computer, a cellphone or a digital tablet.
              </p>
            </li>
            <li>
              <p>
                <strong>Service</strong> refers to the Application.
              </p>
            </li>
            <li>
              <p>
                <strong>Terms and Conditions</strong> (also referred as
                &quot;Terms&quot;) mean these Terms and Conditions that form the
                entire agreement between You and the Company regarding the use
                of the Service.
              </p>
            </li>
            <li>
              <p>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </p>
            </li>
          </ul>
          <h2>Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of the Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>
          <p>
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>
          <p>
            By accessing or using the Service You agree to be bound by these
            Terms and Conditions. If You disagree with any part of these Terms
            and Conditions then You may not access the Service.
          </p>
          <p>
            You represent that you are or over the age of 13. The Company does
            not permit those under 13 to use the Service.
          </p>
          <p>
            Your access to and use of the Service is also conditioned on Your
            acceptance of and compliance with the Privacy Policy of the Company.
            Our Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your personal information when You
            use the Application or the Website and tells You about Your privacy
            rights and how the law protects You. Please read Our Privacy Policy
            carefully before using Our Service.
          </p>
          <h2>Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </p>
          <p>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </p>
          <p>
            We strongly advise You to read the terms and conditions and privacy
            policies of any third-party web sites or services that You visit.
          </p>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend Your access immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if You breach these Terms and Conditions.
          </p>
          <p>
            Upon termination, Your right to use the Service will cease
            immediately.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            Notwithstanding any damages that You might incur, the entire
            liability of the Company and any of its suppliers under any
            provision of this Terms and Your exclusive remedy for all of the
            foregoing shall be limited to the amount actually paid by You
            through the Service or 100 USD if You haven't purchased anything
            through the Service.
          </p>
          <p>
            To the maximum extent permitted by applicable law, in no event shall
            the Company or its suppliers be liable for any special, incidental,
            indirect, or consequential damages whatsoever (including, but not
            limited to, damages for loss of profits, loss of data or other
            information, for business interruption, for personal injury, loss of
            privacy arising out of or in any way related to the use of or
            inability to use the Service, third-party software and/or
            third-party hardware used with the Service, or otherwise in
            connection with any provision of this Terms), even if the Company or
            any supplier has been advised of the possibility of such damages and
            even if the remedy fails of its essential purpose.
          </p>
          <p>
            Some states do not allow the exclusion of implied warranties or
            limitation of liability for incidental or consequential damages,
            which means that some of the above limitations may not apply. In
            these states, each party's liability will be limited to the greatest
            extent permitted by law.
          </p>
          <h2>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
          <p>
            The Service is provided to You &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; and with all faults and defects without warranty of
            any kind. To the maximum extent permitted under applicable law, the
            Company, on its own behalf and on behalf of its Affiliates and its
            and their respective licensors and service providers, expressly
            disclaims all warranties, whether express, implied, statutory or
            otherwise, with respect to the Service, including all implied
            warranties of merchantability, fitness for a particular purpose,
            title and non-infringement, and warranties that may arise out of
            course of dealing, course of performance, usage or trade practice.
            Without limitation to the foregoing, the Company provides no
            warranty or undertaking, and makes no representation of any kind
            that the Service will meet Your requirements, achieve any intended
            results, be compatible or work with any other software,
            applications, systems or services, operate without interruption,
            meet any performance or reliability standards or be error free or
            that any errors or defects can or will be corrected.
          </p>
          <p>
            Without limiting the foregoing, neither the Company nor any of the
            company's provider makes any representation or warranty of any kind,
            express or implied: (i) as to the operation or availability of the
            Service, or the information, content, and materials or products
            included thereon; (ii) that the Service will be uninterrupted or
            error-free; (iii) as to the accuracy, reliability, or currency of
            any information or content provided through the Service; or (iv)
            that the Service, its servers, the content, or e-mails sent from or
            on behalf of the Company are free of viruses, scripts, trojan
            horses, worms, malware, timebombs or other harmful components.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of certain types of
            warranties or limitations on applicable statutory rights of a
            consumer, so some or all of the above exclusions and limitations may
            not apply to You. But in such a case the exclusions and limitations
            set forth in this section shall be applied to the greatest extent
            enforceable under applicable law.
          </p>
          <h2>Governing Law</h2>
          <p>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </p>
          <h2>Disputes Resolution</h2>
          <p>
            If You have any concern or dispute about the Service, You agree to
            first try to resolve the dispute informally by contacting the
            Company.
          </p>
          <h2>For European Union (EU) Users</h2>
          <p>
            If You are a European Union consumer, you will benefit from any
            mandatory provisions of the law of the country in which you are
            resident in.
          </p>
          <h2>United States Legal Compliance</h2>
          <p>
            You represent and warrant that (i) You are not located in a country
            that is subject to the United States government embargo, or that has
            been designated by the United States government as a &quot;terrorist
            supporting&quot; country, and (ii) You are not listed on any United
            States government list of prohibited or restricted parties.
          </p>
          <h2>Severability and Waiver</h2>
          <h3>Severability</h3>
          <p>
            If any provision of these Terms is held to be unenforceable or
            invalid, such provision will be changed and interpreted to
            accomplish the objectives of such provision to the greatest extent
            possible under applicable law and the remaining provisions will
            continue in full force and effect.
          </p>
          <h3>Waiver</h3>
          <p>
            Except as provided herein, the failure to exercise a right or to
            require performance of an obligation under these Terms shall not
            effect a party's ability to exercise such right or require such
            performance at any time thereafter nor shall the waiver of a breach
            constitute a waiver of any subsequent breach.
          </p>
          <h2>Translation Interpretation</h2>
          <p>
            These Terms and Conditions may have been translated if We have made
            them available to You on our Service. You agree that the original
            English text shall prevail in the case of a dispute.
          </p>
          <h2>Changes to These Terms and Conditions</h2>
          <p>
            We reserve the right, at Our sole discretion, to modify or replace
            these Terms at any time. If a revision is material We will make
            reasonable efforts to provide at least 30 days' notice prior to any
            new terms taking effect. What constitutes a material change will be
            determined at Our sole discretion.
          </p>
          <p>
            By continuing to access or use Our Service after those revisions
            become effective, You agree to be bound by the revised terms. If You
            do not agree to the new terms, in whole or in part, please stop
            using the website and the Service.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, You can
            contact us at{" "}
            <a href="mailto:support@kengram.com">support@kengram.com</a>
          </p>
        </Modal.Body>
      </Modal>

      <Modal show={privacyShow} onHide={handlePrivacyClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Last updated: September 22, 2022</p>
          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>

          <p>
            Kengram Edtech Private Limited operates the https://www.kengram.com
            website, which hosts the Kengram Learning Assistant PWA, hereon
            referred to as the 'Service'.
          </p>

          <p>
            This page is used to inform website visitors regarding our policies
            with the collection, use, and disclosure of Personal Information if
            anyone decides to use our Service or the Kengram website.
          </p>

          <p>
            If you choose to use our Service, then you agree to the collection
            and use of information in relation with this policy. The Personal
            Information that we collect are used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy.
          </p>

          <p>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at
            https://www.kengram.com, unless otherwise defined in this Privacy
            Policy.
          </p>

          <h2>Information Collection and Use</h2>

          <p>
            For a better experience while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to your name, phone number, and email
            address. The information that we collect will be used to contact or
            identify you.
          </p>

          <h2>Log Data</h2>

          <p>
            We want to inform you that whenever you visit our Service, we
            collect information that your browser sends to us that is called Log
            Data. This Log Data may include information such as your computer’s
            Internet Protocol ("IP") address, browser version, pages of our
            Service that you visit, the time and date of your visit, the time
            spent on those pages, and other statistics.
          </p>

          <h2>Cookies</h2>

          <p>
            Cookies are files with small amount of data that is commonly used as
            an anonymous unique identifier. These are sent to your browser from
            the website that you visit and are stored on your system hard drive.
          </p>

          <p>
            Our website may use these "cookies" to collection information and to
            improve our Service. If it does, you will be notified and you have
            the option to either accept or refuse these cookies, and know when a
            cookie is being sent to your computer. If you choose to refuse our
            cookies, you may not be able to use some portions of our Service.
          </p>

          <h2>Service Providers</h2>

          <p>
            We may employ third-party companies and individuals due to the
            following reasons:
          </p>

          <ul>
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
          </ul>

          <p>
            We want to inform our Service users that these third parties have
            access to your Personal Information. The reason is to perform the
            tasks assigned to them on our behalf. However, they are obligated
            not to disclose or use the information for any other purpose.
          </p>

          <h2>Security</h2>

          <p>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </p>

          <h2>Links to Other Sites</h2>

          <p>
            Our Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over, and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>

          <p>Children's Privacy</p>

          <p>
            Our Services do not address anyone under the age of 13. We do not
            knowingly collect personal identifiable information from children
            under 13. In the case we discover that a child under 13 has provided
            us with personal information, we immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we will be able to do necessary actions.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at{" "}
            <a href="mailto:support@kengram.com">support@kengram.com</a>
          </p>
        </Modal.Body>
      </Modal>

      <Modal show={cancelShow} onHide={handleCancelClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Cancellation & Refund Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Last updated: September 22, 2022</p>
          <p>Thank you for joining the Kengram Insiders Program.</p>
          <p>
            If, for any reason, You are not completely satisfied with a purchase
            We invite You to review our policy on cancellations and refunds.
          </p>
          <p>
            The following terms are applicable for any products that You
            purchased with Us.
          </p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h3>Definitions</h3>
          <p>For the purposes of this Return and Refund Policy:</p>
          <ul>
            <li>
              <p>
                <strong>Application</strong> means the software program provided
                by the Company downloaded by You on any electronic device, named
                Kengram Learning Assistant
              </p>
            </li>
            <li>
              <p>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Agreement) refers to Kengram Edtech Private Limited, 1st
                Floor, Building No. 18/344, Valaprakandiyil, Cheruputhur,
                Mongam, Malappuram - 673642.
              </p>
            </li>
            <li>
              <p>
                <strong>Orders</strong> mean a request by You to purchase Goods
                from Us.
              </p>
            </li>
            <li>
              <p>
                <strong>Service</strong> refers to the Application.
              </p>
            </li>
            <li>
              <p>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </p>
            </li>
          </ul>
          <h2>Your Order Cancellation Rights</h2>
          <p>
            You are entitled to cancel Your Order within 30 days without giving
            any reason for doing so.
          </p>
          <p>
            The deadline for cancelling an Order is 30 days from the date of
            Order.
          </p>
          <p className="fw-bold">
            In order to exercise Your right of cancellation, You must inform Us
            of your decision by means of a clear statement. You can inform us of
            your decision at{" "}
            <a href="mailto:support@kengram.com">support@kengram.com</a> or
            through WhatsApp by clicking{" "}
            <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20request%20a%20refund,%20please!">
              here.
            </a>
          </p>
          <p>
            We will reimburse You no later than 14 days from the day on which We
            receive the refund request. We will use the same means of payment as
            You used for the Order, and You will not incur any fees for such
            reimbursement.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cancellations and Refunds
            Policy, please contact us at{" "}
            <a href="mailto:support@kengram.com">support@kengram.com</a>
          </p>
        </Modal.Body>
      </Modal>

      <Modal show={disclaimerShow} onHide={handleDisclaimerClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-1">
            Legal Disclaimer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Last updated: September 22, 2022</p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h3>Definitions</h3>
          <p>For the purposes of this Disclaimer:</p>
          <ul>
            <li>
              <p>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Disclaimer) refers to Kengram Edtech Private Limited,
                1st Floor, Building No. 18/344, Valaprakandiyil, Cheruputhur,
                Mongam, Malappuram - 673642.
              </p>
            </li>
            <li>
              <p>
                <strong>Service</strong> refers to the Application.
              </p>
            </li>
            <li>
              <p>
                <strong>You</strong> means the individual accessing the Service,
                or the company, or other legal entity on behalf of which such
                individual is accessing or using the Service, as applicable.
              </p>
            </li>
            <li>
              <p>
                <strong>Application</strong> means the software program provided
                by the Company downloaded by You on any electronic device named
                Kengram Learning Assistant.
              </p>
            </li>
          </ul>
          <h2>Disclaimer</h2>
          <p>
            The information contained on the Service is for general information
            purposes only.
          </p>
          <p>
            The Company assumes no responsibility for errors or omissions in the
            contents of the Service.
          </p>
          <p>
            In no event shall the Company be liable for any special, direct,
            indirect, consequential, or incidental damages or any damages
            whatsoever, whether in an action of contract, negligence or other
            tort, arising out of or in connection with the use of the Service or
            the contents of the Service. The Company reserves the right to make
            additions, deletions, or modifications to the contents on the
            Service at any time without prior notice.
          </p>
          <p>
            The Company does not warrant that the Service is free of viruses or
            other harmful components.
          </p>
          <h2>External Links Disclaimer</h2>
          <p>
            The Service may contain links to external websites that are not
            provided or maintained by or in any way affiliated with the Company.
          </p>
          <p>
            Please note that the Company does not guarantee the accuracy,
            relevance, timeliness, or completeness of any information on these
            external websites.
          </p>
          <h2>Errors and Omissions Disclaimer</h2>
          <p>
            The information given by the Service is for general guidance on
            matters of interest only. Even if the Company takes every precaution
            to insure that the content of the Service is both current and
            accurate, errors can occur. Plus, given the changing nature of laws,
            rules and regulations, there may be delays, omissions or
            inaccuracies in the information contained on the Service.
          </p>
          <p>
            The Company is not responsible for any errors or omissions, or for
            the results obtained from the use of this information.
          </p>
          <h2>Fair Use Disclaimer</h2>
          <p>
            The Company may use copyrighted material which has not always been
            specifically authorized by the copyright owner. The Company is
            making such material available for criticism, comment, news
            reporting, teaching, scholarship, or research.
          </p>
          <p>
            The Company believes this constitutes a &quot;fair use&quot; of any
            such copyrighted material as provided for in section 107 of the
            United States Copyright law.
          </p>
          <p>
            If You wish to use copyrighted material from the Service for your
            own purposes that go beyond fair use, You must obtain permission
            from the copyright owner.
          </p>
          <h2>Views Expressed Disclaimer</h2>
          <p>
            The Service may contain views and opinions which are those of the
            authors and do not necessarily reflect the official policy or
            position of any other author, agency, organization, employer or
            company, including the Company.
          </p>
          <p>
            Comments published by users are their sole responsibility and the
            users will take full responsibility, liability and blame for any
            libel or litigation that results from something written in or as a
            direct result of something written in a comment. The Company is not
            liable for any comment published by users and reserves the right to
            delete any comment for any reason whatsoever.
          </p>
          <h2>No Responsibility Disclaimer</h2>
          <p>
            The information on the Service is provided with the understanding
            that the Company is not herein engaged in rendering legal,
            accounting, tax, or other professional advice and services. As such,
            it should not be used as a substitute for consultation with
            professional accounting, tax, legal or other competent advisers.
          </p>
          <p>
            In no event shall the Company or its suppliers be liable for any
            special, incidental, indirect, or consequential damages whatsoever
            arising out of or in connection with your access or use or inability
            to access or use the Service.
          </p>
          <h2>&quot;Use at Your Own Risk&quot; Disclaimer</h2>
          <p>
            All information in the Service is provided &quot;as is&quot;, with
            no guarantee of completeness, accuracy, timeliness or of the results
            obtained from the use of this information, and without warranty of
            any kind, express or implied, including, but not limited to
            warranties of performance, merchantability and fitness for a
            particular purpose.
          </p>
          <p>
            The Company will not be liable to You or anyone else for any
            decision made or action taken in reliance on the information given
            by the Service or for any consequential, special or similar damages,
            even if advised of the possibility of such damages.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, You can contact Us
            at <a href="mailto:support@kengram.com">support@kengram.com</a>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandingView;
