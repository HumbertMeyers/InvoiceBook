import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../../assets/logo.svg";


function Header (props) {
	const loggedOut = (
		<>
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
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		    <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="mr-auto">
				    <Nav.Link href="/">Home</Nav.Link>
				    <Nav.Link href="/Help">Help</Nav.Link>
			      <Nav.Link href="/Connexion">Connexion</Nav.Link>
			      <Nav.Link href="/Inscription">Inscription</Nav.Link>
			    </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		</>
	)

	const loggedIn = (
		<>
		  <Navbar bg="dark" variant="dark" expand="lg">
		    <Navbar.Brand href="/home">
		      <img
		        alt=""
		        src={logo}
		        width="30"
		        height="30"
		        className="d-inline-block align-top"
		      />{' '}
		      InvoiceBook
		    </Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		    <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="mr-auto">
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
			      <Nav.Link href="/Deconnexion">Déconnexion</Nav.Link>
			    </Nav>
		    </Navbar.Collapse>
			  <Navbar.Brand>
				  <Navbar.Toggle />
				  <Navbar.Collapse className="justify-content-end">
				    <Navbar.Text>
				      Connecté en tant que : <span id="AfficheUserName" >Humbert</span>
				    </Navbar.Text>
				  </Navbar.Collapse>
			  </Navbar.Brand>
		  </Navbar>
		</>
	)

	return <div>{props.signed_in ? loggedIn : loggedOut}</div>;
}

export default Header;

Header.propTypes = {
  signed_in: PropTypes.bool.isRequired,
  display_popUp: PropTypes.func.isRequired,
};