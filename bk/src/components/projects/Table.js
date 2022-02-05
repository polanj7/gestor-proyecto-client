import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import './index.css'
import { getProjects, deleteProject } from '../../services/projectsServices';

//mui
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddIcon from '@mui/icons-material/Add';

export default function Table() {

  const [projects, setProjects] = useState([]);
  const [refreshAfterDelete, setRefreshAfterDelete] = useState(false);
  const[isOpen, setIsOpen] = useState(false);
  const[tareaID, setTareaID] = useState(0);

  const handleCloseModal = () =>{
    setIsOpen(false);
  }

  const handleOpenModal = (id) =>{
    setTareaID(id);
    setIsOpen(true);

    alert(`Aqui se abre el modal con las tareas del proyecto ${id}`)
  }

  const removeProject = (id) => {   
    if(!window.confirm('Deseas elminar el registro?')){
      return;
    }  
    deleteProject(id).then(resp => {      
      setRefreshAfterDelete(x => !x);        
    })    
  }
  
  useEffect(() => {
    getProjects().then(resp =>{
      setProjects(resp);
    })

  }, [refreshAfterDelete])

  const columns = [
    { field: "id", headerName: "ID", width: 1 },
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
          {params.value}
          <Button
            variant="outlined"
            color="info"
            size="small"
            style={{ width: 10, marginLeft: 16 }}
            onClick={() => {handleOpenModal(params.id)}}
          >            
            {params.value > 0 ? <VisibilityOutlinedIcon title="Ver Tareas" /> : <AddIcon title="Agregar Tareas"  />}
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
      getActions: ({ id }) => {
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
            //onClick={handleCancelClick(id)}
            color="primary"
          />,
          <GridActionsCellItem
            title="Eliminar"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => removeProject(id)}
            color="error"
          />,
        ];
      },
    },
  ];  

  return (
    <>
      <DataGrid
        component={Paper}
        rows={projects}
        columns={columns}
        pageSize={10}     
      />
    </>
  );
}


