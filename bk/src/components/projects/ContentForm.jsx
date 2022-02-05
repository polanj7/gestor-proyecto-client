import React, {useState,useMemo, useContext} from 'react';

//services
import { Outlet, useNavigate } from 'react-router-dom';
import  { addProject, getProject }  from '../../services/projectsServices';

//mui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

//components
import ProjectForm from './ProjectForm'
import BudgetForm from './BudgetForm'
import TaksForm from './TaksForm'
import FileForm from './FileForm'

//context
import { ProjectContext } from '../../context/ProjectContext'


import { Paper } from '@mui/material';

const steps = [
  'Datos Generales', 
  'Propuesta Economica', 
  'Tareas / Metas', 
  'Documentos'  
];
const countSteps = steps.length - 1;

 
export default function ContentForm() {

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
    idTipoPresupuesto: "",
    rangoPresupuestado: 0,
    descripcionEspecie: "",
    desafiosProyectos: [],    
    documentosProyectos: [],
    lugaresImplementaciones: [], 
    tareas: [],   
    territoriosImpactados: []
  });

  const providerProject = useMemo(() => ({projectData, setProjectData}), [projectData, setProjectData]);

  const displays =[
    {display: "f-1", action: -1},
    {display: "f-2", action: 0},
    {display: "f-3", action: 1},
    {display: "f-4", action: 2}    
  ]

  const switchDisplay = () =>{
    const diplay = displays.find(x => x.action == activeStep)?.display || "/project";
    navigate(diplay);   
  }  

  const handledSubmit = async (e) =>{
    e.preventDefault();

    //Desafios
    let dataDesafiosProyectos = [
      {
        idDesafioProyecto: 0,
        idProyecto: 0,
        idDesafio: 1,
      },
      {
        idDesafioProyecto: 0,
        idProyecto: 0,
        idDesafio: 2,
      },
    ];
    //Documentos
    let dataDocumentosProyectos = [
      {
        idDocumento: 0,
        idProyecto: 0,
        idTarea: 5,
        contenido: "",
        fecha: new Date(),
        nombreArchivo: "",
        ext: "",
        url: "",
      },
    ];
    //Implementacion
    let dataLugaresImplementaciones = [
      {
        idImplementacion: 0,
        idProyecto: 0,
        idProvincia: 17
      }, 
      {
        idImplementacion: 0,
        idProyecto: 0,
        idProvincia: 31
      }
    ]
    //Tareas
    let dataTareas = [
      {
        idTarea: 0,
        idProyecto: 0,
        descripcion: "Repartir la Pizza entre todo.",
        fechaInicio: new Date(),
        fechaFinal: new Date(),
        idEstado: 1
      }
    ]
    //Territorios
    let dataTerritoriosImpactados = [
      {
        idImpacto: 0,
        idProyecto: 0,
        idMunicipio: 1,
        idBarrio: 1,
      }
    ]   

    //Desafios
    projectData.desafiosProyectos = dataDesafiosProyectos;
    //Documentos
    //projectData.documentosProyectos = dataDocumentosProyectos;
    //Implementacion
    projectData.lugaresImplementaciones = dataLugaresImplementaciones;
    //Tareas
    projectData.tareas = dataTareas;
    //Territorios
    projectData.territoriosImpactados = dataTerritoriosImpactados;

    addProject(projectData).then((resp) => {
      console.log("OK");
    });
  }

  const handleFinish = async () => {
    if (!window.confirm("Deseas Finalizar?")) {
      return;
    }

    //save project
    addProject(projectData).then(x => {
      console.log(x);
      navigate("/project", { raplece: true });
    });    
  }  

  const handleNext = async() => {    
     await setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
     if(activeStep === 0){

     }else if(activeStep === 1){

     }else if(activeStep === 2){
       
     }else if(activeStep === 3){
       
    }     
  };

  const handleBack = async() => {
    await setActiveStep((prevActiveStep) => prevActiveStep - 1);  
  };

  const handleClose = () =>{
    if(window.confirm('Desea salir?'))
     navigate('/project', { replace: true })
  }

  return (
    <>
      <ProjectContext.Provider value={providerProject}>
        <Paper style={{ margin: 20, padding: 20 }} elevation={3}>
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
