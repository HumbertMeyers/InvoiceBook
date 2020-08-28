import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { api, fetchApi } from "../utilitaires/api.js";

import "./FormSign.css";

const user_initState = {
  email: "",
  last_name: "",
  first_name: "",
  newPassword: "",
  confirmPassword: "",
  estOK: false,
  confPassErr: "",
  newPassErr: "",
  emailErr: "",
};

/**
 * Popup containing a form to sign-up
 */
class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = user_initState;
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

    fetchApi(`/users/inscription/?last_name=${this.state.last_name}&first_name=${this.state.first_name}&username=${this.state.email}&email=${this.state.email}&password=${this.state.newPassword}`)
    .then((ans) =>
      alert("Inscription ok")

    )
    .catch(err => {
      alert(err);
    });
  }

  render() {
    return (
      <>
        {/* Sign-up popup */}
        <Modal
          show={true}
          onHide={this.props.closeMe}
        >
          <Modal.Header closeButton>
            <Modal.Title>Inscription</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signUpForm" onSubmit={this.handleSubmit}>
              <label className="FormField_Label" htmlFor="email">
                {" "}
                Adresse mail{" "}
              </label>
              <input
                required
                type="email"
                className="FormField_Input"
                name="email"
                autoComplete="username"
                placeholder="Enter your e-mail address"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="error" id="email_error">{this.state.emailErr}</span>
              <label className="FormField_Label" htmlFor="first_name">
                {" "}
                Prénom{" "}
              </label>
              <input
                required
                type="text"
                className="FormField_Input"
                name="first_name"
                autoComplete="given-name"
                placeholder="Entrez votre prénom"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
              <label className="FormField_Label" htmlFor="last_name">
                {" "}
                Nom{" "}
              </label>
              <input
                required
                type="text"
                className="FormField_Input"
                name="last_name"
                autoComplete="family-name"
                placeholder="Entrez votre nom"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
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
              <span className="error" id="password_error">{this.state.confPassErr}</span>
              <div>
                <label className="FormField_CheckBox" htmlFor="estOK"></label>
                <input
                  required
                  type="checkbox"
                  className="FormField_Input_Check"
                  name="estOK"
                  value={this.state.estOK}
                  onChange={this.handleChange}
                />{" "}
                J'accepte les {" "}
                <a href="/terms" className="FormField_TermsLink">
                  {" "}
                  conditions générales d'utiliation.{" "}
                </a>
              </div>
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
                  value="S'inscrire"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Inscription;
