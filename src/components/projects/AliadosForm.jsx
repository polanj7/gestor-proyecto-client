import React, {useState, useEffect, useContext} from 'react';

//mui
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//icons
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

//modal
import  Modal  from 'react-bootstrap/Modal';

//services
import { getAliadosClasificacion, createAliados } from '../../services/aliadosServices';

//component
import ClasificacionAliadosSelect from '../controls/ClasificacionAliadosSelect';

//context
import { ProjectContext } from "../../context/ProjectContext";


export default function AliadosForm({isModalOpenAliados, setIsModalOpenAliados}) {
  
  const { projectData, setProjectData } = useContext(ProjectContext);

  /*datos form*/
  const[nombre, setNombre] = useState('');
  const[identificacion, setIdentificacion] = useState('');
  const[idClasificacion, setIdClasificacion] = useState(0);
  const[direccion, setDireccion] = useState('');
  const[informacion, setInformacion] = useState('');

  const[clasificacionAliadosList, setClasificacionAliadosList] = useState([]);

  const handleAddAliado = () =>{

  }

  const handleClose = () =>{
    setIsModalOpenAliados(false);
  }

  const handleChangeClasificacionAliados =()=>{

  }

  const getClasificacion = async () => {
    let resp = await getAliadosClasificacion();
    setClasificacionAliadosList(resp);
  }

  useEffect(() =>{
    getClasificacion();
  }, [])


  console.log('projectData', projectData)

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <TextField
                required
                label="Nombre"
                placeholder="Nombre"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.aliado.nombre}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        aliado: { ...prev.aliado, nombre: target.value },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <TextField
                required
                label="Identificación"
                placeholder="Identificación"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.aliado.identificacion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        aliado: {
                          ...prev.aliado,
                          identificacion: target.value,
                        },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <TextField
                required
                label="Dirección"
                // variant="standard"
                placeholder="Dirección"
                sx={{ width: "100%", marginBottom: "16px" }}
                multiline
                rows={2}
                value={projectData.aliado.direccion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        aliado: { ...prev.aliado, direccion: target.value },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <ClasificacionAliadosSelect
                clasificacionAliados={clasificacionAliadosList}                
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <TextField
                required
                label="Información"
                placeholder="Información"
                sx={{ width: "100%", marginBottom: "16px" }}
                multiline
                rows={3}
                value={projectData.aliado.informacion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        aliado: { ...prev.aliado, informacion: target.value },
                      })
                  )
                }
              />
            </div>
          </div>
        </div>
      </form>

      <Button
        variant="contained"
        color="warning"
        onClick={handleClose}
        endIcon={<CloseIcon />}
        sx={{ mr: 1 }}
      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddAliado}
        endIcon={<DoneAllIcon />}
        sx={{ mr: 1 }}
      >
        Guardar
      </Button>
    </div>
  );
}
