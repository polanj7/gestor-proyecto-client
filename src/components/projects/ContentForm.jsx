import React, {useState,useMemo, useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//services
import  { addProject, getProjectByID, updateProject }  from '../../services/projectsServices';

//mui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import ChipControl from '../controls/Chip';

//icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditICon from '@mui/icons-material/Edit';


//components
import ProjectForm from './ProjectForm'
import BudgetForm from './BudgetForm'
import TaksForm from './TaksForm'
import FileForm from './FileForm'

//context
import { ProjectContext } from '../../context/ProjectContext'
import { ParameterContext } from '../../context/ParameterContext'


//sweet alert
import swal from 'sweetalert';

const steps = [
  "Datos Generales",
  "Propuesta Economica",
  "Propuesta operativa",
  "Gestion Interna",
];

const countSteps = steps.length - 1;
 
export default function ContentForm() {
  const { id, mode } = JSON.parse(sessionStorage.getItem("parameterProject"));

  const {parameterProject, setParameterProject} = useContext(ParameterContext); 

  const params = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const[projectData, setProjectData] = useState({
    idProyecto: 0,
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: new Date(),
    fechaFinal: new Date() + 1,
    idTipoBeneficiario: "",
    datosBeneficiario: "",
    tipoMoneda: "DOP",
    idTipoPresupuesto: "D",
    rangoPresupuestado: 0,
    descripcionEspecie: "",
    desafiosProyectos: [],    
    documentosProyectos: [],
    lugaresImplementaciones: [], 
    tareas: [],   
    territoriosImpactados: []
  });
  
  const[disabled, setDisabled] = useState(true)

  const providerProject = useMemo(
    () => ({ projectData, setProjectData }),
    [projectData, setProjectData]
  ); 

  const handleFinish = async () => {
    swal({
      title: `Registro de Proyetos`,
      text: "Deseas guardar los datos digitados?",
      icon: "info",
      buttons: true      
    }).then((willSave) => {
      if (willSave) { 
        
        if(params.id > 0){
          //update
          updateProject(params.id, projectData).then((x) => {           
            navigate("/project", { raplece: true });
          });
        }else{
          //insert
          addProject(projectData).then((x) => {            
            navigate("/project", { raplece: true });
          });
        }
        
      }
    });
  }  

  const handleNext = () => {    
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
     setActiveStep((prevActiveStep) => prevActiveStep - 1);  
  };

  const handleClose = () => {
    if (window.confirm("Deseas salir?"))
      navigate("/project", { replace: true });
  };

  const project = async() => {  

    if(id > 0)  {  
      const data = await getProjectByID(id);      
      setProjectData(data);
    } 
  }

  useEffect(async() => {    
    await project();
    if(id > 0 && mode === 'read-only'){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  }, [])

  return (
    <>
      <ProjectContext.Provider value={providerProject}>
        <Paper style={{ margin: 1, padding: 20 }} elevation={3}>
          {id > 0 && mode === "read-only" ? (
            <ChipControl
              icon={<RemoveRedEyeOutlinedIcon />}
              label="MODO LECTURA"
              color="warning"
              variant="outlined"
            />
          ) : id > 0 && mode === "read-write" ? (
            <ChipControl
              icon={<EditICon />}
              label="MODO EDICION"
              color="success"
              variant="outlined"
            />
          ) : (
            id === 0 &&
            mode ===
              "write" ? (
                <ChipControl
                  icon={<EditICon />}
                  label="MODO DIGITACION"
                  color="primary"
                  variant="outlined"
                />
              ) :<>
              
              </>
          )}

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step
                  style={{ fontSize: "20px" }}
                  key={label}
                  onClick={() => setActiveStep(index)}
                >
                  <StepLabel style={{ cursor: "pointer" }}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <React.Fragment>
            <Box style={{ mb: 20, padding: 20, height: "60vh" }}>
              {activeStep === 0 ? (
                <ProjectForm disabled={disabled} />
              ) : activeStep === 1 ? (
                <BudgetForm disabled={disabled} />
              ) : activeStep === 2 ? (
                <TaksForm disabled={disabled} />
              ) : activeStep === 3 ? (
                <FileForm disabled={disabled} />
              ) : (
                <h3>Listo, proceso finalizado</h3>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={handleClose}
                endIcon={<CloseIcon />}
                sx={{ mr: 1 }}
              >
                Cancelar
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="contained"
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                startIcon={<ArrowCircleLeftIcon />}
              >
                Anterior
              </Button>

              {activeStep === countSteps ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFinish}
                  endIcon={<DoneAllIcon />}
                >
                  Finalizar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowCircleRightIcon />}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Paper>
      </ProjectContext.Provider>
    </>
  );

}