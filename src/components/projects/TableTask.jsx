import React, {useEffect, useState} from 'react'
import Moment from 'react-moment';

//mui
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No hay registros!
      {/* <pre>(rows=&#123;[]&#125;)</pre> */}
    </Stack>
  );
}

export default function TableTask ({lista}) {  

  const columns = [
    {
      field: "idTarea",
      headerName: "ID",
      width: 25,
      renderCell: (params) => (
        <>
          {params.value < 1 ? (
            <Chip label="N" color="secondary" />
          ) : (
            <>{params.value}</>
          )}
        </>
      ),
    },
    { field: "descripcion", headerName: "Descripción", width: 500 },
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
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Acciones",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         title="Detalle"
    //         icon={<VisibilityOutlinedIcon />}
    //         label="Detalle"
    //         onClick={() => alert(id)}
    //         color="primary"
    //       />,
    //       <GridActionsCellItem
    //         title="Editar"
    //         icon={<EditIcon />}
    //         label="Editar"
    //         //onClick={handleCancelClick(id)}
    //         color="primary"
    //       />,
    //       <GridActionsCellItem
    //         title="Eliminar"
    //         icon={<DeleteIcon />}
    //         label="Eliminar"
    //         //onClick={() => removeProject(id)}
    //         color="error"
    //       />,
    //     ];
    //   },
    // },
  ];

  return (
    <>
      <DataGrid
        // component={Paper}
        getRowId={(row) => row.idTarea}
        components={{noRowsOverlay: NoRowsOverlay}}
        componentsProps={{
          columnMenu: { background: 'red' },
        }}
        rows={lista}
        columns={columns}
        pageSize={10}
        sx={{
          boxShadow: 3,
          border: 0.1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'secundary.dark',
          },
        }}
      />
    </>
  );
}
