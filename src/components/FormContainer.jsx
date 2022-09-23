import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="align-items-center viewport-height justify-content-md-center">
        <Col xs={12} lg={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
