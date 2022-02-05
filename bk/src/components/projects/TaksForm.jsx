import React, { useState, useContext } from 'react';

//mui
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

//icons
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

//context
import { ProjectContext } from '../../context/ProjectContext'

//componets
import TableTask from './TableTask';

//modal
import  Modal  from 'react-bootstrap/Modal';
import { ContactMail } from 'material-ui-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export default function TaksForm() {
  const classes = useStyles();

  const {projectData, setProjectData} = useContext(ProjectContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const[taksList, setTaksList] = useState([]);
  const[newTaks, setNewTaks] = useState({});

  const[descripcionTarea, setDescripcionTarea] = useState('');
  const[inicioTarea, setInicioTarea] = useState('');
  const[finTarea, setFinTarea] = useState('');


  const handleClose = () =>{
    setIsModalOpen(false);
  }

  const handleOpen = () =>{
    setDescripcionTarea('');
    setInicioTarea(null);
    setFinTarea(null);
    setIsModalOpen(prev => !prev);
  }  

  const handleAddTaks = () => {
    let dataTpm = {
      id: taksList.length + 1,
      descripcion: descripcionTarea,
      fechaInicio: inicioTarea,
      fechaFinal: finTarea
    }

    setProjectData(prev => [...prev.tareas, dataTpm])

    setTaksList(prev => [...prev, dataTpm])
    handleClose();    
  }

  console.log('projectData', projectData)

  return (
    <>
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Tareas / Metas
        </Typography>

        <Button
          onClick={handleOpen}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          NUEVO TAREA
        </Button>
      </div>

      <div style={{ height: "40vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableTask lista={taksList} />
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
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      className="form-control form-control-border w-100"
                      id="descripcion"
                      placeholder="Descipción Proyecto"
                      value={descripcionTarea}
                      onChange={({ target }) =>
                        setDescripcionTarea(target.value)
                      }
                    />
                  </div>

                  <div className="row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="fechaInicio">Inicio</label>
                      <input
                        type="date"
                        className="form-control form-control-border w-100"
                        id="fechaInicio"
                        value={inicioTarea}
                        onChange={({ target }) =>
                          setInicioTarea(target.value)
                        }
                      />
                    </div>

                    <div className="form-group col-sm-6">
                      <label htmlFor="fechafin">Fin</label>
                      <input
                        type="date"
                        className="form-control form-control-border w-100"
                        id="fechaFin"
                        value={finTarea}
                        onChange={({ target }) =>
                          setFinTarea(target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                      <label htmlFor="responsable">Responsable</label>
                      <input
                        type="text"
                        className="form-control form-control-border w-100"
                        id="responsable"
                        placeholder='Responsable de la tarea'                       
                      />
                    </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            endIcon={<CloseIcon />}
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button
            variant="outlined"
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
