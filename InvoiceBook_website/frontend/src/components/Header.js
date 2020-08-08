import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../assets/logo.svg";
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link, .navbar-nav .nav-item, .navbar-text  {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
	.dropdown-menu .dropdown-item{
    color: #222;
  }
  .dropdown-item:hover {
    background-color: #888;
    color: #eee;
  }
`;


function Header (props) {
	const loggedOut = (
		<>
			<Styles>
		    <Navbar bg="dark" variant="dark" expand="lg">
		      <Navbar.Brand href="/">
			      <img
			        alt=""
			        src={logo}
			        width="30"
			        height="30"
			        className="d-inline-block align-top"
			      />{' '}
		      InvoiceBook</Navbar.Brand>
			    <Navbar.Text>
			      <span id="AfficheUserName" ></span>
			    </Navbar.Text>
		      <Navbar.Toggle aria-controls="basic-navbar-nav" />
		      <Navbar.Collapse id="basic-navbar-nav">
		        <Nav className="ml-auto">
	            <Nav.Link href="/">Home</Nav.Link>
		          <Nav.Link href="/Help">Help</Nav.Link>
	            <Nav.Link id="Connexion">
					      <span onClick={() => props.display_popUp("Connexion")}>Connexion</span>
				      </Nav.Link>
			        <Nav.Link id="Inscription">
					      <span onClick={() => props.display_popUp("Inscription")}>Inscription</span>
				      </Nav.Link>
		        </Nav>
		      </Navbar.Collapse>
		    </Navbar>
		  </Styles >
		</>
	)

	const loggedIn = (
		<>
		  <Styles>
		    <Navbar bg="dark" variant="dark" expand="lg">
		      <Navbar.Brand href="/">
			      <img
			        alt=""
			        src={logo}
			        width="30"
			        height="30"
			        className="d-inline-block align-top"
			      />{' '}
		      InvoiceBook</Navbar.Brand>
			    <Navbar.Text>
			      Connecté en tant que : <span id="AfficheUserName" ></span>
			    </Navbar.Text>
		      <Navbar.Toggle aria-controls="basic-navbar-nav" />
		      <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="ml-auto">
					    <Nav.Link href="/">Home</Nav.Link>
					    <Nav.Link href="/Help">Help</Nav.Link>
				      <NavDropdown title="Menu" id="collasible-nav-dropdown">
				        <NavDropdown.Item href="/AjoutFacture">Ajouter une nouvelle Facture</NavDropdown.Item>
				        <NavDropdown.Item href="/RechercheFacture">Recherche d'une facture</NavDropdown.Item>
					      <NavDropdown.Divider />
			          <NavDropdown.Item href="/Clients">Clients</NavDropdown.Item>
				        <NavDropdown.Item href="/Fournisseurs">Fournisseurs</NavDropdown.Item>
					      <NavDropdown.Divider />
					      <NavDropdown.Item href="/Resume">Résumé de la période</NavDropdown.Item>
				      </NavDropdown>
				      <Nav.Link href="/Profil">Profil</Nav.Link>
				      <Nav.Link id="Deconnexion">
					      <span onClick={() => props.display_popUp("Deconnexion")}>Déconnexion</span>
				      </Nav.Link>
				    </Nav>
			    </Navbar.Collapse>
			  </Navbar>
		  </Styles>
		</>
	)

	return <div>{props.logged_in ? loggedIn : loggedOut}</div>;
}

export default Header;

Header.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_popUp: PropTypes.func.isRequired,
};