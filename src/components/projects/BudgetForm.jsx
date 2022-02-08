import React, {useContext} from 'react';

//mui
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from "@mui/material/Divider";


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

export default function BudgetForm() {

  const {projectData, setProjectData} = useContext(ProjectContext);  
  
  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Presupuesto
      </Typography>

      <div className="w-75">
        <div className="row">
          <div className="w-50">
            <FormControl style={{ marginBottom: 20 }}>
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
            <FormControl style={{ marginBottom: 20 }}>
              <FormLabel id="demo-radio-buttons-group-label">Tipo de Aporte</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue={projectData.idTipoPresupuesto }
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
          <FormLabel id="demo-radio-buttons-group-label">
            Monto Presupuestado
          </FormLabel>
          <input
            type="number"
            className="form-control form-control-border w-100"
            id="nombre"
            placeholder="Monto $$$"
            value={projectData.rangoPresupuestado}
            onChange={({ target }) =>
              setProjectData({
                ...projectData,
                rangoPresupuestado: target.value,
              })
            }
          />
        </div>

        {projectData.idTipoPresupuesto === "E" ? (
          <div className="form-group">
            <FormLabel id="demo-radio-buttons-group-label">
              Descripción
            </FormLabel>
            <textarea
              className="form-control form-control-border w-100"
              id="descripcion"
              placeholder="Descripción Presupuesto"
              rows={4}
              value={projectData.descripcionEspecie}
              onChange={({ target }) =>
                setProjectData({
                  ...projectData,
                  descripcionEspecie: target.value,
                })
              }
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
