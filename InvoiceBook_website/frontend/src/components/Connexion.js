import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { api } from "../utilitaires/api.js";

import "./FormSign.css";

const user_initState = {
  user_id: 0,
  email: "",
  password: "",
};

/**
 * Popup containing a form to sign-in
 */
class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = user_initState;
    this.showPopUp = true;
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.setState(user_initState);
  };

  loginAPIRequest(email,pwd) {
    let self = this; //self will be a reference to the SignIn class object

    let endpoint = "/api/users/login/?email=";

    let req = new api();
    req.open("GET", `${endpoint}${email}&pwd=${pwd}`);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        let usr = JSON.parse(this.responseText)[0];
        let usr_id = usr.id;
        let usr_token = usr.token;
        
        document.getElementById("connexionError").innerHTML = "";
        self.props.handle_connexion(usr_id,usr_token);
        self.closePopUp();
      }
      if (this.status === 404) {

        document.getElementById("connexionError").innerHTML = "Une erreur de connexion s'est produite, vérifiez vos identifiants";
      }
    });

    req.send();
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.loginAPIRequest(this.state.email, this.state.password);
  };

  render() {
    return (
      <>
        {/* Sign-in popup */}
        <Modal
          show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Connexion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signInForm" onSubmit={this.handleSubmit}>
              <label className="FormField_Label" htmlFor="email">
                E-mail address
              </label>
              <input
                required
                type="email"
                className="FormField_Input"
                name="email"
                autoComplete="username"
                placeholder="Entrez votre adresse mail"
                value={this.state.email}
                onChange={this.handleChange}
              />

              <label className="FormField_Label" htmlFor="password">
                Password
              </label>
              <input
                required
                type="password"
                className="FormField_Input"
                name="password"
                autoComplete="current-password"
                placeholder="Entrez votre mot de passe"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <div className="error" id="connexionError" disabled="disabled"></div>

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
                  value="Se Connecter"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Connexion;
