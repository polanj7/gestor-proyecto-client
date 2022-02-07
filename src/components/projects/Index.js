import React, { useState } from 'react';
import Table from './Table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

/*MUI*/
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    marginBottom: "8px"
  }
}));

export default function Index() {

  const classes = useStyles();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);  

  const redirect =(to) =>{
    navigate(to);   
  } 

  return (
    <>
      {/* <Paper className={classes.content}> */}
      <div className={classes.toolbar}>
        <Typography variant="h5" component="h2" color="primary">
          Listado de Proyectos
        </Typography>

        <Button
          onClick={() => {
            redirect("/project/new2");
          }}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          NUEVO PROYECTO
        </Button>
      </div>

      {/* </Paper> */}
      <div style={{ height: "60vh", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
