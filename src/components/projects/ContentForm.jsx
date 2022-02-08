import React, {useState,useMemo, useEffect} from 'react';
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
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';

//icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

//components
import ProjectForm from './ProjectForm'
import BudgetForm from './BudgetForm'
import TaksForm from './TaksForm'
import FileForm from './FileForm'

//context
import { ProjectContext } from '../../context/ProjectContext'

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

  const params = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const[projectData, setProjectData] = useState({
    idProyecto: 0,
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: null,
    fechaFinal: null,
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

  const providerProject = useMemo(
    () => ({ projectData, setProjectData }),
    [projectData, setProjectData]
  ); 

  const handleFinish = async () => {
    swal({
      title: `Deseas guardar los cambios realizados?`,
      text: "Los datos serán guardado de manera bacana!",
      icon: "info",
      buttons: true,
      dangerMode: true,
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
    if(params.id > 0)  {  
      const data = await getProjectByID(params.id);      
      setProjectData(data);
    } 
  }

  useEffect(() => {    
    project();
  }, [])



  return (
    <>
      <ProjectContext.Provider value={providerProject}>
        <Paper style={{ margin: 10, padding: 20 }} elevation={3}>
          <Box
            sx={{
              color: "azure",
              textAlign: "center",
              width: "140px",
              marginLeft: "8px",
              marginBottom: "12px"
            }}
          >
            <Chip icon={<RemoveRedEyeOutlinedIcon />} label="MODO LECTURA" color="warning"  variant="outlined" />
          </Box>

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step style={{ fontSize: "20px" }} key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <React.Fragment>
            <Box style={{ mb: 20, padding: 20 }}>
              {activeStep === 0 ? (
                <ProjectForm />
              ) : activeStep === 1 ? (
                <BudgetForm />
              ) : activeStep === 2 ? (
                <TaksForm />
              ) : activeStep === 3 ? (
                <FileForm />
              ) : (
                <h3>Listo, proceso finalizado</h3>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
                endIcon={<CloseIcon />}
                sx={{ mr: 1 }}
              >
                Cancelar
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="outlined"
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
                  variant="outlined"
                  color="primary"
                  onClick={handleFinish}
                  endIcon={<DoneAllIcon />}
                >
                  Finalizar
                </Button>
              ) : (
                <Button
                  variant="outlined"
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
        {/* <form onSubmit={handledSubmit}>
        <section className="content pt-3 w-100">
          <div className="container-fluid">
            <div className="card card-info card-outline">
              <div className="card-header">
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-sm col-sm btn-outline-link w-100 border-right btn-tab"
                    onClick={() => {
                      switchDisplay(1);
                    }}
                  >
                    <i
                      className="fa fa-object-ungroup"
                      aria-hidden="true"
                      style={styleFa}
                    >
                      &nbsp;&nbsp;
                    </i>
                    Datos Generales
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm col-sm btn-outline-link w-100 border-right btn-tab"
                    onClick={() => {
                      switchDisplay(2);
                    }}
                  >
                    <i
                      className="fa fa-credit-card"
                      aria-hidden="true"
                      style={styleFa}
                    >
                      &nbsp;&nbsp;
                    </i>
                    Propuesta Ecónomica
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm col-sm btn-outline-link w-100 border-right btn-tab"
                    onClick={() => {
                      switchDisplay(3);
                    }}
                  >
                    <i
                      className="fa fa-list-alt"
                      aria-hidden="true"
                      style={styleFa}
                    >
                      &nbsp;&nbsp;
                    </i>
                    Tareas
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm col-sm btn-outline-link w-100 btn-tab"
                    onClick={() => {
                      switchDisplay(4);
                    }}
                  >
                    <i
                      className="fa fa-file-alt"
                      aria-hidden="true"
                      style={styleFa}
                    >
                      &nbsp;&nbsp;
                    </i>
                    Documentos
                  </button>
                </div>
              </div>

              <div className="card-body">
              
              </div>

              <div className="card-footer">
                <button type="button" className="btn btn-outline-danger mr-2">
                  <i className="fa fa-times"></i>
                  &nbsp;&nbsp;Cancelar
                </button>
                <button type="submit" className="btn btn-outline-info">
                  <i className="fa fa-save"></i>
                  &nbsp;&nbsp;Enviar
                </button>
              </div>
            </div>
          </div>
        </section>
      </form> */}
      </ProjectContext.Provider>
    </>
  );

}
