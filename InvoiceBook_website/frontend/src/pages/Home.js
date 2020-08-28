import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Header from "../components/Header";

const Styles = styled.div(`
	.Home {
	  width: 100%;
	}
	#homeWrapper{
		width: 90%;
		margin-left: 5%;
		margin-top: 5%;
	}
`)

function Home() {
	return (
		<Styles>
		  <Container className="Home">
			  <div id="homeWrapper">
				  <br />
				  <Col md={{ span: 8, offset: 2 }}>
					  <Row >
						  <div className="h1">
							  Bienvenue
						  </div>
					  </Row>
					  <Row>
						  <div className="h5">
							  <span id="AfficheUserName" ><br /></span>
						  </div>
					  </Row>
					  <Row>
						  <br /><br />
						  Vous voici sur InvoiceBook. <br/>
						  L'application web pour gérer en simplicité vos factures.
					  </Row>
					  <br />
					  <Row>
						  Si vous vous demandez comment utiliser cet outils, c'est bien simple, allez voir la documentation sur
						  <a href="https://github.com/HumbertMeyers/InvoiceBook/wiki">le wiki Github</a>
					  </Row>
				  </Col>
			  </div>
      </Container>
		</Styles>
	);
}

export default Home;