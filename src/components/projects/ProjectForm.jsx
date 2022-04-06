import React, { useEffect, useState, useContext } from "react";
import Moment from "react-moment";

//Services
import {
  getProvincias,
  getMunicipios,
  getDistritos,
  getSecciones,
  getBarrios,
} from "../../services/territoriesServices";
import { getBeneficiarios, getRangeBeneficiarios, getTipoBeneficiarios } from "../../services/beneficiariosServices";

//components
import SelectBeneficiaries from "../controls/SelectBeneficiaries";
import SelectChallenges from "../controls/SelectChallenges";

import SelectProvinces from "../controls/SelectProvinces";
import SelectMunicipality from "../controls/SelectMunicipality";
import DistritosSelect from "../controls/DistritosSelect";
import SeccionSelect from "../controls/SeccionSelect";
import BarrioSelect from "../controls/BarrioSelect";
import AliadosForm from "./AliadosForm";
import DonantesForm from "./DonantesForm";

import AliadosSelect from "../controls/AliadosSelect";
import DonanteSelect from "../controls/DonanteSelect";
import RangoBeneficiarios from "../controls/RangoBeneficiarios";

//mui
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//context
import { ProjectContext } from "../../context/ProjectContext";
import TerritoriosImpactadosBarrios from "../controls/TerritoriosImpactadosBarrios";

//services
import { getAliados } from "../../services/aliadosServices";
import { getDonantes } from "../../services/donantesServices";

