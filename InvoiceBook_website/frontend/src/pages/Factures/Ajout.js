import React, {Component, useState} from 'react';
import {Container, Tabs, Tab, Form, Button} from "react-bootstrap";

class AjoutFacture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			TVA: "",
			fournisseurs: ["chargement..."],
			clients: ["chargement..."],
		};

	}

	fetchFournisseursNoms = (endpoint, id) => {
		return fetch(`${endpoint}${id}/fournisseurs`)
			.then((response) => {
				response.json()
			}, (err) => alert(err))
			.then((fourni) => {
				this.setState({
					fournisseurs: fourni.map(f => f.fournisseurs.nom)
				});
			})
	}

	fetchClientsNoms = (endpoint, id) => {
		return fetch(`${endpoint}${id}/clients`)
			.then((response) => {
				response.json()
			}, (err) => alert(err))
			.then((client) => {
				this.setState({
					clients: client.map(c => c.clients.nom)
				});
			})
	}

	componentDidMount() {
		let endpoint = "/api/user/";
		let user_id = this.props.user_id;
		this.fetchClientsNoms(endpoint, user_id);
		this.fetchFournisseursNoms(endpoint, user_id);
	}

	render(){
		let factureIn = (
			<Container className="principal">
				<Form>
					<Form.Group>
						<Form.Label>Nom de l'entreprise</Form.Label>
						<Form.Control as="select" custom>
							{this.state.fournisseurs.map((key) =>   <option>{key}</option>)}
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

		let factureOut = (
			<Container className="principal">
				<Form>
					<Form.Group>
						<Form.Label>Nom du Client</Form.Label>
						<Form.Control as="select" custom>
							{this.state.clients.map((key) =>   <option>{key}</option>)}
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

		return (
			<Container>
				<Tabs variant="pills" defaultActiveKey="factureIn" id="uncontrolled-tab-factures">
					<Tab eventKey="factureIn" title="Facture Entrante" >
						<div>{factureIn}</div>
					</Tab>
					<Tab eventKey="factureOut" title="Facture Sortante">
						<div>{factureOut}</div>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default AjoutFacture;