import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { fetchApi } from "../utilitaires/api.js";

import "./FormSign.css";

const user_initState = {
  user_id: 0,
  email: "",
  password: "",
  errorText: "",
};

/**
 * Popup containing a form to sign-in
 */
class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = user_initState;
  }


  // loginAPIRequest(email,pwd) {
    // let self = this; //self will be a reference to the SignIn class object


    // let endpoint = "/api/users/login/?email=";
    //
    // let req = new api();
    // req.open("GET", `${endpoint}${email}&pwd=${pwd}`);
    //
    // req.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4 && this.status === 200) {
    //     let usr = JSON.parse(this.responseText)[0];
    //     let usr_id = usr.id;
    //     let usr_token = usr.token;
    //
    //     document.getElementById("connexionError").innerHTML = "";
    //     self.props.handle_connexion(usr_id,usr_token);
    //     self.closePopUp();
    //   }
    //   if (this.status === 404) {
    //
    //     document.getElementById("connexionError").innerHTML = "Une erreur de connexion s'est produite, vérifiez vos identifiants";
    //   }
    // });
    //
    // req.send();
  // }

  handleChange(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;
    // alert(this);
    this.setState({ [name]: value, errorText:"" });
  };

  handleSubmit (e)  {
    e.preventDefault();

//     let uri =  "http://192.168.1.7"; //"http://127.0.0.1";
//     let port = 8000;
//
//     fetch(`${uri}:${port}/api/test/`).then((e) => e.text()).then((e) => alert(e));
//
// return;
    //loginAPIRequest
    fetchApi(`/users/login/?email=${this.state.email}&pwd=${this.state.password}`)
    .then((ans) => {
      let usr = ans;
      let usr_id = usr.id;
      let usr_token = usr.token;

      this.props.handle_connexion(usr_id,usr_token, this.state.email);
      this.props.closeMe();
    })
    .catch(err => {
      let errTxt = err.message; //'unknown error';
      if(err.message == "401")
        errTxt = 'Login incorrect';

      this.setState({
        errorText: errTxt
      });
    });

  };

  render() {

    return (
      <>
        {/* Sign-in popup */}
        <Modal
          show={true}
          onHide={this.props.closeMe}
        >
          <Modal.Header closeButton>
            <Modal.Title>Connexion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signInForm" onSubmit={this.handleSubmit.bind(this)}>
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
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
              />

              <div className="error" id="connexionError" disabled="disabled">{this.state.errorText}</div>

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
