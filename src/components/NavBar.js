import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

function NavBar( {setLoggedIn, setLoggedInUser} ) {  
  
    const history = useHistory();

    function logout(){
        setLoggedIn(false);
        setLoggedInUser("");
        history.push("../");
    } 
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Carpool Cool Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavDropdown title="Pooling" id="collasible-nav-dropdown">
                <LinkContainer to="/create_pool">
                  <NavDropdown.Item>Create a Pool</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/display_find_carpool_form">
                  <NavDropdown.Item>Find a Pool</NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>

            <NavDropdown title="My Info" id="collasible-nav-dropdown">
                <LinkContainer to="/my_profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/show_carpools">
                  <NavDropdown.Item>My Carpools</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/transaction_history">
                  <NavDropdown.Item>Transaction History</NavDropdown.Item>
                </LinkContainer>

            </NavDropdown>

            <Nav.Link onClick={logout}>
              Logout
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default NavBar;