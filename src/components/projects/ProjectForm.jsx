import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';

//Services
import { getProvince, getMunicipality } from '../../services/territoriesServices'
import { getBeneficiarios } from '../../services/beneficiariosServices'

//componts
import SelectBeneficiaries from '../controls/SelectBeneficiaries';
import SelectProvinces from '../controls/SelectProvinces';
import SelectMunicipality from '../controls/SelectMunicipality';
import SelectChallenges from '../controls/SelectChallenges';

//mui
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

//context
import { ProjectContext } from '../../context/ProjectContext';


const challengesImpacted = [
  {text: 'Educación', value: 'Educación'},
  {text: 'Salud', value: 'Salud'},
  {text: 'Saneamiento', value: 'Saneamiento'},
  {text: 'Juventud', value: 'Juventud'},
  {text: 'Otros', value: 'Otros'}
]

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px"
  }
}));
export default function ProjectForm(props) {  
  
  const classes = useStyles();
  const {projectData, setProjectData} = useContext(ProjectContext); 
 
  //territories
  const[municipality, setMunicipality] = useState([]); 
  const[neighborhood, setNeighborhood] = useState([]);
  const[provinces, setProvinces] = useState([]); 
  const[beneficiarieType, setBeneficiarieType] = useState([]);

  const[countBeneficiare, setCountBeneficiare] = useState(0);
  const[minDateFinal, setMinDateFinal] = useState(new Date());

  const getProvinced = async () =>{
    const resp = await getProvince();   
    setProvinces(resp);   
  }

  const getMunicipalityd = async () =>{
    const resp = await getMunicipality(14);   
    setMunicipality(resp);   
  }

  const getBeneficiaries = async () =>{
    const resp = await getBeneficiarios();   
    setBeneficiarieType(resp);   
  }

  useEffect(() =>{
      getProvinced();    
      getMunicipalityd();
      getBeneficiaries();
  }, [])


  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Datos Generales del Proyecto
      </Typography>

      <form>
        <div className="row">
          <div className="col-sm-8">
            <div className="w-75">
              <TextField
                {...props}
                autoComplete="false"
                required
                id="nombre"
                label="Nombre"
                variant="standard"
                placeholder="Nombre del Proyecto"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.nombre}
                onChange={({ target }) =>
                  setProjectData({ ...projectData, nombre: target.value })
                }
              />

              <TextField
                {...props}
                required
                id="descripcion"
                label="Descripción"
                variant="standard"
                placeholder="Descipción Proyecto"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.descripcion}
                onChange={({ target }) =>
                  setProjectData({ ...projectData, descripcion: target.value })
                }
                multiline
                rows={3}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={classes.toolbar}>
                  <DatePicker
                    {...props}                   
                    openTo="day"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    value={projectData.fechaInicio}
                    onChange={(newValue) => {
                      setProjectData({
                        ...projectData,
                        fechaInicio: newValue,
                      });

                      setMinDateFinal(newValue);
                    }}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Inicio"
                        variant="standard"
                        sx={{ width: "50%", marginBottom: "16px" }}
                      />
                    )}
                  />

                  <DatePicker
                    {...props}
                    minDate={minDateFinal}
                    openTo="day"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    value={projectData.fechaFinal}
                    onChange={(newValue) =>
                      setProjectData({
                        ...projectData,
                        fechaFinal: newValue,
                      })
                    }
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fin"
                        variant="standard"
                        sx={{
                          width: "49%",
                          marginBottom: "16px",
                          marginLeft: "16px",
                        }}
                      />
                    )}
                  />
                </div>
              </LocalizationProvider>

              <div className={classes.toolbar}>
                <SelectBeneficiaries
                  beneficiaries={beneficiarieType}
                  disabled={props.disabled}
                />
                <TextField
                  {...props}
                  required
                  id="outlined-required"
                  label="Cantidad de Beneficiarios"
                  variant="standard"
                  placeholder="Cantidad de Beneficiarios"
                  type="number"
                  sx={{
                    width: "50%",
                    marginBottom: "16px",
                    marginLeft: "16px",
                  }}
                  value={countBeneficiare}
                  onChange={({ target }) => setCountBeneficiare(target.value)}
                />
              </div>

              <TextField
                {...props}
                required
                id="outlined-required"
                label="Detalles los beneficiarios"
                variant="standard"
                placeholder="Detalles los beneficiarios"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.descripcion}
                value={projectData.datosBeneficiario}
                onChange={({ target }) =>
                  setProjectData({
                    ...projectData,
                    datosBeneficiario: target.value,
                  })
                }
                multiline
                rows={4}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="w-100">
              <div className="form-group">
                {/* <label htmlFor="provincia">Lugar Implementación</label> */}
                <SelectProvinces
                  provinces={provinces}
                  disabled={props.disabled}
                />
              </div>
              <div className="form-group">
                <SelectMunicipality
                  municipality={municipality}
                  disabled={props.disabled}
                />
              </div>

              <div className="form-group">
                <SelectChallenges
                  challenges={challengesImpacted}
                  disabled={props.disabled}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="desafio">Desafío Impactado</label>
                <select
                  className="custom-select form-control-border"
                  id="desafio"
                >
                  {challengesImpacted.map((x) => {
                    return <option value={x.value}>{x.text}</option>;
                  })}
                </select>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
