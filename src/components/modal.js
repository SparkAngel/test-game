import React from 'react';
import { connect } from 'react-redux';
import { showModalCreator} from '../reducers/gameReducer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const ModalComponent = ({showModal, register:{show, aiWin, youWin}}) => {
  const handleClose = () => (       //функция для диспатча в редакс и закрытия модпльного окна
    showModal(false),
    window.location.reload()
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{aiWin > youWin ? 'AI WIN' : 'YOU WIN'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title>
            Next Game ?
        </Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    register: state.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (value) => {
      dispatch(showModalCreator(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
