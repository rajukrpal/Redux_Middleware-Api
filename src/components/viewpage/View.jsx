import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const View = ({ id, openModel, setOpenModel }) => {
  console.log("openModel", openModel);
  const AllUsers = useSelector((state) => state.app.users);
  const singalUser = AllUsers.filter((user) => user.id === id)[0];
  return (
      <div className="modal-container">
      <div className="modal-background">
        <Modal
          show={openModel}
          onHide={() => setOpenModel(false)}
          centered  
        >
          <Modal.Header closeButton>
            <Modal.Title>{singalUser.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Email: {singalUser.email}</p>
            <p>Age: {singalUser.age}</p>
            <p>Gender: {singalUser.gender}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => setOpenModel(false)} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default View;