const challengesImpacted = [
  { text: "Educación", value: "Educación" },
  { text: "Salud", value: "Salud" },
  { text: "Saneamiento", value: "Saneamiento" },
  { text: "Juventud", value: "Juventud" },
  { text: "Otros", value: "Otros" },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "8px",
  },
}));
export default function ProjectForm(props) {
  const classes = useStyles();
  const { projectData, setProjectData } = useContext(ProjectContext);

  const [beneficiarieType, setBeneficiarieType] = useState([]);
  const [countBeneficiare, setCountBeneficiare] = useState(0);

  //territories
  const [provinces, setProvinces] = useState([]);
  const [municipality, setMunicipality] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [barrios, setBarrios] = useState([]);
  //select territorios
  const [provincesIDs, setProvincesIDs] = useState([]);
  const [municipiosIDs, setMunicipiosIDs] = useState([]);
  const [distritosIDs, setDistritosIDs] = useState([]);
  const [seccionesIDs, setSeccionesIDs] = useState([]);
  const [barriosIDs, setBarriosIDs] = useState([]);
  //aliados
  const [aliadosList, setAliadosList] = useState([]);
  //donantes
  const [donantesList, setDonantesList] = useState([]);
  //beneficiarios
  const [rangoList, setRangoList] = useState([]);
  //duracion
  const [dias, setDias] = useState(0);
  const [meses, setMeses] = useState(0);
  const [anos, setAnos] = useState(0);
  //modals
  const [isModalOpenAliados, setIsModalOpenAliados] = useState(false);
  const [isModalOpenDonantes, setIsModalOpenDonantes] = useState(false);

  const [seletedDataProv, setSeletedDataProv] = useState([]);

  const getProvinced = async () => {
    const resp = await getProvincias();
    setProvinces(resp);
  };

  const getMunicipalityd = async (ids) => {
    const resp = await getMunicipios(ids);
    setMunicipality(resp);
  };

  const getDistricts = async (ids) => {
    const resp = await getDistritos(ids);
    setDistricts(resp);
  };

  const getSeccion = async (ids) => {
    const resp = await getSecciones(ids);
    setSeccion(resp);
  };

  const getBarrioss = async (ids) => {
    const resp = await getBarrios(ids);
    setBarrios(resp);
  };

  const getBeneficiaries = async () => {
    const resp = await getTipoBeneficiarios();    
    resp.unshift({ IdTipo: -99, nombre: "--- Crear Nuevo ---" });
    setBeneficiarieType(resp);
  };

  const getAliadosList = async () => {
    const resp = await getAliados();
    resp.unshift({ IdAliado: -99, nombre: "--- Crear Nuevo ---" });
    setAliadosList(resp);
  };

  const getDonantesList = async () => {
    const resp = await getDonantes();
    resp.unshift({ idDonante: -99, nombre: "--- Crear Nuevo ---" });
    setDonantesList(resp);
  };

  const getRangoBeneficiarios = async () => {
    const resp = await getRangeBeneficiarios();    
    setRangoList(resp);
  };

  const handleChangeBeneficiaries = (e) => {
    setIsModalOpenAliados(true);
  };

  
  const handleChangeRangeBenef = (e) => {
    setIsModalOpenAliados(true);
  };

  const handleChangeAliados = (e) => {
    setIsModalOpenAliados(true);
  };

  const handleChangeDonantes = (e) => {};

  useEffect(() => {
    getProvinced();
    getBeneficiaries();
    getAliadosList();
    //getDonantesList();
    getRangoBeneficiarios();
  }, []);

  useEffect(() => {
    getMunicipalityd(provincesIDs);
    getDistricts(1);
  }, [provincesIDs]);

  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Datos Generales
      </Typography>

      <form>
        <div className="row">
          <div className="col-sm-12">
            <div style={{ width: "100%" }}>
              <TextField
                {...props}
                autoComplete="false"
                required
                id="nombre"
                label="Nombre"
                // variant="standard"
                placeholder="Nombre del Proyecto"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.nombre}
                onChange={({ target }) =>
                  setProjectData({ ...projectData, nombre: target.value })
                }
              />

              <div className={classes.toolbar}>
                <TextField
                  {...props}
                  required
                  id="descripcion"
                  label="Descripción"
                  // variant="standard"
                  placeholder="Descipción Proyecto"
                  sx={{ width: "49%", marginBottom: "16px" }}
                  value={projectData.descripcion}
                  onChange={({ target }) =>
                    setProjectData({
                      ...projectData,
                      descripcion: target.value,
                    })
                  }
                  multiline
                  rows={2}
                />
                <TextField
                  {...props}
                  required
                  id="objetivoGeneral"
                  label="Resultados Esperados"
                  placeholder="Resultados Esperados"
                  sx={{ width: "49%", marginBottom: "16px" }}
                  value={projectData.resultados}
                  onChange={({ target }) =>
                    setProjectData({
                      ...projectData,
                      resultados: target.value,
                    })
                  }
                  multiline
                  rows={2}
                />
              </div>

              <div className={classes.toolbar}>
                <TextField
                  {...props}
                  required
                  id="objetivoGeneral"
                  label="Objetivo General"
                  // variant="standard"
                  placeholder="Objetivo General"
                  sx={{ width: "49%", marginBottom: "16px" }}
                  value={projectData.objetivoGeneral}
                  onChange={({ target }) =>
                    setProjectData({
                      ...projectData,
                      objetivoGeneral: target.value,
                    })
                  }
                  multiline
                  rows={2}
                />

                <TextField
                  {...props}
                  required
                  id="objetivoEspecifico"
                  label="Objetivo Especifico"
                  // variant="standard"
                  placeholder="Objetivo Especifico"
                  sx={{ width: "49%", marginBottom: "16px", fontSize: "10px" }}
                  value={projectData.objetivoEspecifico}
                  onChange={({ target }) =>
                    setProjectData({
                      ...projectData,
                      objetivoEspecifico: target.value,
                    })
                  }
                  multiline
                  rows={2}
                />
              </div>

              <RangoBeneficiarios
                rango={rangoList}
                disabled={props.disabled}
                handleChangeRangeBenef={handleChangeRangeBenef}
              />

              <AliadosSelect
                aliados={aliadosList}
                disabled={props.disabled}
                handleChangeAliados={handleChangeAliados}
              />

              {/* <DonantesForm
                donantes={donantesList}
                disabled={props.disabled}
                handleChangeDonantes={handleChangeDonantes}
              /> */}

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              </LocalizationProvider> */}
              {/* <DonanteSelect
                donantes={donantesList}
                disabled={props.disabled}
                handleChangeDonantes={handleChangeDonantes}
              /> */}

              <div className={classes.toolbar}>
                <SelectBeneficiaries
                  beneficiaries={beneficiarieType}
                  disabled={props.disabled}
                  handleChangeBeneficiaries={handleChangeBeneficiaries}
                />

                <TextField
                  {...props}
                  required
                  id="outlined-required"
                  label="Cantidad de Beneficiarios"
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

              {/* <TextField
                {...props}
                required
                id="outlined-required"
                label="Detalles los beneficiarios"
                variant="standard"
                placeholder="Detalles los beneficiarios"
                sx={{ width: "100%", marginBottom: "16px" }}
                value={projectData.datosBeneficiario}
                onChange={({ target }) =>
                  setProjectData({
                    ...projectData,
                    datosBeneficiario: target.value,
                  })
                }
                multiline
                rows={4}
              /> */}
            </div>
          </div>

          <div className="form-group">
            <SelectChallenges
              challenges={challengesImpacted}
              disabled={props.disabled}
            />
          </div>

          <div className="col-sm-12">
            <div style={{ width: "100%" }}>
              <AliadosForm
                isModalOpenAliados={isModalOpenAliados}
                setIsModalOpenAliados={setIsModalOpenAliados}
              />

              <Accordion>
                <AccordionSummary
                  style={{ backgroundColor: "red" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Territorios</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-group">
                    <SelectProvinces
                      provinces={provinces}
                      disabled={props.disabled}
                      provincesIDs={provincesIDs}
                      setProvincesIDs={setProvincesIDs}
                      seletedDataProv={seletedDataProv}
                      setSeletedDataProv={setSeletedDataProv}
                      idTest={projectData.idProyecto}
                    />
                  </div>
                  <div className="form-group">
                    <SelectMunicipality
                      municipality={municipality}
                      disabled={props.disabled}
                    />
                  </div>

                  <div className="form-group">
                    <DistritosSelect
                      districts={districts}
                      disabled={props.disabled}
                    />
                  </div>

                  <div className="form-group">
                    <SeccionSelect
                      seccion={seccion}
                      disabled={props.disabled}
                    />
                  </div>

                  <div className="form-group">
                    <BarrioSelect barrios={barrios} disabled={props.disabled} />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  style={{ backgroundColor: "red" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Duración</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    {...props}
                    required
                    id="outlined-required"
                    label="Dias"
                    placeholder="Dias"
                    type="number"
                    sx={{
                      width: "50%",
                      marginBottom: "16px",
                      marginLeft: "16px",
                    }}
                    value={dias}
                    onChange={({ target }) => setDias(target.value)}
                  />

                  <TextField
                    {...props}
                    required
                    id="outlined-required"
                    label="Meses"
                    placeholder="Meses"
                    type="number"
                    sx={{
                      width: "50%",
                      marginBottom: "16px",
                      marginLeft: "16px",
                    }}
                    value={meses}
                    onChange={({ target }) => setMeses(target.value)}
                  />

                  <TextField
                    {...props}
                    required
                    id="outlined-required"
                    label="Años"
                    placeholder="Años"
                    type="number"
                    sx={{
                      width: "50%",
                      marginBottom: "16px",
                      marginLeft: "16px",
                    }}
                    value={anos}
                    onChange={({ target }) => setAnos(target.value)}
                  />
                </AccordionDetails>
              </Accordion>

   
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
