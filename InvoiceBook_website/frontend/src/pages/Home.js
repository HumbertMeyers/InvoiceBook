import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div(`
	.Home {
	  width: 100%;
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	  justify-content: space-around;
	}
`)



function Home() {
	return (
		<Styles>
		  <div className="Home">
			  <Row md={{offset:2}}>
				  <Col sm={{offset: 2}} className="h2">Bienvenue</Col>
			  </Row>
			  <Row>
				  <Col sm={{offset:2}} className="h4">
					  <span id="AfficheUserName" ><br /></span>
				  </Col>
			  </Row>
			  <br /><br />
			  <Row >
				  <Col sm={{offset:2}} className="div">
					  Vous voici sur la page de garde de InvoiceBook. <br/>
					  L'application web pour gérer en simplicité vos factures.
				  </Col>
			  </Row>
			  <br />
			  <Row>
				  <Col sm={{offset:2}} className="div">
					  Si vous vous demandez comment utiliser cet outils, c'est bien simple, cliquez sur help
				  </Col>
			  </Row>
      </div>
		</Styles>
	);
}

export default Home;