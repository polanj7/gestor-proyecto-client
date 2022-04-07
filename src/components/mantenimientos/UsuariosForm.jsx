import React, { useEffect, useState, useContext } from 'react';

//Services
import { getResponsables } from '../../services/usersServices'

//mui
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//icons
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

//context
import { ProjectContext } from '../../context/ProjectContext';

import SelectResponsable from "../controls/SelectResponsable";

//modal
import  Modal  from 'react-bootstrap/Modal';

//moment js
import Moment from 'react-moment';

export default function UsuariosForm() {


  const[nombre, setNombre] = useState('');
  const[apellido, setApellido] = useState('');
  const[correo, setCorreo] = useState('');
  const[usuario, setUsuario] = useState('');


  return (
    <Paper style={{ margin: 1, padding: 20 }} elevation={3}>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-sm-12">
              <div className="w-100">
                <div className="form-group">
                  <TextField
                    required
                    label="Nombre"
                    placeholder="Nombre"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={nombre}
                    onChange={({ target }) => setNombre(target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="w-100">
                <div className="form-group">
                  <TextField
                    required
                    label="Apellido"
                    placeholder="Apellido"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={apellido}
                    onChange={({ target }) => setApellido(target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="w-100">
                <div className="form-group">
                  <TextField
                    required
                    label="Correo"
                    placeholder="Correo"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={correo}
                    onChange={({ target }) => setCorreo(target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="w-100">
                <div className="form-group">
                  <TextField
                    required
                    label="Usuario"
                    placeholder="Usuario"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={usuario}
                    onChange={({ target }) => setUsuario(target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <Button
          variant="contained"
          color="primary"
          //onClick={handleNext}
          //endIcon={<ArrowCircleRightIcon />}
        >
          GUARDAR
        </Button>
        <Button
          variant="contained"
          color="primary"
          //onClick={handleNext}
          //endIcon={<ArrowCircleRightIcon />}
        >
          cancelar
        </Button>
      </div>
    </Paper>
  );
}
