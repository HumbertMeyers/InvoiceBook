import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Layout from './components/Layout.js';
import Routes from './Routes.js';
import tokenIsValid, {getUserProfileAPIRequest, userFromToken} from "./utilitaires/utils";
import historique from './utilitaires/historique';
import { api , fetchApi} from './utilitaires/api';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      user_id: 0,
      show_popUp: null,
      user_name: "",
      user_family_name: "",
      user_email: '',
    };
  }

  // componentDidMount() {
  //   if (tokenIsValid()) {
  //     let token = localStorage.getItem('token');
  //
  //
  //
  //
  //     let endpoint = "/api/users/login_token/?token=";
  //     let req = new api();
  //     req.open("GET", `${endpoint}${token}`);
  //
  //     let self = this;
  //     req.addEventListener("readystatechange", function () {
  //       if (this.readyState === 4) {
  //         if (this.status === 200) {
  //           let user = this.responseText[0];
  //           console.log(user);
  //           self.setState({
  //             user_id: user.id,
  //             logged_in: true,
  //           });
  //           getUserProfileAPIRequest(userFromToken().id);
  //         }
  //         if (this.status === 404) {
  //           // document.getElementById("AfficheUserName").innerHTML = "";
  //           //historique.push('/');
  //         }
  //       }
  //     });
  //
  //     req.send();
  //
  //   }
  //   else{
  //     // document.getElementById("AfficheUserName").innerHTML = "";
  //   }
  // }

//   display_popUp (type){
// ;
//   };

  popUp(){
    let Dial = this.state.show_popUp;
    if(Dial === null)
      return null;

    return (<Dial
         handle_deconnexion={this.handle_deconnexion}
         handle_connexion={this.on_login}
         closeMe={() => this.setState({show_popUp: null})}
         user_id={this.state.user_id}
        />);



/*    let p;
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
    return p;*/
  };

  //called after sucessfull login. fetch user data
  on_login = (u_id, u_token, user_email) => {
    localStorage.setItem('token',u_token);
    localStorage.setItem('user_id',u_id);


    fetchApi(`/users/${u_id}/`).then((ans) => {
      localStorage.setItem('first_name', ans.first_name);
      localStorage.setItem('last_name', ans.last_name);

      this.setState({
        user_name: ans.first_name,
        user_family_name: ans.last_name,
        user_email: user_email,
        user_id: u_id,
        logged_in: true,
      });

    }).catch((err) => {
      console.log('failed to fetch profile');
      localStorage.setItem('token',null);
    });

    // getUserProfileAPIRequest(userFromToken().id, (text)=> this.setState({afficheNom: text} ));
    // this.setState({
    //   user_id: u_id,
    //   logged_in: true,
    // }, () => {
    //   historique.push('/');
    //   window.location.reload();
    // });


  };

  handle_deconnexion = () => {
    localStorage.removeItem('token');
    // historique.push('/');
    this.setState({
      user_name: "",
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
            display_popUp={(type) =>     this.setState({ show_popUp: type })}
            afficheNom={this.state.user_name + ' ' + this.state.user_family_name}
          />
          <Layout />
          <div className="Body" style={{textAlign: "center"}}>
            <Routes
              user_id={this.state.user_id}
              user_name={this.state.user_name}
              user_email={this.state.user_email}
              user_family_name={this.state.user_family_name}
              display_popUp={(type) =>     this.setState({ show_popUp: type })}
            />
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
