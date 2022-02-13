import React, {useState, useEffect} from 'react'
import Moment from 'react-moment';


import { getProjects, deleteProject } from '../../services/projectsServices';
import { getTaksByProject, getTaksByID, deleteTaks } from '../../services/taksServices';
//mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

import ModalForm from './ModalForm';

//sweet alert
import swal from 'sweetalert';
import FormEdit from './FormEdit';


const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    },
    subToolbar:{
      display: "flex",
      justifyContent: "space-between"
    },
    cursorBtn:{
      cursor: "pointer"
    }  
}));

export default function ListTaks({idProyecto, setIsOpen1}) {
  const classes = useStyles();
  const [taksLista, setTaksLista] = useState([]);
  const[idTarea, setIdTarea] = useState(0)
  const[isOpen, setIsOpen] = useState(false)
  const[reloadData, setReloadData] = useState(false)

  const[data, setData] = useState({
    idTarea: 0,
    descripcion: '',
    idProyecto: idProyecto,
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    idEstado: 1
  });
    
  const handleGetTaksByID = (id) =>{
    setIdTarea(id);
    setIsOpen(true);
  }

  const handleRemoveTaks = (id, descripcion) =>{
    swal({
      title: `Deseas eliminar la tarea ${descripcion}?`,
      text: "Despues de elminar el registro, el mismo no podrá ser recuperado!",
      icon: "warning",
      buttons: true,     
    }).then((willDelete) => {
      if (willDelete) {        
        deleteTaks(id).then((resp) => {
          //mensaje de confirmación
          swal(`La tarea ${descripcion} fue eliminada!`, {
            icon: "success",
          });          
          setReloadData(prev => !prev)
        });    
      }
    });    
  }

  useEffect(async()=>{
    const dataTaks = await getTaksByProject(idProyecto);    
    setTaksLista(dataTaks);    
  }, [reloadData])  

  return (
    <>
      <div>
        <Accordion style={{ width: "100%", marginBottom: "12px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Nueva Tarea</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <FormEdit
                idTarea={idTarea}
                idProyecto={idProyecto}
                setReloadData={setReloadData}
                data ={data}
                setData = {setData}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>        
        {taksLista.map((x, idx) => {
          return (
            <>
              <ListItem key={idx} sx={{ width: 470 }}>
                <ListItemText
                  primary={
                    <div className={classes.toolbar}>
                      <Typography
                        variant="body1"
                        component="h1"
                        sx={{ color: "#ed6c02" }}
                      >
                        {x.descripcion}
                      </Typography>
                      <Box className={classes.subToolbar}>
                        <EditIcon
                          onClick={() => handleGetTaksByID(x.idTarea)}
                          title="Editar"
                          color="primary"
                          sx={{ marginRight: 1 }}
                          style={{ cursor: "pointer" }}
                        />
                        <DeleteIcon
                          onClick={() =>
                            handleRemoveTaks(x.idTarea, x.descripcion)
                          }
                          title="Eliminar"
                          color="error"
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                    </div>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle2" component="h2">
                        Responsable: José Ortiz
                      </Typography>

                      <Typography variant="subtitle2" component="h2">
                        {"Desde "}
                        <Moment format="DD/MM/YYYY">{x.fechaInicio}</Moment>
                        {" hasta "}
                        <Moment format="DD/MM/YYYY">{x.fechaFinal}</Moment>
                      </Typography>

                      <Typography variant="subtitle2" component="h2">
                        Estado:{" "}
                        <Chip
                          icon={<CheckBoxIcon />}
                          label="Activo"
                          color="success"
                          variant="outlined"
                        />
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </>
          );
        })}
      </List>

      {/* <ModalForm
        idTarea={idTarea}
        idProyecto={idProyecto}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setReloadData={setReloadData}
        setIsOpen1={setIsOpen1}
      /> */}
    </>
  );
}
