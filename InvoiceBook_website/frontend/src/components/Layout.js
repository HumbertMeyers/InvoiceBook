import React from 'react';
import { Container } from 'react-bootstrap';

function Layout (props) {
  return(
  	<Container fluid>
      {props.children}
    </Container>
  )
}
export default Layout;