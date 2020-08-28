import React,{Component} from 'react';
import {Container, Button, Form, Col, Row, FormControl} from 'react-bootstrap';
import './Formulaires.css';
import { fetchApi } from "../utilitaires/api.js";

const noStat = {
	in:{
		count: 0,
		sum: 0,
		avg: 0
	},
	out:{
		count: 0,
		sum: 0,
		avg: 0
	}
};

function HalfResume(props){
	let avg = (props.count > 0) ? (props.sum / props.count) : 0;

	return [						<Form.Group as={Row} controlId="formHorizontalEmail">
								<Form.Label column sm={2}>
									Nombre
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="text" value ={props.count} readOnly />
								</Col>
							</Form.Group>,
							<Form.Group as={Row} controlId="formHorizontalEmail">
								<Form.Label column sm={2}>
									Montant total
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="text" value ={props.sum + ' €'} readOnly/>
								</Col>
							</Form.Group>,
							<Form.Group as={Row} controlId="formHorizontalEmail">
								<Form.Label column sm={2}>
									Montant moyen
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="text" value ={avg + ' €'} readOnly />
								</Col>
							</Form.Group>
];
}

export default class Resume extends Component{
	constructor(props) {
		super(props);
		this.state = {
			from: "",
			to : "",
			dir: 'inout',
			factStat: noStat,
		}
	}


	handleChange(e){
		// console.log(this.props.user_id);

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
				let result = {...noStat};

				for( const facture of ans.factures){
					result[facture.dir].count++;
					result[facture.dir].sum+= facture.tune;
				}



				this.setState({facStat: result});
			})
			.catch(err => {
				this.setState({facStat: noStat});
				console.log('Erreur listfactures ' + err);
			})
		});
  };

	render(){
		let facStat = this.state.factStat;
		console.log('rander resume');

		return (
			<Container className="principal">
				<div className="row">
					<div className="col" style={{maxWidth: 300}}>
						<div><h2>Resume de la periode</h2></div>
						<div>Filtres
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

						</div>
					</div>
					<div>
						<div>
							<h3>Factures entrantes</h3>
							<HalfResume
								sum={facStat.in.sum}
								count={facStat.in.count}
							/>
						</div>
						<div>
							<h3>Factures sortantes</h3>
							<HalfResume
								sum={facStat.out.sum}
								count={facStat.out.count}
							/>
						</div>
						<div>
							<h3>Resultat</h3>
							<Form.Group as={Row} controlId="formHorizontalEmail">
														<Form.Label column sm={2}>
															Benefice
															</Form.Label>
														<Col sm={10}>
															<Form.Control type="text" value ={(facStat.in.sum - facStat.out.sum) + ' €'} readOnly />
														</Col>
													</Form.Group>
						</div>
					</div>
				</div>
			</Container>

		);

	}
}
