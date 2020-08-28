import React, {Component, useState} from 'react';
import {Container, Tabs, Tab, Form, Button} from "react-bootstrap";
import {fetchApi} from '../../utilitaires/api.js';

function AddFactForm(props){
	return (
		<Container className="principal">
			<Form>
				<Form.Group>
					<Form.Label>{props.optLabel}</Form.Label>
					<Form.Control as="select" custom>
						{props.opt.map((key) =>   <option>{key}</option>)}
					</Form.Control>

					<Form.Label>Numéro de facture</Form.Label>
					<Form.Control placeholder="Numéro de Facture" type="number" />

					<Form.Label>Montant de la facture</Form.Label>
					<Form.Control placeholder="montant de la facture" type="number" />

					<Form.Label>Date de la facturation</Form.Label>
					<Form.Control placeholder="Date de facturation"type="date" />
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
}

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

			fetchApi(`/users/${id}/fournisseurs/`).then((fourList) => {
				this.setState({
					fournisseurs: fourList.map(c => c.fournisseurs.nom)
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	fetchClientsNoms = (endpoint, id) => {
		fetchApi(`/users/${id}/clients/`).then((cliList) => {
			this.setState({
				clients: cliList.map(c => c.clients.nom)
			});
		})
		.catch((err) => {
			console.log('fetchClientsNoms ' + err + id);
		});
	}

	componentDidMount() {
		let endpoint = "/api/user/";
		let user_id = this.props.user_id;
		this.fetchClientsNoms(endpoint, user_id);
		this.fetchFournisseursNoms(endpoint, user_id);
	}

	render(){
		return (
			<Container>
				<Tabs variant="pills" defaultActiveKey="factureIn" id="uncontrolled-tab-factures">
					<Tab eventKey="factureIn" title="Facture Entrante" >
						<div><AddFactForm opt={this.state.fournisseurs} optLabel="Nom de l'entreprise"/></div>
					</Tab>
					<Tab eventKey="factureOut" title="Facture Sortante">
					<div><AddFactForm opt={this.state.clients} optLabel="Nom du client"/></div>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default AjoutFacture;
