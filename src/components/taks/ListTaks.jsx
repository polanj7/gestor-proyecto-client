import React, {useState, useEffect} from 'react'
import Moment from 'react-moment';

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
// import LoadingButton from '@mui/lab/LoadingButton';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

//react-query
import { useQuery } from 'react-query';

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
  const[reloadData, setReloadData] = useState(false)
  const[expanded, setExpanded] = useState(false);
  let countTaks  = taksLista.length;
    
  const handleGetTaksByID = (id) =>{
    setIdTarea(id);
    setExpanded(true);
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
          setReloadData(prev => !prev)
        });    
      }
    });    
  }

  const handleExpanded = async () =>{
    setIdTarea(0);
    setExpanded(prev => !prev);
  }


  useEffect(async()=>{
    const dataTaks = await getTaksByProject(idProyecto);    
    setTaksLista(dataTaks);    
  }, [reloadData])  


  return (
    <>
      {!expanded ? (
        <>
          <div className={classes.toolbar}>
            <Typography variant="subtitle2" align="right">
              Cantidad de Tareas: {countTaks}
            </Typography>
            <Button
              onClick={() => handleExpanded(true)}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              NUEVA TAREA
            </Button>
          </div>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {taksLista.map((x, idx) => {
              console.log(x)
              return (
                <>
                  <ListItem key={idx} sx={{ width: "100%" }}>
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
                            Responsable: {`${x.responsable.nombre} ${x.responsable.apellido}`}
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
                              label={x.estado.nombre}
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
        </>
      ) : (
        <>
          {" "}
          <FormEdit
            idTarea={idTarea}
            idProyecto={idProyecto}
            setReloadData={setReloadData}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </>
      )}
    </>
  );
}
