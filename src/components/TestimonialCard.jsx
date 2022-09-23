import Container from "react-bootstrap/Container";
const TestimonialCard = ({ name, details, review }) => {
  return (
    <Container className="mb-5 testimonial-card p-2">
      <h2 className="text-center text-secondary">{name}</h2>
      <h5 className="text-center text-muted mb-5">{details}</h5>
      <div className="mx-auto">
        <blockquote className="text-center text-dark number blockquote">
          {review}
        </blockquote>
      </div>
    </Container>
  );
};

export default TestimonialCard;
