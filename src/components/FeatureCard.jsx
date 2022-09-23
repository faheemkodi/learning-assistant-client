import Card from "react-bootstrap/Card";

const FeatureCard = ({ icon, feature, problem, benefit }) => {
  return (
    <Card border="light" className="mb-5 p-2 feature-card">
      <Card.Body>
        {icon}
        <Card.Title className="mt-2 fw-bold text-dark">{feature}</Card.Title>
        <Card.Subtitle className="my-2 text-muted">{problem}</Card.Subtitle>
        <Card.Text className="text-dark">{benefit}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeatureCard;
