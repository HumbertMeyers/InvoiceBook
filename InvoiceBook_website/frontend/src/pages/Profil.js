import React, {Component, useState} from 'react';
import {Container, Tabs, Tab, Form, Button, Col, Modal} from "react-bootstrap";
import {fetchApi} from '../utilitaires/api.js';

class SetPasswordDialog extends Component {
	constructor(props){
		super(props);
		this.state = {
			newPassword: '',
			confirmPassword: '',
			confPassErr: "",
		  newPassErr: "",
		};
	}

	handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState(
      {
        [name]: value,
      },
       () => {
        if (name === "newPassword") {
          //Check if password has a minimum length of 8
          this.setState({newPassErr: (value !== "" && value.length < 8) ? "Le mot de passe doit faire au minimun 8 caractères!":""});

        }

        if (name === "confirmPassword") {
          //Check if passwords are matching
          this.setState({confPassErr: (  value !== "" && this.state.newPassword !== this.state.confirmPassword) ? "Les mots de passes ne correspondent pas":""});

        }
      }
    );
  }

  handleSubmit = (e) => {
		e.preventDefault();

		//errors
		if(this.state.newPassErr || this.state.confPassErr || !this.state.newPassword)
			return;

		fetchApi(`/users/${this.props.user_id}/changepwd/?pwd=` + this.state.newPassword)
		.then((ans) => alert('Mot de passe mit a jour'))
		.catch((e) => alert('failed to update password'))

		this.props.closeMe();
		// alert('df');
    // let data = {
	  //   last_name: this.state.last_name,
    //   first_name: this.state.first_name,
    //   username: this.state.email,
    //   email: this.state.email,
    //   password: this.state.newPassword,
    // };
    // this.newAccountAPIRequest(data);
  }

 render(){
	return (
		<>
			{/* Sign-in popup */}
			<Modal
				show={true}
				onHide={this.props.closeMe}
			>
				<Modal.Header closeButton>
					<Modal.Title>Modifier le mot de passe</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form id="signInForm" >
					<label className="FormField_Label" htmlFor="newPassword">
						{" "}
						Mot de passe{" "}
					</label>
					<input
						required
						type="password"
						className="FormField_Input"
						name="newPassword"
						autoComplete="new-password"
						placeholder="Entrez votre mot de passe"
						value={this.state.newPassword}
						onChange={this.handleChange}
					/>
					<br />
					<span className="error" id="newpassword_error" >{this.state.newPassErr}</span>
					<label className="FormField_Label" htmlFor="confirmPassword">
						{" "}
						Confirmation du mot de passe{" "}
					</label>
					<input
						required
						type="password"
						className="FormField_Input"
						name="confirmPassword"
						autoComplete="new-password"
						placeholder="Confirmez votre mot de passe"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
					/>
					<br />
					<span className="error" id="password_error">{this.state.confPassErr}</span>

						<div className="FormBtns">
							<input
								className="FormCancelBtn"
								type="button"
								value="Annuler"
								onClick={this.props.closeMe}
							/>
							<input
								className="FormSubmitBtn"
								type="submit"
								value="Confirmer"
								onClick={this.handleSubmit}
							/>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);

}
}

function Profil(props) {
	// let user_name = localStorage.getItem('first_name');

	return (
		<Container className="principal">
		<Form>
		<Form.Group>
		<Col>
			<Form.Label><u>Mon profil</u></Form.Label>
		</Col>

			<Form.Label>Nom</Form.Label>
	    <Form.Control type="text" value={props.user_name + " " + props.user_family_name} readonly/>

			<Form.Label>Email</Form.Label>
	    <Form.Control type="email" value={props.user_email} readonly/>

			<br/>
			<Button variant="primary" onClick={() => props.display_popUp(SetPasswordDialog)}>
					Modifier le mot de passe
				</Button>
		</Form.Group>

		</Form>
		</Container>
	);
}


export default Profil;
