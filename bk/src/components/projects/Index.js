import React, { useState } from 'react';
import Table from './Table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
/*MUI*/
import Paper from "@material-ui/core/Paper";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)  
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
          Gestor Proyectos
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
