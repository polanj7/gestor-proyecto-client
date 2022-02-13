import React, { useState, useEffect } from 'react'

//components
import FormEditTaks from '../taks/FormEdit'
import ListTaks from '../taks/ListTaks'

//mui
import Typography from "@mui/material/Typography";

//icons
import ListAltIcon from '@mui/icons-material/ListAlt';

import  Modal  from 'react-bootstrap/Modal';

const isScrollable = true;

export default function ModalTaks({id, isOpen, setIsOpen}) {
 
  return (
    <>
      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        style={{ marginTop: 55, height: "85vh" }}
        size="lg"
        scrollable= {isScrollable}
        centered="true"      
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h3" color="primary">
              <ListAltIcon /> Tareas
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >  
          <ListTaks idProyecto={id} setIsOpen1 ={setIsOpen} />
        </Modal.Body>
      </Modal>
    </>
  );
}
