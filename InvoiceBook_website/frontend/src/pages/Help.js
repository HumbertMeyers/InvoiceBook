import React, { Component } from "react";
import styled from 'styled-components';
import {Container, Col, Row} from "react-bootstrap";

const Styles = styled.div(`
	.Help {
	  width: 100%;
	}
	
	#HelpWrapper{
	  width: 90%;
	  margin-left: 5%;
	  margin-top: 5%;
	}
`)

class Help extends Component {
  render() {
    return (
    	<Styles>
		    <Container className="Help">
				  <Col md={{ offset: 3, span: 6 }}>
					  <Row><br/></Row>
					  <Row>
						  <h1>
							  Help
						  </h1>
					  </Row>
					  <Row><br/></Row>
					  <Row>
					    Page en cours de construction.
					  </Row>
				  </Col>
	      </Container>
    	</Styles>
    );
  }
}

export default Help;
