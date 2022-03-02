import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';

//mui
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';


function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No hay registros!
      {/* <pre>(rows=&#123;[]&#125;)</pre> */}
    </Stack>
  );
}

export default function TableTask({ lista, handleRemoveTask }) {

  console.log(lista);

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
    // { field: "responsable.nombre", headerName: "Responsable", width: 350 },
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
      getActions: (row) => {
        return [
          <GridActionsCellItem
            title="Eliminar"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleRemoveTask(row.row)}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataGrid
        getRowId={(row) => row.idTarea}
        component={Paper}
        rows={lista}
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

      {/* <ListItem
        secondaryAction={
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => { handleRemoveTask(row) }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt={row.descripcion} src="#" />
        </ListItemAvatar>
        <ListItemText
          primary={row.descripcion}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Tiempo
              </Typography>
              {" "}{row.fechaInicio} - {row.fechaFinal}              
            </>
          }         
        />
      </ListItem>
      <Divider variant="inset" component="li" /> */}
    </>
  );
}
