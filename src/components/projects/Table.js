 import React, {useState, useEffect, useContext} from "react";
import { useNavigate }  from 'react-router-dom';
import Moment from 'react-moment';
import './index.css'

//components
import ModalTaks from '../taks/ModalTaks'

//services
import { deleteProject } from '../../services/projectsServices';
import { deleteTaks } from '../../services/taksServices';
//mui
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FilePresentIcon from '@mui/icons-material/FilePresent';

//context
import { ParameterContext } from '../../context/ParameterContext';

//sweet alert
import swal from 'sweetalert';

export default function Table({projects}) {

  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const {parameterProject, setParameterProject} = useContext(ParameterContext); 

  const handleEditProject = (id) => {   
    //setParameterProject({...parameterProject, id: id, mode: 'read-write'});

    let dataParameter ={
      id: id, 
      mode: 'read-write'
    }

    sessionStorage.setItem('parameterProject', JSON.stringify(dataParameter))
    navigate(`/project/new2/${id}`);
  }

  const handleDetailProject = (id) => {    
    let dataParameter ={
      id: id, 
      mode: 'read-only'
    }

    sessionStorage.setItem('parameterProject', JSON.stringify(dataParameter))

    navigate(`/project/new2/${id}/readonly`)
  }

  const handleOpenModalTaks = async (id) =>{ 
    setId(id);
    setIsOpen(true);
  }

  const handleRemoveProject = (id, codigo) => {   
    swal({
      title: `Deseas eliminar el proyecto ${codigo}?`,
      text: "Despues de elminar el registro, el mismo no podrá ser recuperado!",
      icon: "warning",
      buttons: true,     
    }).then((willDelete) => {
      if (willDelete) {
        deleteProject(id).then((resp) => {
          //mensaje de confirmación
          swal(`El proyecto ${codigo} fue eliminado!`, {
            icon: "success",
          });          
        });    
      }
    });    
  } 

  const handleRemoveTaks = (id, descripcion) => {   
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
        });    
      }
    });    
  } 

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
      width: 150,
      cellClassName: "actions",
      getActions: ({id, row}) => {
        return [
          <GridActionsCellItem
            title="Detalle"
            icon={<VisibilityOutlinedIcon />}
            label="Detalle"
            onClick={() => handleDetailProject(id)}
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
            title="Documentos"
            icon={<FilePresentIcon />}
            label="Eliminar"
            onClick={() => alert(id)}
            color="primary"
          />,
          <GridActionsCellItem
            title="Eliminar"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleRemoveProject(id, row.codigo)}
            color="error"
          />,          
        ];
      },
    },
  ];

  useEffect(() => {
    sessionStorage.removeItem('parameterProject')
  }, []);
  
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
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "secundary.light",
          },
        }}
      />

      <ModalTaks id={id} isOpen={isOpen} setIsOpen={setIsOpen} view = {"list"}  />

      {/* Listados de tareas, pasar a un compornte */}
      {/* <Modal
        show={isModalOpen}
        onHide={handleCloseModal}
        style={{ marginTop: 55 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h2" color="primary">
              <ListAltIcon /> Tareas
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseModal}
            sx={{ mr: 1 }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}