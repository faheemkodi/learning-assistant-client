import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const TestimonialCard = ({ name, avatar, details, review }) => {
  return (
    <Row className="justify-content-center mx-auto">
      <Col xs={12} lg={9}>
        <Card bg="light" border="light" text="dark" className="mb-5">
          <Card.Body>
            <Row className="testimonial-card">
              <p className="text-start text-dark">{review}</p>
            </Row>
            <Row className="justify-content-center align-items-end">
              <Col xs={2} className="text-start">
                <Image
                  roundedCircle
                  src={avatar}
                  alt={name}
                  className="testimonial-avatar"
                />
              </Col>
              <Col xs={10} className="text-dark text-end">
                <span className="testimonial-name fw-bold">{name}</span>
                <br />
                <span className="testimonial-detail">{details}</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TestimonialCard;
