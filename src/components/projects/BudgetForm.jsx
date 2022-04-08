import React, {useContext, useEffect, useState} from 'react';

//mui
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format'; 
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//services
import { getRangoPresupuesto } from "../../services/presupuestoServices";

//component
import RangoPresupuestadoSelect from '../controls/RangoPresupuestadoSelect';
import DonantesForm from "./DonantesForm";

//context
import { ProjectContext } from '../../context/ProjectContext'

const tipoPresupuesto = [
  {text: 'Económico', value: 1 },
  {text: 'Especie', value: 2 },
  {text: 'Trabajo Colaborativo', value: 3 }
]

const moneyType = [
  {text: 'DOP', value: 'DOP', title: 'Pesos Dominicanos' },
  {text: 'USD', value: 'USD', title: 'Dolares Estadounidenses' }
]

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
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

export default function BudgetForm(props) {
  const { projectData, setProjectData } = useContext(ProjectContext);

  const [rango, setRango] = useState([]);

  const getRango = async () => {
    let resp = await getRangoPresupuesto();
    setRango(resp);
  };

  const handleChangeRango =()=>{

  }

  useEffect(() => {
    getRango();
  }, []);

  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Donante / Presupuesto
      </Typography>

      <hr />
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "#083240", color: "#fff" }}
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Donante</Typography>
        </AccordionSummary>
        <AccordionDetails style={{paddingTop: "16px"}}>
          <DonantesForm />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "#083240", color: "#fff" }}
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Presupuesto</Typography>
        </AccordionSummary>
        <AccordionDetails style={{paddingTop: "16px"}}>
          <div className="w-100">
            <div className="row">
              <div className="w-50">
                <FormControl style={{ marginBottom: 20 }} {...props}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Clasificación Aporte
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue={projectData.donante.idDonacionClasificacion}
                  >
                    {tipoPresupuesto.map((x) => {
                      return (
                        <FormControlLabel
                          title={x.title}
                          value={x.value}
                          control={<Radio />}
                          label={x.text}
                          onChange={({ target }) =>
                            setProjectData(
                              (prev) =>
                                (prev = {
                                  ...prev,
                                  donante: {
                                    ...prev.donante,
                                    idDonacionClasificacion: target.value,
                                  },
                                })
                            )
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="form-group">
              <TextField
                {...props}
                label="Monto Presupuestario DOP"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.donante.monto1}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: { ...prev.donante, monto1: target.value },
                      })
                  )
                }
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                {...props}
                label="Monto Presupuestario USD"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.donante.monto2}
                onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        donante: { ...prev.donante, monto2: target.value },
                      })
                  )
                }
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </div>

            {/* {projectData.idTipoPresupuesto === "E" ? (
              <div className="form-group">
                <TextField
                  {...props}
                  id="descripcion"
                  label="Descripción"
                  placeholder="Descipción Proyecto"
                  sx={{ width: "100%", marginBottom: "16px" }}
                  value={projectData.descripcionEspecie}
                  onChange={({ target }) =>
                    setProjectData({
                      ...projectData,
                      descripcionEspecie: target.value,
                    })
                  }
                  multiline
                  rows={3}
                />
              </div>
            ) : (
              <></>
            )} */}

            <RangoPresupuestadoSelect
              rango={rango}
              disabled={props.disabled}
              handleChangeRango={handleChangeRango}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
