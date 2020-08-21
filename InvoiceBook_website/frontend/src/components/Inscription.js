import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { api } from "../utilitaires/api.js";

import "./FormSign.css";

const user_initState = {
  email: "",
  last_name: "",
  first_name: "",
  newPassword: "",
  confirmPassword: "",
  estOK: false,
};

/**
 * Popup containing a form to sign-up
 */
class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = user_initState;
    this.showPopUp = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(user_initState);
  };


  newAccountAPIRequest(newprofile) {
    let self = this; //self will be a reference to the SignUp class object

    let endpoint = "/api/users/";

    let req = new api();
    req.open("POST", `${endpoint}`);
    req.contentType("json");

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 201) {
          let usr = JSON.parse(this.responseText)[0];
          let usr_id = usr.id;
          let usr_token = usr.token;
          self.props.handle_connexion(usr_id,usr_token);
          self.closePopUp();
        } else if (this.status === 409) {
          let error = JSON.parse(this.responseText).error;
          if (error.includes("email")) {
            document.getElementById("email_error").innerHTML = error;
          }
          else {
            //pass
          }
        }
      }
    });

    req.send(newprofile);
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState(
      {
        [name]: value,
      },
      function () {
        if (name === "newPassword") {
          //Check if password has a minimum length of 8
          if (value !== "" && value.length < 8) {
            let errorMessage = "<p>Le mot de passe doit faire au minimun 8 caractères!</p>";
            document.getElementById(
              "newpassword_error"
            ).innerHTML = errorMessage;
          } else {
            document.getElementById("newpassword_error").innerHTML = "";
          }
        }

        if (name === "confirmPassword") {
          //Check if passwords are matching
          if (
            value !== "" &&
            this.state.newPassword !== this.state.confirmPassword
          ) {
            let errorMessage = "<p>Les mots de passes ne correspondent pas</p>";
            document.getElementById("password_error").innerHTML = errorMessage;
          } else {
            document.getElementById("password_error").innerHTML = "";
          }
        }
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
	    last_name: this.state.last_name,
      first_name: this.state.first_name,
      username: this.state.email,
      email: this.state.email,
      password: this.state.newPassword,
    };
    this.newAccountAPIRequest(JSON.stringify(data));
  }

  render() {
    return (
      <>
        {/* Sign-up popup */}
        <Modal
          show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
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
              <span className="error" id="email_error"></span>
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
                Nouveau mot de passe{" "}
              </label>
              <input
                required
                type="password"
                className="FormField_Input"
                name="newPassword"
                autoComplete="new-password"
                placeholder="Enter a new password"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
              <span className="error" id="newpassword_error" ></span>
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
                placeholder="Enter your password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <span className="error" id="password_error"></span>
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
                J'accèpte les conditions des{" "}
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
                  onClick={this.closePopUp}
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

Inscription.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  handle_connexion: PropTypes.func.isRequired,
};
