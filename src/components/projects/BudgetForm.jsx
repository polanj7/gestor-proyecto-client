import React, {useContext} from 'react';

//mui
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';



//context
import { ProjectContext } from '../../context/ProjectContext'

const tipoPresupuesto = [
  {text: 'Dinero', value: 'D' },
  {text: 'Especie', value: 'E' }
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
  const {projectData, setProjectData} = useContext(ProjectContext);  
  
  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Presupuesto
      </Typography>

      <div className="w-75">
        <div className="row">
          <div className="w-50">
            <FormControl style={{ marginBottom: 20 }} {...props}>
              <FormLabel id="demo-radio-buttons-group-label">Moneda</FormLabel>
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
          </div>

          <div className="w-50">
            <FormControl style={{ marginBottom: 20 }} {...props}>
              <FormLabel id="demo-radio-buttons-group-label">
                Tipo de Aporte
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
            label="Monto Presupuestado"
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
            variant="standard"
          />
        </div>

        {projectData.idTipoPresupuesto === "E" ? (
          <div className="form-group">
            <TextField
              {...props}
              id="descripcion"
              label="Descripción"
              variant="standard"
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
        )}

        {/* solo aplica si el tipo es en especie */}
      </div>
    </>
  );
}
