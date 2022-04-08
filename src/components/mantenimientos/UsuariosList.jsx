import React, { useEffect, useState, useContext } from 'react';

//Services
import { getUsuarios, getUsuario } from '../../services/usersServices'

//mui
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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
import DeleteIcon from '@mui/icons-material/Delete';

//modal
import  Modal  from 'react-bootstrap/Modal';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "12px",
      marginBottom: "8px"
    }
  }));


export default function UsuariosList() {



const classes = useStyles();
const navigate = useNavigate(); 

const [usuarios, setUsuarios] = useState([]);
const [usuario, setUsuario] = useState({});

const getUsuariosList = async () => {
    let resp = await getUsuarios();
    setUsuarios(resp);
}

const handleEdit = async (id) =>{  
  navigate(`/mantenimiento/usuario/edit/${id}`);
}

const redirect =(to) =>{   
    navigate(to);
}

useEffect(() => {
  getUsuariosList();
}, []);

  return (
    <div>
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" style={{color: "#083240"}}>
          Usuarios
        </Typography>
        <Button
          onClick={() => {
            let dataParameter = {
              id: 0,
              mode: "write",
            };
            sessionStorage.setItem(
              "parameterProject",
              JSON.stringify(dataParameter)
            );
            redirect("/mantenimiento/usuario");
          }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          NUEVO
        </Button>
      </div>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, boxShadow: 3 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Apellido</TableCell>
              <TableCell align="left">Correo</TableCell>
              <TableCell align="left">Usuario</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.apellido}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.correo}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.usuario}
                </TableCell>

                <TableCell align="right">
                  <Button
                    aria-label="delete"
                    onClick={() => {
                      handleEdit(row.idUsuario);
                    }}
                    endIcon={<AddIcon style={{ color: "#083240" }} />}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
