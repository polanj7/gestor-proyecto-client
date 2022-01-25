import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function Delete() {

    const [show, setShow] = useState(false);
    const handleModalState = () => setShow(x => !x);


  return (
     <>
        <Button variant="danger" onClick={handleModalState}>
            Delete
        </Button>

        <Modal show={show} onHide={handleModalState}>
            <Modal.Header closeButton>
            <Modal.Title>Deseas elminar el Proyecto?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                El registro sera eliminar junto a todas sus dependencias
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalState}>
                    Salir
                </Button>
                <Button variant="primary" onClick={handleModalState}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
