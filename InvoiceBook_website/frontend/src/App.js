import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Layout from './components/Layout.js';
import Routes from './Routes.js';
import tokenIsValid, {getUserProfileAPIRequest, userFromToken} from "./utilitaires/utils";
import history from './utilitaires/historique';
import { api } from './utilitaires/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Deconnexion from "./components/Deconnexion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: false,
      user_id: 0,
      show_popUp: "",
    };
  }

  componentDidMount() {
    if (tokenIsValid()) {
      let token = localStorage.getItem('token');
      let endpoint = "/api/persons/login_token/?token=";
      let req = new api();
      req.open("GET", `${endpoint}${token}`);

      let self = this;
      req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            let user = this.responseText[0];
            self.setState({
              user_id: user.id_person,
              signed_in: true,
            });
            getUserProfileAPIRequest(userFromToken().id);
          }
          if (this.status === 404) {
            document.getElementById("userNameDisplay").innerHTML = "";
            //history.push('/');
          }
        }
      });

      req.send();

    }
    else{
      document.getElementById("AfficheUserName").innerHTML = "";
    }
  }

  display_popUp = (type) => {
    this.setState({ show_popUp: type });
  };
  popUp = () => {
    let p;
    switch (this.state.show_popUp) {
      case "sign-in":
        p = <Connexion showPopUp={true} handle_signIn={this.handle_signIn} />;
        break;
      case "sign-up":
        p = <Inscription showPopUp={true} handle_signIn={this.handle_signIn} />;
        break;
      case "sign-out":
        p = <Deconnexion showPopUp={true} handle_signOut={this.handle_signOut} />;
        break;
      default:
        p = null;
    }
    return p;
  };

  handle_signIn = (u_id, u_token) => {
    localStorage.setItem('token',u_token);
    //getUserProfileAPIRequest(userFromToken().id);
    this.setState({
      user_id: u_id,
      signed_in: true,
    });
    window.location.reload();
  };

  handle_signOut = () => {
    localStorage.removeItem('token');
    document.getElementById("AfficheUserName").innerHTML = "";
    history.push('/');
    window.location.reload();
    this.setState({
      user_id: 0,
      signed_in: false,
    });
  };

  render (){
    return (
      <div className="App">
        <div className="bg">
          <Router>
            <Header
              signed_in={this.state.signed_in}
              display_popUp={this.display_popUp}
            />
            <Layout />
            <div className="Body">
              <Routes/>
              <div id="bodyContent">
                {this.popUp()} {/*every popup will be displayed here*/}
              </div>
            </div>
            </Router>
          </div>
          <div className="Footer">
            <Footer />
          </div>
      </div>
    );
  }
}

export default App;
