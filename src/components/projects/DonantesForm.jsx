import React, { useState, useEffect } from "react";

//mui
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//icons
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

import NumberFormat from 'react-number-format'; 

//modal
import Modal from "react-bootstrap/Modal";

//services
import {  
  getDonantesClasificacion,
  createDonantes,
} from "../../services/donantesServices";

//component
import ClasificacionAliadosSelect from "../controls/ClasificacionAliadosSelect";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
});

export default function DonantesForm({
  isModalOpenDonantes,
  setIsModalOpenDonantes,
}) {
  /*datos form*/
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [idClasificacion, setIdClasificacion] = useState(0);
  const [donaciondop, setDonaciondop] = useState(0);
  const [donacionusd, setDonacionusd] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [informacion, setInformacion] = useState("");

  const[clasificacionDonantesList, setClasificacionDonantesList] = useState([]);

  const handleAddDonante= () =>{

  }

  const handleChangeClasificacionDonantes =()=>{
    
  }


  const handleClose = () =>{
    setIsModalOpenDonantes(false);
  }

  const getClasificacion = async () => {
    let resp = await getDonantesClasificacion();
    setClasificacionDonantesList(resp);
  }

  useEffect(() =>{
    getClasificacion();
  }, [])


  return (
    <div>
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
                label="Donación DOP"
                value={donaciondop}
                sx={{ width: "100%", marginBottom: "16px" }}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                // variant="standard"
                onChange={({ target }) => setDonaciondop(target.value)}
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <TextField
                label="Donación USD"
                value={donacionusd}
                sx={{ width: "100%", marginBottom: "16px" }}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                // variant="standard"
                onChange={({ target }) => setDonacionusd(target.value)}
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
                clasificacionAliados={clasificacionDonantesList}
                clasificacionDonantesList={setClasificacionDonantesList}
                handleChangeClasificacionDonantes={
                  handleChangeClasificacionDonantes
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

      {/* <Modal
        show={isModalOpenDonantes}
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
                    label="donacion"
                    value={donacion}
                    sx={{ width: "100%", marginBottom: "16px" }}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    // variant="standard"
                    onChange={({ target }) => setDonacion(target.value)}
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
                    clasificacionDonantesList={setClasificacionDonantesList}
                    handleChangeClasificacionDonantes={
                      handleChangeClasificacionDonantes
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
            onClick={handleAddDonante}
            endIcon={<DoneAllIcon />}
            sx={{ mr: 1 }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
