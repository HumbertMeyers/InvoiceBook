import React from 'react';
import {Jumbotron as Jumbo, Row, Col} from 'react-bootstrap';
import styled from "styled-components";

const Styles = styled.div`
  .jumbo {
    background: #343a40 no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 100px;
    position: relative;
    z-index: 0;
    margin-bottom: 0 !important;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    justify-content: center;
  }
`;

function Footer (){
		return(
			<Styles>
		    <Jumbo fluid className="jumbo">
		      <div className="overlay"></div>
		      <div className="copyrights">
			      <Row className="justify-content-md-center">
				      <Col></Col>
				      <Col md="auto">
					      &copy;{new Date().getFullYear()} InvoiceBook | All right reserved
				      </Col>
				      <Col></Col>
			      </Row>
		      </div>
		    </Jumbo>
		  </Styles>
		)
}

export default Footer;