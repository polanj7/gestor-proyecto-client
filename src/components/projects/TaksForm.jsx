import React, { useState, useContext } from 'react';

//mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//icons
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

//context
import { ProjectContext } from '../../context/ProjectContext';

//componets
import TableTask from './TableTask';

//modal
import  Modal  from 'react-bootstrap/Modal';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px"
  }
}));

export default function TaksForm(props) {

  console.log("props.disabled", props.disabled)
  const classes = useStyles();

  //states
  const {projectData, setProjectData} = useContext(ProjectContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[taksList, setTaksList] = useState(projectData.tareas);
  const[descripcionTarea, setDescripcionTarea] = useState('');
  const[inicioTarea, setInicioTarea] = useState('');
  const[finTarea, setFinTarea] = useState('');
  const[minDateFinal, setMinDateFinal] = useState(new Date());

  const[dataTaks, setDataTaks] = useState({
    idTarea: 0,
    descripcion: '',
    idProyecto: 0,
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    idEstado: 1
  });     

  //hendles
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
      idProyecto: 0,
      descripcion: descripcionTarea,
      fechaInicio: inicioTarea,
      fechaFinal: finTarea,
      idEstado: 1
    }

    setTaksList(prev => [...prev, tareass])    
    setProjectData({...projectData, tareas: [...projectData.tareas, tareass]})
    
    handleClose();
  }

  const handleRemoveTask = (row) =>{
    console.log(row)
  }

  return (
    <>
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Tareas / Metas
          <h1>{props.disabled}</h1>
        </Typography>
        {!props.disabled ? (
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            NUEVO TAREA
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            {
              taksList.map((row, idx) => (
                <TableTask key={idx} row={row} handleRemoveTask={handleRemoveTask} />
              ))
            }
          </Grid>
      </Grid>
      {/* <div style={{ height: "50vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableTask lista={taksList} handleRemoveTask={handleRemoveTask} />
          </div>
        </div>
      </div> */}

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
                      variant="standard"
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
                        minDate={new Date()}
                        openTo="day"
                        views={["year", "month", "day"]}
                        label="Year, month and date"
                        inputFormat="dd/MM/yyyy"
                        value={inicioTarea}
                        onChange={({ target }) => setInicioTarea(target.value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Inicio"
                            variant="standard"
                            sx={{ width: "50%", marginBottom: "16px" }}
                          />
                        )}
                      />

                      <DatePicker
                        minDate={minDateFinal}
                        openTo="day"
                        views={["year", "month", "day"]}
                        label="Year, month and date"
                        inputFormat="dd/MM/yyyy"
                        value={finTarea}
                        onChange={({ target }) => setFinTarea(target.value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Fin"
                            variant="standard"
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
                    <TextField
                      required
                      label="Responsable"
                      variant="standard"
                      placeholder="-Select-"
                      sx={{ width: "100%", marginBottom: "16px" }}
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
            onClick={handleAddTaks}
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
