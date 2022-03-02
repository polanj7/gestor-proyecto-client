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
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Tareas / Metas       
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

      <div style={{ height: "50vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableTask lista={taksList} handleRemoveTask={handleRemoveTask} />
          </div>
        </div>
      </div>

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
                            variant="standard"
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
