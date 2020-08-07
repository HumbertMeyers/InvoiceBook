import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

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
		  <div className="Home">
			  <div id="homeWrapper">
				  <br />
				  <Col md={{ offset: 3 }}>

					  <Row>
						  <div className="h2">
							  Bienvenue
						  </div>
					  </Row>
					  <Row>
						  <div className="h4">
								  <span id="AfficheUserName" ><br /></span>
						  </div>
					  </Row>
					  <Row>
						  <br /><br />
						  <div className="text">
							  Vous voici sur la page de garde de InvoiceBook. <br/>
							  L'application web pour gérer en simplicité vos factures.
						  </div>
					  </Row>
					  <br />
					  <Row md={{ offset: 2 }}>
						  <div>
							  Si vous vous demandez comment utiliser cet outils, c'est bien simple, cliquez sur help
						  </div>
					  </Row>
				  </Col>
			  </div>
      </div>
		</Styles>
	);
}

export default Home;