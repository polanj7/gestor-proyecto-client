import React, { useState, useEffect } from 'react'

//components
import FormEditTaks from '../taks/FormEdit'
import ListTaks from '../taks/ListTaks'

//mui
import Typography from "@mui/material/Typography";

//icons
import ListAltIcon from '@mui/icons-material/ListAlt';

import  Modal  from 'react-bootstrap/Modal';


export default function ModalForm(props) {  
  return (
    <>
      <Modal
        show={props.isOpen}
        onHide={props.setIsOpen(false)}
        style={{ marginTop: 55, minHeight: "300px" }}  
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h2" color="primary">
              <ListAltIcon /> Detalle 123
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable = {true}>
          <FormEditTaks {...props} />
        </Modal.Body>
      </Modal>
    </>
  );
}
