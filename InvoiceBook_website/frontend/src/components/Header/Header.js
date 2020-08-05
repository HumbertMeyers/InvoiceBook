import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";


import logo from "../../assets/invoice-book-logo.png";
import "./Header.css";

function Header(props){
	const loggedOut_header =(
		<Router>
			<Navbar expand="lg">
				<Navbar.Brand>
					<NavLink to="/">
						<img
							className="logoHeader"
							src={logo}
							alt="InvoiceBook logo"
							data-logo-alt={logo}
						/>
						<h1 className="navTitle">InvoiceBook</h1>
					</NavLink>
				</Navbar.Brand>
				<div id="AfficheUserName"></div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Item id="homeNav">
            <NavLink
              className="Header_item"
              activeClassName="Header_item-active"
              exact
              to="/"
            >
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item id="helpNav">
            <NavLink
              className="Header_item"
              activeClassName="Header_item-active"
              exact
              to="/help"
            >
              Aide
            </NavLink>
          </Nav.Item>
          <Nav.Item id="signInNav">
            <span
              className="Header_item"
              onClick={() => props.display_popUp("sign-in")}
            >
              Connexion
            </span>
          </Nav.Item>
          <Nav.Item id="signUpNav">
            <span
              className="Header_item"
              onClick={() => props.display_popUp("sign-up")}
            >
              Inscription
            </span>
          </Nav.Item>
				</Nav>
			</Navbar>
		</Router>
	);

	const loggedIn_header =(
		<Router>
			<Navbar expand="lg">
				<Navbar.Brand>
					<NavLink to="/">
						<img
							className="logoHeader"
							src={logo}
							alt="InvoiceBook logo"
							data-logo-alt={logo}
						/>
						<h1 className="navTitle">InvoiceBook</h1>
					</NavLink>
				</Navbar.Brand>
				<div id="AfficheUserName"></div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Item id="homeNav">
            <NavLink
              className="Header_item"
              activeClassName="Header_item-active"
              exact
              to="/"
            >
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item id="helpNav">
            <NavLink
              className="Header_item"
              activeClassName="Header_item-active"
              exact
              to="/help"
            >
              Aide
            </NavLink>
          </Nav.Item>
					<Nav.Item id="profileNav">
            <NavLink
              className="Header_item"
              activeClassName="Header_item-active"
              exact
              to="/profile"
            >
              Mon Profil
            </NavLink>
          </Nav.Item>
          <Nav.Item id="signInNav">
            <span
              className="Header_item"
              onClick={() => props.show_popUp("sign-in")}
            >
              Déconnexion
            </span>
          </Nav.Item>
				</Nav>
			</Navbar>
		</Router>
	);

	return <div>{props.loggedIn ? loggedIn_header : loggedOut_header}</div>
}

export default Header;

Header.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	show_popUp: PropTypes.func.isRequired,
};