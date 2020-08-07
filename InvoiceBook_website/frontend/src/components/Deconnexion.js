import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import "./FormSign.css";

class Deconnexion extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = true;
  }

  componentDidUpdate() {
    this.showPopUp = this.props.showPopUp;
  }

  closePopUp = () => {
    this.showPopUp = false;
    this.forceUpdate();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handle_deconnexion();
    this.closePopUp();
  };

  render() {
    return (
      <>
        {/* Sign-out popup */}
        <Modal
          show={this.showPopUp}
          onHide={() => {
            this.closePopUp();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Deconnexion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="signOutForm" onSubmit={this.handleSubmit}>
              <label className="FormField_Label">
                {" "}
                Êtes vous sur de vouloir vous déconnecter ?
              </label>

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
                  value="Se Déconnecter"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Deconnexion;

Deconnexion.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  handle_deconnexion: PropTypes.func.isRequired,
};
