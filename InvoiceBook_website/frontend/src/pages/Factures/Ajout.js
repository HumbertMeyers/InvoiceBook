import React, {Component, useState} from 'react';
import {Container, Tabs, Tab, Form, Button} from "react-bootstrap";

class AjoutFacture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			TVA: "",
		};
	}

	componentDidMount() {

	}

	factureIn = (
		<Container className="principal">
			<Form>
				<Form.Group>
					<Form.Label>Nom de l'entreprise</Form.Label>
					<Form.Control as="select" custom>
						<option>A ajouter via requete</option>
					</Form.Control>

					<Form.Label>Numéro de facture</Form.Label>
					<Form.Control placeholder="Numéro de Facture"/>

					<Form.Label>Montant de la facure</Form.Label>
					<Form.Control placeholder="montant de la facture"/>

					<Form.Label>Date de la facturation</Form.Label>
					<Form.Control placeholder="Date de facturation"/>
				</Form.Group>
					<Form.Label>Fichier de votre facture</Form.Label>
					<Form.File id="formcheck-api-regular">
						<Form.File.Input />
					</Form.File>

				<br/>
				<Button variant="primary" type="submit">
					Enregistrer
				</Button>
			</Form>
		</Container>
	);

	factureOut = (
		<Container className="principal">
			<Form>
				<Form.Group>
					<Form.Label>Nom du Client</Form.Label>
					<Form.Control as="select" custom>
						<option>A ajouter via requete</option>
					</Form.Control>

					<Form.Label>Numéro de facture</Form.Label>
					<Form.Control placeholder="Numéro de Facture"/>

					<Form.Label>Montant de la facure</Form.Label>
					<Form.Control placeholder="montant de la facture"/>

					<Form.Label>Date de la facturation</Form.Label>
					<Form.Control placeholder="Date de facturation"/>
				</Form.Group>
					<Form.Label>Fichier de votre facture</Form.Label>
					<Form.File id="formcheck-api-regular">
						<Form.File.Input />
					</Form.File>

				<br/>
				<Button variant="primary" type="submit">
					Enregistrer
				</Button>
			</Form>
		</Container>
	);

	render(){
		return (
			<Container>
				<Tabs variant="pills" defaultActiveKey="factureIn" id="uncontrolled-tab-factures">
					<Tab eventKey="factureIn" title="Facture Entrante" >
						<div>{this.factureIn}</div>
					</Tab>
					<Tab eventKey="factureOut" title="Facture Sortante">
						<div>{this.factureOut}</div>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default AjoutFacture;