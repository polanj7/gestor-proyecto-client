import React from 'react';
import Table from './Table';
import { useNavigate } from 'react-router-dom';

//services
import { getProjects } from '../../services/projectsServices';

/*MUI*/
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

//react-query
import { useQuery } from 'react-query';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
    marginBottom: "8px"
  }
}));

export default function Index() {  
  const classes = useStyles();
  const navigate = useNavigate(); 
  
  const redirect =(to) =>{   
    navigate(to);
  }

  const { data: projects, isLoading } = useQuery(["projects"], getProjects);

  if(isLoading){

    return (
      <Box
        sx={{
          padding: "48px",
          boxShadow: 2,
        }}
      >
        <Stack>
          <div className={classes.toolbar}>
            <Skeleton variant="text" width="100px" height="32px" />
            <Skeleton variant="text" width="80px" height="32px" />
          </div>

          <Skeleton
            variant="rectangular"
            height={32}
            style={{
              width: "100%",
            }}
          />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Listado de Proyectos
        </Typography>
        <Button
          onClick={() => {
            let dataParameter ={
              id: 0, 
              mode: 'write'
            }        
            sessionStorage.setItem('parameterProject', JSON.stringify(dataParameter))
            redirect("/project/new2");
          }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          NUEVO PROYECTO
        </Button>
      </div>

      <div style={{ height: "60vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <Table projects={projects} />
          </div>
        </div>
      </div>
    </>
  );
}