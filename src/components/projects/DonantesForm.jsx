import React, { useState, useEffect, useContext } from "react";

//mui
import TextField from "@mui/material/TextField";
import NumberFormat from 'react-number-format'; 
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from "@mui/material/Typography";

//services
import {  
  getDonantesClasificacion 
} from "../../services/donantesServices";

//component
import ClasificacionDonantesSelect from "../controls/ClasificacionDonantessSelect";

//context
import { ProjectContext } from "../../context/ProjectContext";


const tipoPresupuesto = [
  {text: 'Económico', value: 1, hasDescripcion: false },
  {text: 'Especie', value: 2,  hasDescripcion: true },
  {text: 'Trabajo Colaborativo', value: 3,  hasDescripcion: true }
]

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

export default function DonantesForm(props) {
  const { projectData, setProjectData } = useContext(ProjectContext);

  const[sumMontoDOP, setSumMontoDOP] = useState(0);

  const [clasificacionDonantesList, setClasificacionDonantesList] = useState(
    []
  );

  const getClasificacion = async () => {
    let resp = await getDonantesClasificacion();
    setClasificacionDonantesList(resp);
  };

  const handleCheck = (e) =>{ 

    if(e.target.checked){

      let newItem = {
        idDonacion: 0,
        idDonante: 0,
        idClasificacion: e.target.value,
        montoDOP: 0,
        montoUSD: 0,
        descripcion: ""
      }
  
      setProjectData( prev=> prev = {...prev, donante: { ...prev.donante, donaciones: [...prev.donante.donaciones, newItem] }, });
    }
    else{
      var filtered = projectData.donante.donaciones.filter(function(el) { return el.idClasificacion != e.target.value; });     
      setProjectData( prev=> prev = {...prev, donante: { ...prev.donante, donaciones: [...filtered] }, });
    }

   
  }

  const handleTextChange = (data) => {
    projectData.donante.donaciones.forEach(element => {
      if(element.idClasificacion == data.idClasificacion) { 
        element = data;
      }
    });

    setProjectData( prev=> prev = {...prev, donante: { ...prev.donante, donaciones: [...prev.donante.donaciones] }, });
  } 

  const montoD = () =>{
    projectData.donante.donaciones.map(i => i.montoDOP).reduce((a,b)=>a+b, 0)
  }

  useEffect(() => {
    montoD();
    getClasificacion();
  }, []);

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
                value={projectData.donante.nombre}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: { ...prev.donante, nombre: target.value },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <TextField
                required
                label="Identificación"
                placeholder="Identificación"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.donante.identificacion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: {
                          ...prev.donante,
                          identificacion: target.value,
                        },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <ClasificacionDonantesSelect
                clasificacionDonantes={clasificacionDonantesList}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <TextField
                required
                label="Dirección"
                placeholder="Dirección"
                sx={{ width: "100%", marginBottom: "16px" }}
                multiline
                rows={3}
                value={projectData.donante.direccion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: { ...prev.donante, direccion: target.value },
                      })
                  )
                }
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <TextField
                required
                label="Información de Contacto"
                placeholder="Información de Contacto"
                sx={{ width: "100%", marginBottom: "16px" }}
                multiline
                rows={3}
                value={projectData.donante.informacion}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: { ...prev.donante, informacion: target.value },
                      })
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="w-50">
          <FormControl style={{ marginBottom: 20 }} {...props}>
            <FormLabel id="demo-radio-buttons-group-label">
              Clasificación Donación
            </FormLabel>

            <FormGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              // defaultValue={projectData.donante.idDonacionClasificacion}
            >
              {tipoPresupuesto.map((x) => {
                return (
                  <FormControlLabel
                    color="success"
                    title={x.title}
                    value={x.value}
                    control={<Checkbox />}
                    label={x.text}
                    onChange={handleCheck}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </div>

        {projectData.donante.donaciones.map((x) => (
          <div className="row">
            {/*Economico*/}
            <Typography mb={1} variant="h6" component="h1" color="primary">
              {tipoPresupuesto.find((y) => y.value == x.idClasificacion).text}
            </Typography>
            <div className="col-sm-6">
              <div className="form-group">
                <TextField
                  label="Donación DOP"
                  sx={{ width: "100%", marginBottom: "16px" }}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={x.montoDOP}
                  onChange={({ target }) => {
                    x.montoDOP = target.value;
                    handleTextChange(x);
                  }}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <TextField
                  label="Donación USD"
                  sx={{ width: "100%", marginBottom: "16px" }}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={x.montoUSD}
                  onChange={({ target }) => {
                    x.montoUSD = target.value;
                    handleTextChange(x);
                  }}
                />
              </div>
            </div>

            {tipoPresupuesto.find((y) => y.value == x.idClasificacion)
              .hasDescripcion ? (
              <div className="col-sm-12">
                <div className="form-group">
                  <TextField
                    label="Casilla Libre"
                    sx={{ width: "100%", marginBottom: "16px" }}
                    multiline
                    rows={1}
                    value={x.descripcion}
                    onChange={({ target }) => {
                      x.descripcion = target.value;
                      handleTextChange(x);
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}

        <h5>
          Monto General: DOP:{" "}
          {projectData.donante.donaciones
            .map((i) => parseInt(i.montoDOP))
            .reduce((a, b) => a + b, 0)}
          , USD:{" "}
          {projectData.donante.donaciones
            .map((i) => parseInt(i.montoUSD))
            .reduce((a, b) => a + b, 0)}
        </h5>
      </form>
    </div>
  );
}
