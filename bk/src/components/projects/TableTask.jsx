import React, {useEffect, useState} from 'react'
import Moment from 'react-moment';

//services
import { getTaksByProject } from '../../services/taksServices';

//mui
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button } from '@material-ui/core';

export default function TableTask ({lista}) {
  
  console.log('lista', lista)

  const [taks, setTaks] = useState([]);
  const[deleteTaks, setDeleteTaks] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 1 },
    { field: "descripcion", headerName: "Descripción", width: 200 },
    {
      field: "fechaInicio",
      headerName: "Inicio",
      width: 100,
      type: "date",
      renderCell: (params) => (
        <Moment format="DD/MM/YYYY">{params.value}</Moment>
      ),
    },
    {
      field: "fechaFinal",
      headerName: "Final",
      width: 100,
      type: "date",
      renderCell: (params) => (
        <Moment format="DD/MM/YYYY">{params.value}</Moment>
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
            //onClick={() => removeProject(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  // useEffect(() => {
  //   // getTaksByProject(1).then((resp) => {
  //   //   setTaks(resp);
  //   // });
  //   setTaks(lista);
  // }, [taks]);

  return (
    <>
      <DataGrid
        component={Paper}
        rows={lista}
        columns={columns}
        pageSize={10}        
      />
    </>
  );
}
