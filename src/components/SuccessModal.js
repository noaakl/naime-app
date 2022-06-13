import { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

const SuccessModal = ({ show, username }) => {
  const navigate = useNavigate();
  const login = useCallback(() => navigate('/login', { replace: true }), [navigate]);

  return (
    <Modal show={show} onHide={() => login()}>
      <Modal.Body>
        User <strong>{username}</strong> successfully registered
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => login()} style={{ backgroundColor: "green" }}>
          Sign Me In
        </Button>
      </Modal.Footer>
    </Modal>


  );
}
export default SuccessModal;

