import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Layout from './components/Layout.js';
import Routes from './Routes.js';
import tokenIsValid, {getUserProfileAPIRequest, userFromToken} from "./utilitaires/utils";
import historique from './utilitaires/historique';
import { api } from './utilitaires/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Deconnexion from "./components/Deconnexion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      user_id: 0,
      show_popUp: "",
    };
  }

  componentDidMount() {
    if (tokenIsValid()) {
      let token = localStorage.getItem('token');
      let endpoint = "/api/users/login_token/?token=";
      let req = new api();
      req.open("GET", `${endpoint}${token}`);

      let self = this;
      req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            let user = this.responseText[0];
            console.log(user);
            self.setState({
              user_id: user.id,
              logged_in: true,
            });
            getUserProfileAPIRequest(userFromToken().id);
          }
          if (this.status === 404) {
            document.getElementById("AfficheUserName").innerHTML = "";
            //historique.push('/');
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
      case "Connexion":
        p = <Connexion showPopUp={true} handle_connexion={this.handle_connexion} />;
        break;
      case "Inscription":
        p = <Inscription showPopUp={true} handle_connexion={this.handle_connexion} />;
        break;
      case "Deconnexion":
        p = <Deconnexion showPopUp={true} handle_deconnexion={this.handle_deconnexion} />;
        break;
      default:
        p = null;
    }
    return p;
  };

  handle_connexion = (u_id, u_token) => {
    localStorage.setItem('token',u_token);
    getUserProfileAPIRequest(userFromToken().id);
    this.setState({
      user_id: u_id,
      logged_in: true,
    });
    window.location.reload();
  };

  handle_deconnexion = () => {
    localStorage.removeItem('token');
    document.getElementById("AfficheUserName").innerHTML = "";
    historique.push('/');
    window.location.reload();
    this.setState({
      user_id: 0,
      logged_in: false,
    });
  };

  render (){
    return (
      <div className="App">
        <div className="bg">
          <Header
            logged_in={this.state.logged_in}
            display_popUp={this.display_popUp}
          />
          <Layout />
          <div className="Body" style={{textAlign: "center"}}>
            <Routes username={this.state.username}/>
            <div id="bodyContent">
              {this.popUp()} {/*every popup will be displayed here*/}
            </div>
          </div>
        </div>
          <Footer />
      </div>
    );
  }
}

export default App;
