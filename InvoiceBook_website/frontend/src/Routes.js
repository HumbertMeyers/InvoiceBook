import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import Home from "./pages/Home.js";
import Help from "./pages/Help.js";
import Profile from "./pages/Profil.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import AjoutClient from "./pages/AjoutClients.js";
import AjoutFacture from "./pages/Factures/Ajout.js";
import RechercheFacture from "./pages/Factures/Recherche.js";
import AjoutFournisseur from "./pages/AjoutFournisseur.js";


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Profil" component={Profile} />
        <Route exact path="/Help" component={Help} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Clients" component={AjoutClient} />
        <Route exact path="/AjoutFacture" component={AjoutFacture} />
        <Route exact path="/RechercheFactures" component={RechercheFacture} />
        <Route exact path="/Fournisseurs" component={AjoutFournisseur} />
        <Route render={function () {
              return <p>Not found</p>
            }} />
        {/* Finally, catch all unmatched routes */}
      </Switch>
    );
  }
}



export default Routes;