import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user_id: 0,
      show_popUp: "",
    };
  }

  render () {
    return (
    <div className="App">
      <div className="background">
        <div className="header">
          <Header
            loggedIn={this.state.loggedIn}
            show_popUp={this.show_popUp}
          />
        </div>
        <div className="Body">
          <div id="bodyContent">
            <p>En cours de travail</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;