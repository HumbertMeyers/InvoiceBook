import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import "./FormSign.css";

class Deconnexion extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handle_deconnexion();
    this.props.closeMe();
  };

  render() {
    return (
      <>
        {/* Sign-out popup */}
        <Modal
          show={true}
          onHide={this.props.closeMe}
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
                  onClick={this.props.closeMe}
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
