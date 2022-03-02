import React, {useState, useEffect} from 'react'

//Services
import { getProjects, deleteProject } from '../../services/projectsServices';
import { getTaksByID, addTaks, updateTaks } from '../../services/taksServices';
//Services
import { getResponsables } from '../../services/usersServices'

//mui
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import LoadingButton from '@mui/lab/LoadingButton';

//mui
import Button from '@mui/material/Button';
import SelectResponsable from '../controls/SelectResponsable';


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
  const[tarea, setTarea] = useState(idTarea);
  const[descripcionTarea, setDescripcionTarea] = useState('');
  const[inicioTarea, setInicioTarea] = useState(new Date());
  const[finTarea, setFinTarea] = useState(new Date());    
  const[responsables, setResponsables] = useState([]);
  const[selectedResponsable, setSelectedResponsable] = useState([]);
  const[isLoading, setIsLoading] = useState(false);


  const getResponsablesd = async () =>{
    const resp = await getResponsables();
    setResponsables(resp);
  }

  useEffect(() =>{
    getResponsablesd();

    if (idTarea > 0) {
      getTaksByID(idTarea).then((resp) => {
        setDescripcionTarea(resp.descripcion);
        setInicioTarea(resp.fechaInicio);
        setFinTarea(resp.fechaFinal);
        setSelectedResponsable(resp.idResponsable);
      });
    }
  }, [])


  const handleAddTaks = async () => {
    //setIsLoading(true)

    swal({
      title: `Registro de Tarea`,
      text: "Deseas guardar los datos digitados?",
      icon: "info",
      buttons: true      
    }).then((willSave) => {
      if (willSave) {          
        let tareas = {
          idTarea: tarea, 
          idProyecto: idProyecto,
          descripcion: descripcionTarea,
          fechaInicio: inicioTarea,
          fechaFinal: finTarea,
          idResponsable: selectedResponsable,   
          idEstado: 1
        }

        if(idTarea === 0){
           addTaks(tareas).then(x=>{     
            setReloadData((prev) => !prev);
            setExpanded(false);   
           })
        }else{
           updateTaks(idTarea, tareas).then((x) => {             
             setReloadData((prev) => !prev);
             setExpanded(false);
           });
        }      
        
      }
    });
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
                  value={descripcionTarea}
                  onChange={({ target }) => setDescripcionTarea(target?.value)}
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
                    value={inicioTarea}
                    onChange={(newValue) => setInicioTarea(newValue)}
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
                    openTo="day"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    inputFormat="dd/MM/yyyy"
                    value={finTarea}
                    onChange={(newValue) => setFinTarea(newValue)}
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
                <SelectResponsable
                  responsables={responsables}
                  responsable={selectedResponsable}
                  setResponsable={setSelectedResponsable}
                  disabled={false}
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  endIcon={<DoneAllIcon />}
                  onClick={handleAddTaks}
                >
                  Guardar
                </Button> */}
                <LoadingButton
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  endIcon={<DoneAllIcon />}
                  onClick={handleAddTaks}
                  loading={isLoading}
                >
                  Guardar
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
