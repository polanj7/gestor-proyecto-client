import React, {useState, useEffect} from 'react'

//Services
import { getProjects, deleteProject } from '../../services/projectsServices';
import { getTaksByID, addTaks, updateTaks } from '../../services/taksServices';

//mui
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

//mui
import Button from '@mui/material/Button';


//icons
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import { Divider } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px"
  }
}));


export default function FormEdit({idTarea, idProyecto, setIsOpen, setReloadData, data, setData }) {
  console.log('aqui', data)
  const classes = useStyles();
  const[minDateFinal, setMinDateFinal] = useState(new Date());

  useEffect(() =>{   
    if (idTarea > 0) {
      getTaksByID(idTarea).then((resp) => {
        console.log(resp)
      });
    }     
  }, [])

  const handleAddTaks = async () =>{
    const resp = await addTaks(data);
    setIsOpen(false);
    setReloadData((prev) => !prev);
  }

  const handleUpdateTaks = async () =>{
     const resp = await updateTaks(idTarea, data);
     setIsOpen(false);
     setReloadData(prev => !prev);
  }

  return (
    <>
      <form>
        <div className="row">
          <div className="col-sm-12">
            <div className="w-100">
              <div className="form-group">
                <TextField
                  required
                  label="Descripción"
                  variant="standard"
                  placeholder="Descipción"
                  sx={{ width: "100%", marginBottom: "16px" }}
                  multiline
                  rows={3}
                  value={data.descripcion}
                  onChange={({ target }) => setData({...data, descripcion: target?.value})}
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={classes.toolbar}>
                  <DatePicker
                    minDate={new Date()}
                    openTo="day"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    inputFormat="dd/MM/yyyy"
                    value={data.fechaInicio}
                    onChange={({ target }) => setData({...data, fechaInicio: target?.value})}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Inicio"
                        variant="standard"
                        sx={{ width: "50%", marginBottom: "16px" }}
                      />
                    )}
                  />

                  <DatePicker
                    minDate={minDateFinal}
                    openTo="day"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    inputFormat="dd/MM/yyyy"
                    value={data.fechaFinal}
                    onChange={({ target }) => setData({...data, fechaFinal: target?.value})}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fin"
                        variant="standard"
                        sx={{
                          width: "49%",
                          marginBottom: "16px",
                          marginLeft: "16px",
                        }}
                      />
                    )}
                  />
                </div>
              </LocalizationProvider>

              <div className="form-group">
                <TextField
                  required
                  label="Responsable"
                  variant="standard"
                  placeholder="-Select-"
                  sx={{ width: "100%", marginBottom: "16px" }}
                />
              </div>
              <Divider />
              <div style={{ marginTop: "16px" }}>
          
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  endIcon={<DoneAllIcon />}  
                  onClick={idTarea > 0 ? handleUpdateTaks : handleAddTaks}                
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
