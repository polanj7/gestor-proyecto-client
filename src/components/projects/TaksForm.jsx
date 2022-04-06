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

//componets
import TableTask from './TableTask';
import SelectResponsable from '../controls/SelectResponsable';

//modal
import  Modal  from 'react-bootstrap/Modal';

//moment js
import Moment from 'react-moment';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px"
  }
}));

export default function TaksForm(props) {
  const classes = useStyles();

  //states
  const{projectData, setProjectData} = useContext(ProjectContext); 
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[taksList, setTaksList] = useState(projectData.tareas);
  const[descripcionTarea, setDescripcionTarea] = useState('');
  const[inicioTarea, setInicioTarea] = useState(null);
  const[finTarea, setFinTarea] = useState(null);    
  const[responsables, setResponsables] = useState([]);
  const[selectedResponsable, setSelectedResponsable] = useState([]);

  /**/
  const[actividadIdx, setActividadIdx] = useState(-1);
  const[actividad, setActividad] = useState('');
  const[actividades, setActividades] = useState([]);

  /*
    actividad 1:  {
      nombre,
      IdActividad,
      idx,
      tareas: [
        {nombre, inicio, fin},
        {nombre, inicio, fin},
        {nombre, inicio, fin},
      ]
    },
     actividad 2:  {
      nombre,
      IdActividad,
      idx,
      tareas: [
        {nombre, inicio, fin},
        {nombre, inicio, fin},
        {nombre, inicio, fin},
      ]
    }
  */

  const handleAddActividades = () => {     
    setActividades(prev => [...prev, {nombre: actividad, idActividad: 0, tareas: []}]);
  }

  const handleShowModal= (idx) => {       
    setActividadIdx(idx);
    handleOpen();
    //let a = actividades[idx];
    //setActividades(prev => [...prev, {nombre: actividad, idActividad: 0, tareas: []}]);
  }

  const handleAddTareas = () => {  

    let tarea = {
      idTarea: 0, 
      idProyecto: null,
      descripcion: descripcionTarea,
      fechaInicio: inicioTarea,
      fechaFinal: finTarea,
      idResponsable: selectedResponsable,   
      idEstado: 1
    }

    actividades[actividadIdx].tareas.push(tarea);
    setIsModalOpen(prev => !prev);
    //setActividades(prev => [...prev, {nombre: actividad, idActividad: 0, tareas: []}]);
  }

  /**/

  //handles
  const handleClose = () =>{
    setIsModalOpen(false);
  }

  const handleOpen = () =>{
    setDescripcionTarea('');
    setInicioTarea(new Date());
    setFinTarea(new Date());
    setIsModalOpen(prev => !prev);
  }  
  
  const handleAddTaks = () => {
    let tareass = {
      idTarea: 0, 
      idProyecto: null,
      descripcion: descripcionTarea,
      fechaInicio: inicioTarea,
      fechaFinal: finTarea,
      idResponsable: selectedResponsable,   
      idEstado: 1
    }

    setTaksList(prev => [...prev, tareass]);
    setProjectData({...projectData, tareas: [...projectData.tareas, tareass]});
    
    handleClose();
  }

  const handleRemoveTask = (task) =>{
    console.log(projectData)
    const indexTask = projectData.tareas.indexOf(task);  
    projectData.tareas.splice(indexTask, 1);
    setProjectData(prev => prev = {...prev, tareas: [...prev.tareas]});
  }

  const getResponsablesd = async () =>{
    const resp = await getResponsables();
    setResponsables(resp);
  }


  useEffect(() =>{
    getResponsablesd();
  }, [])

  return (
    <>
      {/* <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Actividades      
        </Typography>
        {!props.disabled ? (
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            NUEVA ACTIVIDAD
          </Button>
        ) : (
          <></>
        )}
      </div> */}

      {/* <div style={{ height: "50vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableTask lista={taksList} handleRemoveTask={handleRemoveTask} />
          </div>
        </div>
      </div> */}

      <form>
        <div className="row">
          <div className="col-sm-12">
            <div className="w-100">
              <div className="form-group">
                <TextField
                  required
                  label="Actividad"
                  placeholder="Actividad"
                  sx={{ width: "50%", marginBottom: "16px" }}
                  value={actividad}
                  onChange={({ target }) => setActividad(target.value)}
                />
                <Button
                  onClick={handleAddActividades}
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  AGREGAR ACTIVIDAD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <ul>
        {
          actividades.map(({nombre, tareas}, idx) =>{
            return (
              <li>
                {nombre}{" "}
                <Button
                  onClick={() => {
                    handleShowModal(idx);
                  }}
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  AGREGAR TAREA
                </Button>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Descripción</TableCell>
                        {/* <TableCell align="right">Responsable</TableCell> */}
                        <TableCell align="right">Inicio</TableCell>
                        <TableCell align="right">Fin</TableCell>                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tareas.map((row, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.descripcion}
                          </TableCell>
                          <TableCell align="right"><Moment format="DD/MM/YYYY">{row.fechaInicio}</Moment></TableCell>
                          <TableCell align="right"><Moment format="DD/MM/YYYY">{row.fechaFinal}</Moment></TableCell>               
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>               
              </li>
            );
          })
        }
      </ul>

      <Modal show={isModalOpen} onHide={handleClose} style={{ marginTop: 100 }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h2" color="primary">
              Formulario de Tareas
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-sm-12">
                <div className="w-100">
                  <div className="form-group">
                    <TextField
                      required
                      label="Descripción"
                      placeholder="Descipción"
                      sx={{ width: "100%", marginBottom: "16px" }}
                      multiline
                      rows={3}
                      value={descripcionTarea}
                      onChange={({ target }) =>
                        setDescripcionTarea(target.value)
                      }
                    />
                  </div>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className={classes.toolbar}>
                      <DatePicker
                        openTo="day"
                        views={["year", "month", "day"]}
                        label="Year, month and date"
                        inputFormat="dd/MM/yyyy"
                        value={inicioTarea}
                        onChange={(newValue) => setInicioTarea(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Inicio"
                            sx={{ width: "50%", marginBottom: "16px" }}
                          />
                        )}
                      />

                      <DatePicker
                        openTo="day"
                        views={["year", "month", "day"]}
                        label="Year, month and date"
                        inputFormat="dd/MM/yyyy"
                        value={finTarea}
                        onChange={(newValue) => setFinTarea(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Fin"
                            sx={{
                              width: "49%",
                              marginBottom: "16px",
                              marginLeft: "16px",
                            }}
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>

                  <div className="form-group">
                    <SelectResponsable
                      responsables={responsables}
                      responsable={selectedResponsable}
                      setResponsable={setSelectedResponsable}
                      disabled={props.disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClose}
            endIcon={<CloseIcon />}
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTareas}
            endIcon={<DoneAllIcon />}
            sx={{ mr: 1 }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
