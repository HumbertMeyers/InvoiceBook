import React, {Component} from 'react';
import {Container, Table, Row, Col, Form, FormControl} from "react-bootstrap";

class RechercheFacture extends Component{
	constructor() {
		super();
		this.state = {
			radioType: "Tous",
			dateDebut: "",
			dateFin : "",
		}
	}

	handleChange = (e) => {
    var value = e.target.value;
    console.log(value);
    this.setState({ radioType: value });
  }

	render() {
		return (
			<Container className="principal">
				<Col>
					<Row>Recherche d'une facture</Row>
				</Col>
				<Row>
					<Col size="xs">
						Dates :
						<Form.Group>
							<FormControl
	              type="date" id="dateDebut"
	            />
	            <FormControl
	              type="date" id="dateFin"
	            />
						</Form.Group>
					</Col>
					<Col >
						Type :
						<Form.Group value={this.state.radioType} onChange={this.handleChange}>
							<Form.Check
								label="Tous"
								type="radio"
								name="TypeCliFou"
								value="Tous"
								defaultChecked
							/>
							<Form.Check
								label="Clients"
								type="radio"
								name="TypeCliFou"
								value="Clients"
							/>
							<Form.Check
								label="Fournisseurs"
								type="radio"
								name="TypeCliFou"
								value="Fournisseur"
							/>
						</Form.Group>
					</Col>
					<Col></Col>
					<Col></Col>
					<Col></Col>
				</Row>
				<Table striped bordered hover size="sm">
					<thead>
				    <tr>
				      <th>#</th>
				      <th>Date</th>
				      <th>Tier : {this.state.radioType}</th>
				      <th>Montant</th>
					    <th>PDF</th>
					    <th>Edition</th>
				    </tr>
				  </thead>
				</Table>
			</Container>
		)
	}
}

export default RechercheFacture;