import React, {useState, useEffect} from 'react'

//Services
import { getProjects, deleteProject } from '../../services/projectsServices';
import { getTaksByID, addTaks, updateTaks } from '../../services/taksServices';

//mui
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
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';

//alert
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px"
  }
}));


export default function FormEdit({idTarea, idProyecto, setReloadData, expanded , setExpanded }) {
  const classes = useStyles();
  const [minDateFinal, setMinDateFinal] = useState(new Date());

  const [data, setData] = useState({
    idTarea: 0,
    descripcion: "",
    idProyecto: idProyecto,
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    idEstado: 1,
  });

  if (idTarea > 0) {
    getTaksByID(idTarea).then((resp) => {
      setData(resp);
    });
  }

  const handleAddTaks = async () => {
    swal({
      title: `Registro de Tarea`,
      text: "Deseas guardar los datos digitados?",
      icon: "info",
      buttons: true      
    }).then((willSave) => {
      if (willSave) {         
        addTaks(data);
        setReloadData((prev) => !prev);
        setExpanded(false);   
      }
    });
  };

  const handleUpdateTaks = async () => {
    await updateTaks(idTarea, data);
    setReloadData((prev) => !prev);
    setExpanded(false);
  };

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
                  onChange={({ target }) =>
                    setData({ ...data, descripcion: target?.value })
                  }
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
                    onChange={({ target }) =>
                      setData({ ...data, fechaInicio: target?.value })
                    }
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
                    onChange={({ target }) =>
                      setData({ ...data, fechaFinal: target?.value })
                    }
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
    
              <div style={{ marginTop: "16px" }}>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mr: 1 }}
                  endIcon={<CloseIcon />}
                  onClick={() => setExpanded(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
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
