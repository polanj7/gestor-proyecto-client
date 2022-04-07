import React, { useState, useEffect, useContext } from "react";

//mui
import TextField from "@mui/material/TextField";
import NumberFormat from 'react-number-format'; 

//services
import {  
  getDonantesClasificacion 
} from "../../services/donantesServices";

//component
import ClasificacionDonantesSelect from "../controls/ClasificacionDonantessSelect";

//context
import { ProjectContext } from "../../context/ProjectContext";

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

export default function DonantesForm() {
  const { projectData, setProjectData } = useContext(ProjectContext);

  const [clasificacionDonantesList, setClasificacionDonantesList] = useState(
    []
  );

  const getClasificacion = async () => {
    let resp = await getDonantesClasificacion();
    setClasificacionDonantesList(resp);
  };

  useEffect(() => {
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
                label="Donación DOP"
                sx={{ width: "100%", marginBottom: "16px" }}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
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
                label="Información"
                placeholder="Información"
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
      </form>
    </div>
  );
}
