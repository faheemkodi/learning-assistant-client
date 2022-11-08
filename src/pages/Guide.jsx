import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import {
  BsBookFill,
  BsCheckSquareFill,
  BsInfoCircleFill,
  BsLightbulbFill,
  BsPlayCircleFill,
  BsStopCircleFill,
  BsToggleOn,
  BsWhatsapp,
} from "react-icons/bs";
import { GiMeditation } from "react-icons/gi";
import AppContainer from "../components/AppContainer";

const GuideView = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return (
    <AppContainer>
      <h1 className="text-center text-uppercase mb-5">
        <Badge>User Guide</Badge>
      </h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>
              <Badge className="number">0</Badge> Introduction
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>Welcome, and thanks for choosing to learn with Kengram! </p>
            <p>
              We're on a mission to help you master the art and science of
              learning. Needless to say, the ability to learn efficiently is one
              of the most coveted skills of the 21st century. Based on the
              latest evidence-based research on human learning, from the
              enterprises of neuroscience and cognitive psychology, we've put
              together Kengram, an easy-to-use{" "}
              <span className="text-secondary">learning assistant</span>{" "}
              application that allows you to:
            </p>
            <ul className="text-secondary">
              <li>Organize, track and achieve your academic goals</li>
              <li>Boost your learning ability</li>
              <li>Cultivate a daily learning habit</li>
            </ul>
            <p>
              First and foremost, Kengram being a web application, requires an
              active Internet connection for proper functionality. In the
              following sections is a comprehensive usage guide, illustrating
              each step of the learner experience, in order.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>
              <Badge className="number">1</Badge> Adding courses, lessons and
              topics
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Kengram helps you organize, track and analyze your learning
              journey. As a first step, you'll need to add courses you're taking
              to the app. A <span className="text-secondary">Course</span> on
              Kengram further consists of{" "}
              <span className="text-secondary">Lessons</span> and{" "}
              <span className="text-secondary">Topics</span>.
            </p>
            <p>
              Adding lessons and topics for each course you're taking may seem
              like a daunting task. But rest assured, the activity triggers
              powerful mental processes at the subconscious level, resulting in
              the development of a much required{" "}
              <span className="text-secondary">bigger picture</span> in your
              mind, of the knowledge you're trying to acquire. To understand
              this better, imagine trying to solve a jigsaw puzzle, without
              first having looked at the complete image. It's nearly impossible!
            </p>
            <h6 className="text-primary fw-bold">Adding a course</h6>
            <p>
              You can add a <span className="text-secondary">Course</span> by
              clicking the <span className="text-secondary">Add Course</span>{" "}
              button from the <Link to="/dashboard">Dashboard</Link>. While
              adding a <span className="text-secondary">Course</span>, you'll
              need to provide 4 pieces of information:
            </p>
            <ol>
              <li>
                <span className="text-secondary">Name</span>: What's the name of
                your course?
              </li>
              <li>
                <span className="text-secondary">Hours/Week</span>: How many
                hours do you intend to spend learning this course every week?
              </li>
              <li>
                <span className="text-secondary">Intensity</span>: How hard is
                this course for you? Intensity determines the revision algorithm
                for the course. It takes 3 values -{" "}
                <span className="text-danger">High</span>,{" "}
                <span className="text-primary">Normal</span>, and{" "}
                <span className="text-success">Low</span>. Set the intensity to{" "}
                <span className="text-danger">High</span> for tough courses that
                need a rigorous revision regimen.
              </li>
              <li>
                <span className="text-secondary">Deadline</span>: By when do you
                intend to complete{" "}
                <span className="text-secondary">one round of study</span> of
                the entire course, including all lessons and topics? If you're
                planning to crack an exam, it is recommended to set this date
                well in advance, to allow enough time for revision, because for
                true mastery learning, one round simply doesn't cut it.
              </li>
            </ol>
            <h6 className="text-primary fw-bold">Adding lessons and topics</h6>
            <p>
              You can add <span className="text-secondary">Lessons</span> from
              the <span className="text-secondary">Course</span> page, and{" "}
              <span className="text-secondary">Topics</span> from the{" "}
              <span className="text-secondary">Lesson</span> page, and for both,
              you have to fill in just one detail - the name.
            </p>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>
                While naming Lessons and Topics, you may choose to prefix a
                numerical identifier, if you'd like. For example, your Lesson
                could be <span className="fw-bold">1. Thermodynamics</span>, and
                your Topic could be{" "}
                <span className="fw-bold">
                  1.1. First Law of Thermodynamics
                </span>
                .
              </p>
            </Alert>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h5>
              <Badge className="number">2</Badge> Starting a burst
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Once you add a <span className="text-secondary">Topic</span>,
              you'll notice a button like this{" "}
              <Badge className="text-uppercase fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "bottom" },
                    className: "learn-icon",
                  }}
                >
                  <BsBookFill />
                </IconContext.Provider>
              </Badge>{" "}
              pop up on the <span className="text-secondary">Lesson</span> page.
              Clicking on it will take you to the{" "}
              <span className="text-secondary">Learn</span> screen, where you'll
              be able to start a learning session for that particular{" "}
              <span className="text-secondary">Lesson</span>. We call these
              learning sessions <span className="text-secondary">Bursts</span>.
            </p>
            <p>
              A <span className="text-secondary">Burst</span>, or learning
              session, is a period of 25 minutes during which you'll be
              intensely focussed on learning, and nothing else. No wandering
              thoughts, no digital devices, no interactions with people or pets
              - just pure, laser-sharp focus on whatever you're studying. Press
              the{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-primary fs-5",
                }}
              >
                <BsPlayCircleFill />
              </IconContext.Provider>{" "}
              button to start a <span className="text-secondary">Burst</span>,
              and{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-primary fs-5",
                }}
              >
                <BsStopCircleFill />
              </IconContext.Provider>{" "}
              to end it.
            </p>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>
                Think of a <span className="fw-bold">Burst</span> as a{" "}
                <span className="fw-bold">meditative learning session</span>.
                Focus your entire attention to the study material for the entire
                25 minutes, after which you'll be notified. If you absolutely
                must stop a session midway, press the{" "}
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                    className: "fs-5",
                  }}
                >
                  <BsStopCircleFill />
                </IconContext.Provider>{" "}
                button. Initially, it's natural for your mind to wander off
                during
                <span className="fw-bold">Bursts</span>, and that's totally
                normal. You'll notice that with continuous and consistent
                learning, your focusing and learning ability dramatically
                improves!
              </p>
            </Alert>
            <p>
              On clicking the{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-primary fs-5",
                }}
              >
                <BsPlayCircleFill />
              </IconContext.Provider>{" "}
              button, the timer starts running, and your learning session or{" "}
              <span className="text-secondary">Burst</span> begins.
            </p>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>
                If, at any point during a <span className="fw-bold">Burst</span>
                , you feel tired, distracted or if you find difficulty focussing
                to the end of 25 minutes, put on your headphones and press the
                meditation button{" "}
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                    className: "fs-5",
                  }}
                >
                  <GiMeditation />
                </IconContext.Provider>
                . You'll notice a strange buzzing soundtrack playing in the
                background. This is a{" "}
                <span className="fw-bold">40 Hz Binaural Beat</span>, proven to
                increase alertness in the brain.{" "}
                <span className="fw-bold">
                  Binaural Beats must be listened to using headphones, at a
                  low-medium, non-distracting volume
                </span>{" "}
                . Once you feel energized enough, you can turn it off by
                pressing the{" "}
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                    className: "fs-5",
                  }}
                >
                  <GiMeditation />
                </IconContext.Provider>{" "}
                button again. Then, you can go back to learning, feeling
                refreshed! Or if the <span className="fw-bold">Burst</span> has
                ended, you can come back for the next one!
                <br />
                <span className="fw-bold">
                  Make sure to take at least a 5-minute break between two
                  bursts. This is important for your brain to function properly!
                </span>
              </p>
            </Alert>
            <p>
              When the <span className="text-secondary">Burst</span> has ended,
              or when you press{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "top" },
                  className: "text-primary fs-5",
                }}
              >
                <BsStopCircleFill />
              </IconContext.Provider>{" "}
              , you'll be prompted with a question, asking if your{" "}
              <span className="text-secondary">Burst</span> was interrupted.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <h5>
              <Badge className="number">3</Badge> Recording an interruption
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Your <span className="text-secondary">Burst</span> could've been
              interrupted due to a variety of reasons, or if you're lucky
              enough, it could've not been interrupted at all.
            </p>
            <p>
              Either way, the onus is on you to honestly record your
              interruptions. When prompted with the question, toggle the{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "text-primary fs-5",
                }}
              >
                <BsToggleOn />
              </IconContext.Provider>{" "}
              to indicate that your{" "}
              <span className="text-secondary">Burst</span> was interrupted.
              Interruptions fall into 3 categories, namely{" "}
              <span className="text-secondary">Self</span>,{" "}
              <span className="text-secondary">Digital</span>, and{" "}
              <span className="text-secondary">People</span>. Choose yours, and
              move forward.
            </p>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>Common interruptions, categorized:</p>
              <ul>
                <li>
                  <span className="fw-bold">Self</span>: Thoughts wandering,
                  feeling unmotivated, tendencies to do something easier than
                  learning
                </li>
                <li>
                  <span className="fw-bold">Digital</span>: Phone calls,
                  messages, social media notifications
                </li>
                <li>
                  <span className="fw-bold">People</span>: Friends, family or
                  pets that come over to interrupt your session
                </li>
              </ul>
            </Alert>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <h5>
              <Badge className="number">4</Badge> Completing and revising topics
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              The next step is to mark the outcome of your{" "}
              <span className="text-secondary">Burst</span>. When you're
              learning a <span className="text-secondary">Lesson</span>, your
              primary goal would be to master the{" "}
              <span className="text-secondary">Topics</span> of that{" "}
              <span className="text-secondary">Lesson</span>. First, you'll have
              to <span className="text-secondary">complete</span> learning a
              certain <span className="text-secondary">Topic</span>, and then,
              in order to truly master it, you'll have to{" "}
              <span className="text-secondary">revise</span> it periodically.
            </p>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>
                Kengram keeps track of Topics you've{" "}
                <span className="fw-bold">completed</span>, and tells you when
                to <span className="fw-bold">revise</span>. Remember you set{" "}
                <span className="fw-bold">intensity</span> while creating a
                Course? Intensity determines how often you'll need to revise.
              </p>
            </Alert>
            <p>
              After recording an interruption, you'll be presented with a list
              of <span className="text-secondary">Topics</span>, where you can
              mark each <span className="text-secondary">complete</span> or{" "}
              <span className="text-secondary">revised</span>.
            </p>
            <Alert variant="warning">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsInfoCircleFill />
                </IconContext.Provider>{" "}
                Attention:
              </h6>
              <p>
                In order to mark a Topic{" "}
                <span className="fw-bold">complete</span> or{" "}
                <span className="fw-bold">revised</span>, you've to first select
                it, by toggling the{" "}
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                    className: "fs-5",
                  }}
                >
                  <BsToggleOn />
                </IconContext.Provider>
                . Once you select a <span className="fw-bold">Topic</span>, a
                screen will pop up, where you can add or modify notes for that
                particular <span className="fw-bold">Topic</span>. Once you're
                done, click on the{" "}
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "middle" },
                  }}
                >
                  <BsCheckSquareFill /> to confirm your action. You've to follow
                  this sequence for each Topic, exclusively.
                </IconContext.Provider>
              </p>
            </Alert>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>
                You can also add notes for{" "}
                <span className="fw-bold">Lessons</span> and{" "}
                <span className="fw-bold">Courses</span> by clicking on their
                respective names from the respective pages. You can also add
                personal notes, for example, your learning goals or objectives
                by clicking on your name from the Dashboard. We lovingly call
                these notes <span className="fw-bold">kengrams</span>, meaning{" "}
                <span className="fw-bold">bits of knowledge</span>.
              </p>
            </Alert>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <h5>
              <Badge className="number">5</Badge> Understanding key metrics
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              You'd have noticed a plethora of key metrics on each screen. Let's
              get to know what each of them mean.
            </p>
            <h6 className="fw-bold text-primary">Overall</h6>
            <ol>
              <li>
                <span className="text-secondary">Level</span>: Indicates your
                level, based on the number of{" "}
                <span className="text-secondary">Courses</span> you're taking,
                and the total hours you've spent learning.
              </li>
              <li>
                <span className="text-secondary">Strength</span>: Indicates the
                total number of hours you've spent learning your{" "}
                <span className="text-secondary">Courses</span>.
              </li>
              <li>
                <span className="text-secondary">Goal</span>: Indicates how much
                of your cumulative weekly learning goal, for all{" "}
                <span className="text-secondary">Courses</span> combined, has
                been achieved so far.
              </li>
              <li>
                <span className="text-secondary">Progress</span>: Indicates how
                far along you are, toward completing each of your{" "}
                <span className="text-secondary">Courses</span>, combined.
              </li>
            </ol>
            <h6 className="fw-bold text-primary">Course</h6>
            <ol>
              <li>
                <span className="text-secondary">Current Velocity</span>:
                Indicates your <span className="fw-bold">current</span> rate of
                progress per week.
              </li>
              <li>
                <span className="text-secondary">Required Velocity</span>:
                Indicates the rate of progress you{" "}
                <span className="fw-bold">need</span> to make per week, in order
                to complete the <span className="text-secondary">Course</span>{" "}
                by deadline.
              </li>
              <li>
                <span className="text-secondary">Streak</span>: Indicates the
                number of consecutive days you've been learning a particular{" "}
                <span className="text-secondary">Course</span>.
              </li>
              <li>
                <span className="text-secondary">Strength</span>: Indicates the
                number of hours you've been learning a particular{" "}
                <span className="text-secondary">Course</span>.
              </li>
              <li>
                <span className="text-secondary">Goal</span>: Indicates how much
                of your weekly learning goal you've achieved so far, for a
                particular <span className="text-secondary">Course</span>.
                Learning time remaining and days left in the week are also
                indicated.
              </li>
              <li>
                <span className="text-secondary">Progress</span>: Indicates how
                far along you are toward completing a particular{" "}
                <span className="text-secondary">Course</span>.
              </li>
              <li>
                <span className="text-secondary">Stability</span>: Indicates how
                punctually you've revised the{" "}
                <span className="text-secondary">Topics</span> of a particular{" "}
                <span className="text-secondary">Course</span>.
              </li>
              <li>
                <span className="text-secondary">Intensity</span>: Indicates how
                often a particular{" "}
                <span className="text-secondary">Course</span> should be
                revised.
              </li>
              <li>
                <span className="text-secondary">Deadline</span>: Indicates the
                date by which all <span className="text-secondary">Topics</span>{" "}
                of a particular <span className="text-secondary">Course</span>{" "}
                should be completed.
              </li>
            </ol>
            <h6 className="fw-bold text-primary">Lesson</h6>
            <ol>
              <li>
                <span className="text-secondary">Progress</span>: Indicates how
                far along you are toward completing a particular{" "}
                <span className="text-secondary">Lesson</span>.
              </li>
              <li>
                <span className="text-secondary">Stability</span>: Indicates how
                punctually you've revised the{" "}
                <span className="text-secondary">Topics</span> of a particular{" "}
                <span className="text-secondary">Lesson</span>.
              </li>
            </ol>
            <h6 className="fw-bold text-primary">Topic</h6>
            <ol>
              <li>
                <span className="text-secondary">Stability</span>: Indicates how
                punctually you've revised a particular{" "}
                <span className="text-secondary">Topic</span>.
              </li>
              <li>
                <span className="text-secondary">Revision Due</span>: Indicates
                if revision is due for a completed{" "}
                <span className="text-secondary">Topic</span>.
              </li>
              <li>
                <span className="text-secondary">Revision Date</span>: Indicates
                the date on which a particular{" "}
                <span className="text-secondary">Topic</span> should be revised.
              </li>
            </ol>
            <Alert variant="info">
              <h6 className="fw-bold">
                <IconContext.Provider
                  value={{
                    style: { verticalAlign: "top" },
                  }}
                >
                  <BsLightbulbFill />
                </IconContext.Provider>{" "}
                Pro Tip:
              </h6>
              <p>Kengram metrics change color. Watch out for them!</p>
              <ul>
                <li>
                  <span className="text-success">Green</span> indicates ideal
                  numbers
                </li>
                <li>
                  <span className="text-primary">Purple</span> indicates things
                  are good, but could be better
                </li>
                <li>
                  <span className="text-warning">Yellow</span> indicates low
                  numbers - work hard to improve these
                </li>
                <li>
                  <span className="text-danger">Red</span> indicates dangerously
                  low numbers that need your immediate attention
                </li>
              </ul>
            </Alert>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <h5>
              <Badge className="number">6</Badge> Connecting with a mentor
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Periodically, our mentors will reach out to you, to ensure your
              quest for knowledge is going well! Besides that, at any point, if
              you face any kind of trouble, either with the app, or with
              learning in general, you're most welcome to connect. In fact,{" "}
              <span className="fw-bold">we'd love to talk!</span>
            </p>
            <p>
              No forms, no mails, no waiting. Just click the button below to
              connect.
            </p>
            <h1 className="text-center">
              <a href="https://wa.me/919895893111?text=Hey,%20I'd%20like%20to%20have%20a%20quick%20chat%20with%20a%20mentor,%20please!">
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
            </h1>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </AppContainer>
  );
};

export default GuideView;
