import React, { Component } from "react";
import styled from 'styled-components';
import {Col, Row} from "react-bootstrap";

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
		    <div className="Help">
	        <div id="HelpWrapper">
					  <br />
					  <Col md={{ offset: 3 }}>

						  <Row>
							  <div className="h2">
								  Help
							  </div>
						  </Row>
						  <Row>
							  <div className="h4">
									  <br />
							  </div>
						  </Row>
						  <Row>
							  <br /><br />
							  <div className="text">
								  Page en cours de construction.
							  </div>
						  </Row>
					  </Col>
	        </div>
	      </div>
    	</Styles>
    );
  }
}

export default Help;
