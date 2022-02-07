import React, {useState, useEffect} from "react";
import { useNavigate }  from 'react-router-dom';
import Moment from 'react-moment';
import './index.css'

//services
import { getProjects, deleteProject } from '../../services/projectsServices';
import { getTaksByProject } from '../../services/taksServices';
//mui
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ListAltIcon from '@mui/icons-material/ListAlt';

//sweet alert
import swal from 'sweetalert';
//modal
import  Modal  from 'react-bootstrap/Modal';
import { Divider } from "@mui/material";

export default function Table() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [refreshAfterDelete, setRefreshAfterDelete] = useState(false); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taksLista, setTaksLista] = useState([]);


  const handleCloseModal = () =>{
    setIsModalOpen(false);
  }

  const handleEditProject = (id) => {
    navigate(`/project/new2/${id}`)
  }

  const handleOpenModalTaks = async (id) =>{
    const dataTaks = await getTaksByProject(id);
    setTaksLista(dataTaks);   
    
    if(dataTaks.length > 0){
      setIsModalOpen(true);
    }    
  }

  const removeProject = (id, codigo) => {   
    swal({
      title: `Deseas eliminar el proyecto ${codigo}?`,
      text: "Despues de elminar el registro, el mimso no podrá ser recuperado!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProject(id).then((resp) => {
          setRefreshAfterDelete((x) => !x);
        });    
        //mensaje de confirmación
        swal(`El proyecto ${codigo} fue eliminado!`, {
          icon: "success",
        });
      }
    });    
  }
  
  useEffect(() => {
    getProjects().then(resp =>{
      setProjects(resp);
    })

  }, [refreshAfterDelete])

  const columns = [
    { field: "idProyecto", headerName: "ID", width: 1, headerClassName: "super-app-theme--header"},
    { field: "codigo", headerName: "Codigo", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 350 },
    {
      field: "fechaInicio",
      headerName: "Inicio",
      width: 100,
      type: "date",
      renderCell: (params) => <Moment format="DD/MM/YYYY">{params.value}</Moment>,
    },
    {
      field: "fechaFinal",
      headerName: "Final",
      width: 100,
      type: "date",
      renderCell: (params) => <Moment format="DD/MM/YYYY">{params.value}</Moment>,
    },
    {
      field: "cantidadTareas",
      headerName: "Cantidad de Tareas",
      align: "center",
      width: 200,
      renderCell: (params) => (
       
        <strong>          
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ width: 10, marginLeft: 16 }}
            onClick={() => {handleOpenModalTaks(params.id)}}
            endIcon={params.value > 0 ? <VisibilityOutlinedIcon title="Ver Tareas" /> : <VisibilityOffIcon title="Sin tareas" /> }
          >            
            {params.value}
          </Button>          
        </strong>
      ),
    },
    {
      field: "cantidadTareasCompletadas",
      headerName: "Tareas Ejecutadas",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <strong>
          {/* {params.value} */}
          <Button
            variant="outlined"
            color="warning"
            size="small"
            style={{ width: 100 }}
          >
            {params.value}%
          </Button>
        </strong>
      ),
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({id, row}) => {
        console.log(id)
        return [
          <GridActionsCellItem
            title="Detalle"
            icon={<VisibilityOutlinedIcon />}
            label="Detalle"
            onClick={() => alert(id)}
            color="primary"
          />,
          <GridActionsCellItem
            title="Editar"
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEditProject(id)}
            color="primary"
          />,
          <GridActionsCellItem
            title="Eliminar"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => removeProject(id, row.codigo)}
            color="error"
          />,
        ];
      },
    },
  ];  

  return (
    <>
      <DataGrid
        getRowId={(row) => row.idProyecto}
        component={Paper}
        rows={projects}
        columns={columns}
        pageSize={10}
        sx={{
          boxShadow: 3,
          border: 1,
          borderColor: 'primary.light',
          "& .MuiDataGrid-cell:hover": {
              color: 'secundary.light',
          },
        }}
      />

      <Modal show={isModalOpen} onHide={handleCloseModal} style={{ marginTop: 100 }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h2" color="primary">
              <ListAltIcon /> Listado de Tareas
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {
              taksLista.map(x=>{
                return (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="h6"
                              component="h1"
                              sx ={{color: "#ed6c02"}}
                            >
                              {x.descripcion}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography variant="subtitle2" component="h2">
                              Responsable: José Ortiz
                            </Typography>

                            <Typography variant="subtitle2" component="h2">
                              {"Desde "}
                              <Moment format="DD/MM/YYYY">
                                {x.fechaInicio}
                              </Moment>
                              {" hasta "}
                              <Moment format="DD/MM/YYYY">
                                {x.fechaFinal}
                              </Moment>
                            </Typography>

                            <Typography variant="subtitle2" component="h2">
                              Estado: Activo
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </>
                );
              })
            }
     
          </List>
        </Modal.Body>
        <Modal.Footer>
         
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseModal}
            //endIcon={<DoneAllIcon />}
            sx={{ mr: 1 }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


