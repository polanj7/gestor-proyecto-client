import React, { useContext, useEffect, useState } from "react";

//mui
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";

//icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//services
import { getRangoPresupuesto } from "../../services/presupuestoServices";

//component
import RangoPresupuestadoSelect from "../controls/RangoPresupuestadoSelect";

//context
import { ProjectContext } from "../../context/ProjectContext";

const tipoPresupuesto = [
  { text: "Económico", value: 1 },
  { text: "Especie", value: 2 },
  { text: "Trabajo Colaborativo", value: 3 },
];

const moneyType = [
  { text: "DOP", value: "DOP", title: "Pesos Dominicanos" },
  { text: "USD", value: "USD", title: "Dolares Estadounidenses" },
];

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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px",
  },
}));

export default function BudgetForm(props) {
  const classes = useStyles();
  const { projectData, setProjectData } = useContext(ProjectContext);

  const [rango, setRango] = useState([]);

  const getRango = async () => {
    let resp = await getRangoPresupuesto();
    setRango(resp);
  };

  const handleChangeRango = () => {};

  useEffect(() => {
    getRango();
  }, []);

  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Presupuesto
      </Typography>

      <hr />

      <div className="w-100">
        {/* <div className="row">
          <div className="w-50">
            <FormControl style={{ marginBottom: 20 }} {...props}>
              <FormLabel id="demo-radio-buttons-group-label">
                Clasificación Donación
              </FormLabel>            
              <FormGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue={projectData.donante.idDonacionClasificacion}
              >
                {tipoPresupuesto.map((x) => {
                  return (
                    <FormControlLabel
                      color="success"
                      title={x.title}
                      value={x.value}
                      control={<Checkbox />}
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
              </FormGroup>
            </FormControl>
          </div>
        </div> */}

        <RangoPresupuestadoSelect
          rango={rango}
          disabled={props.disabled}
          handleChangeRango={handleChangeRango}
        />

        <div className={classes.toolbar}>
          <TextField
            {...props}
            label="Monto Presupuestario DOP"
            sx={{ width: "49%", marginBottom: "16px" }}
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

          <TextField
            {...props}
            label="Monto Presupuestario USD"
            sx={{ width: "49%", marginBottom: "16px" }}
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

        <h3>Origen de los Recursos</h3>
        <br />

        <table className="table table-bordered">
          <thead>
            <th>Tipo de Bines</th>
            <th>Monto DOP</th>
            <th>Monto USD</th>
          </thead>
          <tbody>
            {projectData.donante.donaciones.map((x) => (
              <tr>
                <td>{tipoPresupuesto.find((y) => y.value == x.idClasificacion).text}</td>
                <td>$ {x.montoDOP}</td>
                <td>$ {x.montoUSD}</td>             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
