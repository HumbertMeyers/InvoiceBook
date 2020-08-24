import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
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
			  <div id="homeWrapper" className="justify-content-center" >
				  <br />
				  <Col md={{ span: 6, offset: 3 }}>
					  <Card body >
						  <Row >
							  <div className="h1">
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
						  <Row>
							  <div>
								  Si vous vous demandez comment utiliser cet outils, c'est bien simple, cliquez sur help
							  </div>
						  </Row>
					  </Card>
				  </Col>
			  </div>
      </div>
		</Styles>
	);
}

export default Home;