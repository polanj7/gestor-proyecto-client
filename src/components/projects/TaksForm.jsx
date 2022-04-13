import React, { useEffect, useState, useContext } from 'react';

//Services
import { getResponsables } from '../../services/usersServices'
import NumberFormat from 'react-number-format'; 
//mui
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//icons
import Editcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

//context
import { ProjectContext } from '../../context/ProjectContext';

//componets
import TableTask from './TableTask';
import SelectResponsable from '../controls/SelectResponsable';

//modal
import  Modal  from 'react-bootstrap/Modal';

//moment js
import Moment from 'react-moment';
import PeriodoSelect from '../controls/PeriodoSelect';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px"
  
  }
}));

const periodos = [
  {nombre: "Semanal"},
  {nombre: "Quincenal"},
  {nombre: "Mensual"},
  {nombre: "Trimestral"}
]


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
});

export default function TaksForm(props) {
  const classes = useStyles();

  //states
  const{projectData, setProjectData} = useContext(ProjectContext); 
  const[isModalOpenActividades, setIsModalOpenActividades] = useState(false);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[descripcionTarea, setDescripcionTarea] = useState('');  
  const[responsables, setResponsables] = useState([]);
  const[selectedResponsable, setSelectedResponsable] = useState(0);
  const[responsableLabel, setResponsableLabel] = useState('');
  const[meta, setMeta] = useState(0);
  const[periodo, setPeriodo] = useState('');
  const[meses, setMeses] = useState(0);
  const[dias, setDias] = useState(0);
  const[montoPresupuestarioDOP, setMontoPresupuestarioDOP] = useState(0);
  const[montoPresupuestarioUSD, setMontoPresupuestarioUSD] = useState(0);
  const[resultado, setResultado] = useState('');
  const[posiblesRiesgos, setPosiblesRiesgos] = useState('');
  const[accionMitigacion, setAccionMitigacion] = useState('');

  /**/
  const[actividadIdx, setActividadIdx] = useState(-1);
  const[actividad, setActividad] = useState('');

  const handleAddActividades = () => {    

    let newActividad = {
      idActividad: 0,
      descripcion: actividad,
      idProyecto: 0,
      orden: 0,
      tareas: []
    }

    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          actividades: [...prev.actividades, newActividad],
        })
    );

    setActividad('');
    handleOpenActividades();
    setActividadIdx(-1);
  }

  const handleAddActividadesUpdate = () =>{

    console.log('actividadIdx', actividadIdx)
    
    Object.keys(projectData.actividades[actividadIdx]).forEach(key => {
      projectData.actividades[actividadIdx]['descripcion'] = actividad;
    });

    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          actividades: [...prev.actividades],
        })
    );

    setActividad('');
    handleOpenActividades();
    setActividadIdx(-1);
  }
  
  const handleShowModal= (idx) => {       
    setActividadIdx(idx);
    handleOpen();    
  }

  const handleShowModalActividad = (idx) => {       
    setActividadIdx(idx);
    let {descripcion} = projectData.actividades[idx];
    setActividad(descripcion);


    handleOpenActividades();    
  }

  const handleRemoveActividad= (idx) => {       
    projectData.actividades.splice(idx, 1); 
    setProjectData(prev => prev = {...prev, actividades: [...prev.actividades]});
  }

  const handleAddTareas = () => {  

    let tarea = {
      idTarea: 0,       
      descripcion: descripcionTarea,
      idActividad: 0,
      idResponsable: selectedResponsable,    
      idEstado: 1,
      fechaCreacion: new Date(),
      responsableLabel: responsableLabel,
      meta, 
      periodo ,
      meses ,
      dias ,
      montoPresupuestarioDOP,
      montoPresupuestarioUSD,
      resultado,
      posiblesRiesgos,
      accionMitigacion,
    }

    projectData.actividades[actividadIdx].tareas.push(tarea);

    setIsModalOpen(prev => !prev);    
  }

  const handleRemoveTarea = (idx1, idx2) => {      

    projectData.actividades[idx1].tareas.splice(idx2, 1);
    setProjectData(prev => prev = {...prev, actividades: [...prev.actividades]});
  }

  //handles
  const handleClose = () =>{
    setIsModalOpen(false);
  }

  const handleCloseActividades = () =>{
    setIsModalOpen(false);
  }

  const handleOpen = () =>{
    setDescripcionTarea('');
    setIsModalOpen(prev => !prev);
  }  

  const handleOpenActividades = () => {  
    setIsModalOpenActividades(prev => !prev);
  }  
  
  const handleAddTaks = () => {
    let tareass = {
      idTarea: 0, 
      descripcion: descripcionTarea,
      idResponsable: selectedResponsable,       
      idActividad: actividad, 
      meta, 
      periodo,
      meses,
      dias,
      montoPresupuestarioDOP,
      montoPresupuestarioUSD,
      resultado,
      posiblesRiesgos,
      accionMitigacion,       
      FechaCreacion: new Date(), 
      idEstado: 1
    }

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
      <div className={classes.toolbar} style={{ marginBottom: "10px" }}>
        <Typography variant="h5" component="h1" color="primary">
          Propuesta operativa
        </Typography>

        <Button
          onClick={handleOpenActividades}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          nueva actividad
        </Button>
      </div>

      <Dialog
        open={isModalOpenActividades}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseActividades}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "primary.dark" }}>
          {"Rgistro de Actividades"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Agregrar actividad al Proyecto</DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="actividad"
            label="Actividad"
            name="user"
            autoFocus
            variant="outlined"
            value={actividad}
            onChange={({ target }) => setActividad(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              actividadIdx < 0
                ? handleAddActividades
                : handleAddActividadesUpdate
            }
            variant="contained"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={12}>
          <table className="table table-bordered">
            <thead>
              <tr style={{ color: "#ed6c02" }}>
                <th>Actividad</th>
                <th style={{ width: "210px", textAlign: "center" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {projectData.actividades.length === 0 ? (
                <tr>
                  <td colspan={15} style={{ textAlign: "center" }}>
                    No hay actividades registradas!
                  </td>
                </tr>
              ) : (
                projectData.actividades?.map(
                  ({ descripcion, tareas }, idx1) => (
                    <tr style={{ color: "#083240" }}>
                      <td>
                        <h5>{descripcion}</h5>
                        <table
                          className="table table-bordered"
                          style={{ margin: "10px" }}
                        >
                          <thead>
                            <tr style={{ color: "#ed6c02" }}>
                              <th>Tarea</th>
                              <th>Meta</th>
                              <th>Periodo</th>
                              <th>Presupuesto</th>
                              <th>Resultado</th>
                              <th>Riesgos</th>
                              <th>Mitigación</th>
                              <th
                                style={{ width: "150px", textAlign: "center" }}
                              >
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tareas.map((row, idx2) => (
                              <tr>
                                <td>{row.descripcion}</td>
                                <td>{row.meta}</td>
                                <td>{row.periodo}</td>
                                <td>
                                  DOP: {row.montoPresupuestarioDOP}, USD:{" "}
                                  {row.montoPresupuestarioUSD}
                                </td>
                                <td>{row.resultado}</td>
                                <td>{row.posiblesRiesgos}</td>
                                <td>{row.accionMitigacion}</td>
                                <td>
                                  <Button
                                    aria-label="add"
                                    onClick={() => {
                                      handleShowModal(idx1);
                                    }}
                                  >
                                    <Editcon />
                                  </Button>

                                  <Button
                                    aria-label="delete"
                                    onClick={() => {
                                      handleRemoveTarea(idx1, idx2);
                                    }}
                                    endIcon={
                                      <DeleteIcon style={{ color: "red" }} />
                                    }
                                  ></Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <Button
                          aria-label="add"
                          onClick={() => {
                            handleShowModal(idx1);
                          }}
                        >
                          <AddIcon />
                        </Button>

                        <Button
                          aria-label="add"
                          onClick={() => {
                            handleShowModalActividad(idx1);
                          }}
                        >
                          <Editcon />
                        </Button>

                        <Button
                          aria-label="delete"
                          onClick={() => {
                            handleRemoveActividad(idx1);
                          }}
                          endIcon={<DeleteIcon style={{ color: "red" }} />}
                        ></Button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>

          {/* <List dense={true}>
            {projectData.actividades?.map(({ descripcion, tareas }, idx1) => {
              return (
                <>
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleShowModal(idx1);
                          }}
                        >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleRemoveActividad(idx1);
                          }}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FormatListBulletedIcon style={{ color: "#ed6c02" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={descripcion} />
                  </ListItem>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tarea</TableCell>
                          <TableCell align="right">Responsable</TableCell>
                          <TableCell align="right">Inicio</TableCell>
                          <TableCell align="right">Fin</TableCell>
                          <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tareas.map((row, idx2) => (
                          <TableRow
                            key={idx2}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.descripcion}
                            </TableCell>
                            <TableCell align="right">
                              respondable name
                            </TableCell>
                            <TableCell align="right">
                              <Moment format="DD/MM/YYYY">
                                {row.fechaInicio}
                              </Moment>
                            </TableCell>
                            <TableCell align="right">
                              <Moment format="DD/MM/YYYY">
                                {row.fechaFinal}
                              </Moment>
                            </TableCell>

                            <TableCell align="right">
                              <Button
                                aria-label="delete"
                                onClick={() => {
                                  handleRemoveTarea(idx1, idx2);
                                }}
                                endIcon={
                                  <DeleteIcon style={{ color: "red" }} />
                                }
                              ></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                </>
              );
            })}
          </List> */}
        </Grid>
      </Box>

      {/* <ul>
        {
          projectData.actividades.map(({descripcion, tareas}, idx) =>{
            return (
              <li>
                {descripcion}{" "}
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
                        <TableCell align="right">Responsable</TableCell> 
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
      </ul> */}

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
                      value={descripcionTarea}
                      onChange={({ target }) =>
                        setDescripcionTarea(target.value)
                      }
                    />
                  </div>

                  <TextField
                    required
                    label="Meta"
                    placeholder="Descipción"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={meta}
                    onChange={({ target }) => setMeta(target.value)}
                  />

                  <PeriodoSelect
                    periodos={periodos}
                    periodo={periodo}
                    setPerido={setPeriodo}
                  />

                  <div className={classes.toolbar}>
                    <TextField
                      required
                      label="Dias"
                      placeholder="Dias"
                      sx={{ width: "49%", marginBottom: "16px" }}
                      value={dias}
                      onChange={({ target }) => setDias(target.value)}
                    />

                    <TextField
                      required
                      label="Meses"
                      placeholder="Meses"
                      sx={{ width: "49%", marginBottom: "16px" }}
                      value={meses}
                      onChange={({ target }) => setMeses(target.value)}
                    />
                  </div>

                  <div className={classes.toolbar}>
                    <TextField
                      label="Donación DOP"
                      sx={{ width: "49%", marginBottom: "16px" }}
                      name="numberformat"
                      id="formatted-numberformat-input"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      value={montoPresupuestarioDOP}
                      onChange={({ target }) =>
                        setMontoPresupuestarioDOP(target.value)
                      }
                    />

                    <TextField
                      label="Donación USD"
                      sx={{ width: "49%", marginBottom: "16px" }}
                      name="numberformat"
                      id="formatted-numberformat-input"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      value={montoPresupuestarioUSD}
                      onChange={({ target }) =>
                        setMontoPresupuestarioUSD(target.value)
                      }
                    />
                  </div>

                  <TextField
                    required
                    label="Resultado"
                    placeholder="Resultado"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={resultado}
                    onChange={({ target }) => setResultado(target.value)}
                  />

                  <TextField
                    required
                    label="Posibles Riesgos"
                    placeholder="Riesgos"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={posiblesRiesgos}
                    onChange={({ target }) => setPosiblesRiesgos(target.value)}
                  />

                  <TextField
                    required
                    label="Acción Mitigación"
                    placeholder="Mitigación"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={accionMitigacion}
                    onChange={({ target }) => setAccionMitigacion(target.value)}
                  />

                  <div className="form-group">
                    <SelectResponsable
                      responsables={responsables}
                      responsable={selectedResponsable}
                      setResponsable={setSelectedResponsable}
                      setResponsableLabel={setResponsableLabel}
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
