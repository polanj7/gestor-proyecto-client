import React, { useEffect, useState } from 'react';
import Table from './Table';

import { getProjects } from '../../services/projects'
import { Button, Modal } from 'react-bootstrap';
import Edit from './Edit' 
import Login from '../login/Login';


export default function Index() {

  const [projects, setProjects] = useState([]);
  
  /*modal*/
  const [show, setShow] = useState(false);
  const handleModalState = () => setShow(x => !x);

 

  useEffect(() => {

    getProjects().then(resp =>{
      setProjects(resp);
    })

  }, [])


  return (
    <div className="contentBody">
     

    <Login/>

      <Table projects={projects} />

      <>
        {/* <Button variant="danger" onClick={handleModalState}>
          Delete
        </Button> */}

        <Modal 
          show={show} 
          onHide={handleModalState}  
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"> 
          <Modal.Header closeButton>
            <Modal.Title>Deseas elminar el Proyecto?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Edit />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalState}>
              Salir
            </Button>
            <Button variant="primary" >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
