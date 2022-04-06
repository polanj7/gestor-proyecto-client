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
import { wait } from '@testing-library/user-event/dist/utils';

const tipoPresupuesto = [
  {text: 'Económico', value: 'D' },
  {text: 'Especie', value: 'E' },
  {text: 'Trabajo Colaborativo', value: 'TC' }
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
          style={{ backgroundColor: "red" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Donante</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DonantesForm />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "red" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Presupuesto</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-100">
            <div className="row">
              {/* <div className="w-50">
                <FormControl style={{ marginBottom: 20 }} {...props}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Moneda
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue={projectData.tipoMoneda}
                  >
                    {moneyType.map((x) => {
                      return (
                        <FormControlLabel
                          title={x.title}
                          value={x.value}
                          control={<Radio />}
                          label={x.text}
                          onChange={({ target }) =>
                            setProjectData({
                              ...projectData,
                              tipoMoneda: target.value,
                            })
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </div> */}

              <div className="w-50">
                <FormControl style={{ marginBottom: 20 }} {...props}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Clasificación Aporte
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue={projectData.idTipoPresupuesto}
                  >
                    {tipoPresupuesto.map((x) => {
                      return (
                        <FormControlLabel
                          title={x.title}
                          value={x.value}
                          control={<Radio />}
                          label={x.text}
                          onChange={({ target }) =>
                            setProjectData({
                              ...projectData,
                              idTipoPresupuesto: target.value,
                            })
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
                value={projectData.rangoPresupuestado}
                sx={{ width: "100%", marginBottom: "16px" }}
                onChange={({ target }) =>
                  setProjectData({
                    ...projectData,
                    rangoPresupuestado: target.value,
                  })
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
                value={projectData.rangoPresupuestado}
                sx={{ width: "100%", marginBottom: "16px" }}
                onChange={({ target }) =>
                  setProjectData({
                    ...projectData,
                    rangoPresupuestado: target.value,
                  })
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
