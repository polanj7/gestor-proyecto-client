import React, { useEffect, useState } from 'react';
import Table from './Table';

import { getProjects } from '../../services/projectsServices';
import { Button, Modal } from 'react-bootstrap';

import { getProvincias } from '../../services/territoriesServices'

import { Outlet, useNavigate } from 'react-router-dom';


export default function Index() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  
  /*modal*/
  const [show, setShow] = useState(false);
  const handleModalState = () => setShow(x => !x); 


  const redirect =(to) =>{
    navigate(to);
    handleModalState();
  }

  useEffect(() => {
    getProjects().then(resp =>{
      setProjects(resp);
    })

   getProvincias().then(resp => resp);

  }, [])

  return (
    <>
      <div className="card p-2">
        <div className="contentBody">
          <div className="card">
            <br />
            <div className="card-header">
              <h3 className="card-title">Listado de Proyectos</h3>
              <div className="card-tools">                     
                  <span className="btn btn-sm btn-primary" onClick={() => { redirect('new2/f-1') }}>
                    <i className="fas fa-plus" /> Agregar
                  </span>              
              </div>
            </div>
            <Table />
          </div>          
        </div> 

        <Modal
          size="xl"
          show={show}
          onHide={() => {redirect('/project')}}         
          aria-labelledby="example-custom-modal-styling-title"          
        >
          <Modal.Header closeButton>
            <Modal.Title>Proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Outlet />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleModalState}>
              Salir
            </Button>
            <Button variant="primary">Eliminar</Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    </>
  );
}
