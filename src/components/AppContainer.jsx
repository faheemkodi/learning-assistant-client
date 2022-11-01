import Container from "react-bootstrap/Container";

import NavBar from "./NavBar";

const AppContainer = ({ children }) => {
  return (
    <>
      <Container fluid className="pt-4 pb-2 fixed-navbar">
        <NavBar />
      </Container>
      <Container fluid className="pb-4 children">
        {children}
      </Container>
    </>
  );
};

export default AppContainer;
