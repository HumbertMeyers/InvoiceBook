import React from 'react';
import {Container, Button, Form, Col, Row} from 'react-bootstrap';
import './Formulaires.css';

function AjoutClient() {
	return (
		<div className="AjoutClient">
			<Container className="principal">
				<Col>
					<Row>Ajout d'un client</Row>
				</Col>
				<br/>
				<Form>
					<Col>
						<Form.Label><u>Personne de contact</u></Form.Label>
					</Col>
					<Form.Row>
						<Col lg={true}>
							<Form.Control placeholder="Prénom"/>
						</Col>
						<Col>
							<Form.Control placeholder="Nom"/>
						</Col>
					</Form.Row>

					<Form.Group controlId="Pays">
						<Form.Label>Pays</Form.Label>
						<Form.Control placeholder="Pays"/>
					</Form.Group>

					<Col>
						<Form.Label><u>Informations de l'entreprise (si professionnel)</u></Form.Label>
					</Col>

					<Form.Group>
							<Form.Label>Nom de l'entreprise</Form.Label>
							<Form.Control placeholder="Nom"/>
					</Form.Group>
					<Form.Group>
							<Form.Label>Numéro de TVA</Form.Label>
							<Form.Control placeholder="Numéro de TVA"/>
					</Form.Group>

					<Form.Group controlId="formGridAddress1">
						<Form.Label>Adresse</Form.Label>
						<Form.Control placeholder="1234 Main St"/>
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>Ville</Form.Label>
							<Form.Control placeholder="Bruxelles"/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label>Code Postal</Form.Label>
							<Form.Control placeholder="1000"/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Pays</Form.Label>
							<Form.Control placeholder="Pays"/>
						</Form.Group>
					</Form.Row>

					<Button variant="primary" type="submit">
						Enregistrer
					</Button>
				</Form>
			</Container>
		</div>
	);
}

export default AjoutClient;

