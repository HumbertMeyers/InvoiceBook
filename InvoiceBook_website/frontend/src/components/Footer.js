import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from "styled-components";

const Styles = styled.div`
  .jumbo {
    background: dark no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 100px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

function Footer (){
		return(
			<Styles>
		    <Jumbo fluid className="jumbo">
		      <div className="overlay"></div>
		      <Container>
		        &copy;{new Date().getFullYear()} InvoiceBook | All right reserved
		      </Container>
		    </Jumbo>
		  </Styles>
		)
}

export default Footer;