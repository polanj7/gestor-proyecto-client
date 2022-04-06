import React, {useState, useEffect} from 'react';

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

/*
  "nombre": "string",
  "identificacion": "string",
  "idClasificacion": 0,
  "direccion": "string",
  "informacion": "string" 
*/

export default function AliadosForm({isModalOpenAliados, setIsModalOpenAliados}) {

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

  return (
    <div>
      <Modal
        show={isModalOpenAliados}
        onHide={handleClose}
        style={{ marginTop: 100 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h2" color="primary">
              Creación de Aliado
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <TextField
                    required
                    label="Nombre"
                    // variant="standard"
                    placeholder="Nombre"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={nombre}
                    onChange={({ target }) => setNombre(target.value)}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <TextField
                    required
                    label="Identificación"
                    // variant="standard"
                    placeholder="Identificación"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    value={identificacion}
                    onChange={({ target }) => setIdentificacion(target.value)}
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
                    value={direccion}
                    onChange={({ target }) => setDireccion(target.value)}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <ClasificacionAliadosSelect
                    clasificacionAliados={clasificacionAliadosList}
                    handleChangeClasificacionAliados={
                      handleChangeClasificacionAliados
                    }
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <TextField
                    required
                    label="Información"
                    // variant="standard"
                    placeholder="Información"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    multiline
                    rows={3}
                    value={informacion}
                    onChange={({ target }) => setInformacion(target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}
