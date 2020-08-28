import React, {Component} from 'react';
import {Container, Table, Row, Col, Form, FormControl} from "react-bootstrap";
import PDFIcon from "../../assets/pdf-icon.png"
import { fetchApi } from "../../utilitaires/api.js";

class RechercheFacture extends Component{
	constructor(props) {
		super(props);
		this.state = {
			from: "",
			to : "",
			dir: 'inout',
			factures: [{
				date:"2020-08-12",
				tier: "Someclient",
				tune: 8000,
				pdf:"www.google.com"
			}],
		}
	}

	handleChange(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({ [name]: value }, () =>{
			let from = '1990-01-01';
			if(this.state.from)
			 	from = String(this.state.from);

			let to = '2100-01-01';
			if(this.state.to)
			 	to = String(this.state.to);

			fetchApi(`/users/${this.props.user_id}/listfactures/?from=${from}&to=${to}&dir=${this.state.dir}`)
			.then((ans) => {
				this.setState({factures: ans.factures});
			})
			.catch(err => {
				this.setState({factures: []});
				console.log('Erreur listfactures ' + err);
			})
		});
  };

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
								name="from"
								value={this.state.from}
                onChange={this.handleChange.bind(this)}
	            />
	            <FormControl
	              type="date" id="dateFin"
								name="to"
								value={this.state.to}
                onChange={this.handleChange.bind(this)}
	            />
						</Form.Group>
					</Col>
					<Col >
						Type :
						<Form.Group onChange={this.handleChange.bind(this)} value={this.state.dir} name="dir">
							<Form.Check
								label="Tous"
								type="radio"
								name="dir"
								value="inout"
								defaultChecked
							/>
							<Form.Check
								label="Clients"
								type="radio"
								name="dir"
								value="out"
							/>
							<Form.Check
								label="Fournisseurs"
								type="radio"
								name="dir"
								value="in"
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
				    </tr>
				  </thead>
					<tbody>

					{this.state.factures.map((fac, index) => (
						<tr>
							<td>{index}</td>
							<td>{fac.date}</td>
							<td>{fac.tier}</td>
							<td>{fac.tune}€</td>
							<td><a href={fac.pdf}><img src={PDFIcon} height="20px" alt="telecharger pdf"/></a></td>
						</tr>))}
					</tbody>
				</Table>
			</Container>
		)
	}
}

export default RechercheFacture;
