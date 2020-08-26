import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../assets/logo.svg";
import styled from 'styled-components';
import {Link} from "react-router-dom";

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
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
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
		        <Nav  variant="pills" defaultActiveKey="1" className="ml-auto">
	            <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
		          <Nav.Link eventKey="2" as={Link} to="Help">Help</Nav.Link>
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
		        InvoiceBook
		      </Navbar.Brand>
			    <Navbar.Text>
			      Connecté en tant que : <span id="AfficheUserName" ></span>
			    </Navbar.Text>
		      <Navbar.Toggle aria-controls="basic-navbar-nav" />
		      <Navbar.Collapse id="basic-navbar-nav">
				    <Nav variant="pills" defaultActiveKey="1" className="ml-auto">
					    <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
					    <Nav.Link eventKey="2" as={Link} to="Help">Help</Nav.Link>
				      <NavDropdown title="Menu" id="collasible-nav-dropdown">
				        <NavDropdown.Item eventKey="3.1" as={Link} to="AjoutFacture">Ajouter une nouvelle Facture</NavDropdown.Item>
				        <NavDropdown.Item eventKey="3.2" as={Link} to="RechercheFacture">Recherche d'une facture</NavDropdown.Item>
					      <NavDropdown.Divider />
			          <NavDropdown.Item eventKey="3.3" as={Link} to="Clients">Clients</NavDropdown.Item>
				        <NavDropdown.Item eventKey="3.4" as={Link} to="Fournisseurs">Fournisseurs</NavDropdown.Item>
					      <NavDropdown.Divider />
					      <NavDropdown.Item eventKey="3.5" as={Link} to="Resume">Résumé de la période</NavDropdown.Item>
				      </NavDropdown>
				      <Nav.Link eventKey="4" as={Link} to="Profil">Profil</Nav.Link>
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