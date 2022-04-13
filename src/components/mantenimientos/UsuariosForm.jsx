import React, { useEffect, useState, useContext } from 'react';

//Services
import { getResponsables, addUsuario, getUsuario, editUsuario } from '../../services/usersServices'

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

import { useNavigate, useParams } from 'react-router-dom';

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

  const params = useParams();

  const navigate = useNavigate(); 
  const[idUsuario, setIdUsuario] = useState(0);
  const[nombre, setNombre] = useState('');
  const[apellido, setApellido] = useState('');
  const[correo, setCorreo] = useState('');
  const[usuario, setUsuario] = useState('');

  const createUser = async () =>{

    await addUsuario({
      nombre,
      apellido,
      correo,
      usuario
    });

    redirect("/mantenimiento/usuarios");
  }

  const updateUser = async () => {

    await editUsuario({
      idUsuario,
      nombre,
      apellido,
      correo,
      usuario
    });

    redirect("/mantenimiento/usuarios");
  }

  const redirect =(to) =>{   
    navigate(to);
  }

  const getEditUsuario = async () =>{
    let resp = await getUsuario(params.id);
    setIdUsuario(resp.idUsuario);
    setNombre(resp.nombre);
    setApellido(resp.apellido);
    setCorreo(resp.correo);
    setUsuario(resp.usuario);
  }

  useEffect(() => {   
    getEditUsuario();
  }, [params.id])

  return (
    <div className="container">
      <Typography variant="h5" component="h2" style={{ color: "#083240" }}>
        Usuario
      </Typography>
      <Paper style={{ margin: 1, padding: 20 }} elevation={3}>
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
          style={{marginRight: "10px"}}
          onClick={() => { params.id > 0 ? updateUser() : createUser() }}
          //endIcon={<ArrowCircleRightIcon />}
        >
          GUARDAR
        </Button>

        <Button
          variant="contained"
          color="error"
          //onClick={handleNext}
          //endIcon={<ArrowCircleRightIcon />}
        >
          cancelar
        </Button>
      </Paper>
    </div>
  );
}
