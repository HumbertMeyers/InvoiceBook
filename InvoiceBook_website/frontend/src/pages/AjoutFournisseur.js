import React from 'react';
import {Button, Form, Col, Container, Row} from 'react-bootstrap';

function AjoutFournisseur(props) {
	return (
		<div className="AjoutFournisseur">
			<Container className="principal">
				<Col>
					<Row>Ajout d'un Fournisseur</Row>
				</Col>
				<br/>
				<Form>
					<Form.Group>
							<Form.Label>Nom de l'entreprise</Form.Label>
							<Form.Control placeholder="Nom"/>
					</Form.Group>
					<Form.Group>
							<Form.Label>Numéro de TVA</Form.Label>
							<Form.Control placeholder="Numéro de TVA"/>
					</Form.Group>
					<Form.Group>
							<Form.Label>Numéro de compte banquaire</Form.Label>
							<Form.Control placeholder="Numéro IBAN"/>
					</Form.Group>

					<Form.Group controlId="formGridAdresse">
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

					<Col>
						<Form.Label><u>Personne de Contact</u></Form.Label>
					</Col>

					<Form.Row>
						<Col lg={true}>
							<Form.Control placeholder="Prénom"/>
						</Col>
						<Col>
							<Form.Control placeholder="Nom"/>
						</Col>
					</Form.Row>
					<Form.Group>
						<Form.Label>Adresse mail</Form.Label>
						<Form.Control placeholder="email@example.com" type="email"/>
					</Form.Group>

					<br/>
					<Button variant="primary" type="submit">
						Enregistrer
					</Button>
				</Form>
			</Container>
		</div>
	);
}

export default AjoutFournisseur;

