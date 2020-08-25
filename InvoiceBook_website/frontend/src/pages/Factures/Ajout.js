import React, {useState} from 'react';
import { Container, Tabs, Tab, } from "react-bootstrap";



function AjoutFacture(props) {
	const factureIn = (
		<>
			<div className="Title">
				Ajout d'une facture entrante
			</div>
		</>
	)

	const factureOut = (
		<>
			<div className="Title">
				Ajout d'une facture sortante
			</div>
		</>
	)

  return (
  	<Container>
	    <Tabs variant="pills" defaultActiveKey="factureIn" id="uncontrolled-tab-facture" >
	      <Tab eventKey="factureIn" title="Facture Entrante">
	        <div> {factureIn} </div>
	      </Tab>
	      <Tab eventKey="factureOut" title="Facture Sortante">
	        <div> {factureOut} </div>
	      </Tab>
	    </Tabs>
	  </Container>
	);
}

export default AjoutFacture;