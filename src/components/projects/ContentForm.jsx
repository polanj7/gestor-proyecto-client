import React, {useState,useMemo, useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//services
import  { addProject, getProjectByID, updateProject }  from '../../services/projectsServices';
import  { addFiles }  from '../../services/filesServices';

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
import ValidationForm from './ValidationForm';

const steps = [
  "Datos Generales",
  "Propuesta Economica / Donante",
  "Propuesta operativa",
  "Gestion Interna",
  "Resumen",
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
      codigo: null,
      nombre: null,
      descripcion: null,
      objetivoGeneral: null,
      objetivoEspecifico: null,
      resultados: null,
      fechaInicio: new Date(),
      fechaFinal: new Date(),
      idRangoBeneficiario: 0,
      cantidadBeneficiarios: 0,
      anos: 0,
      meses: 0,
      dias: 0,
      idRangoPresupuestario: 0,
      montoPresupuestarioDOP: 0,
      montoPresupuestarioUSD: 0,
      tipoMoneda: null,
      idGerente: 0,
      isDelete: false,
      fechaCreacion: new Date(),
      aliado: {
        // idAliado: 0,
        // nombre: string,
        // identificacion: string,
        // idClasificacion: 0,
        // direccion: string,
        // informacion: string
      },
      donante: {
        // idDonante: 0,
        // idProyecto: 0,
        // nombre: string,
        // identificacion: string,
        // idClasificacion: 0,
        // idDonacionClasificacion: 0,
        // monto1: 0,
        // monto2: 0,
        // donacion: 0,
        // direccion: string,
        // informacion: string
      },
      desafiosProyectos: [
        // {
        //   idDesafioProyecto: 0,
        //   idProyecto: 0,
        //   idDesafio: 0
        // }
      ],
      documentosProyectos: [
        // {
        //   idDocumento: 0,
        //   idProyecto: 0,
        //   idTarea: 0,
        //   contenido: string,
        //   fecha: new Date(),
        //   nombreArchivo: string,
        //   ext: string,
        //   url: string,
        //   size: 0,
        //   file: string
        // }
      ],
      lugaresImplementaciones: [
        // {
        //   idImplementacion: 0,
        //   idProyecto: 0,
        //   idProvincia: 0
        // }
      ],
      actividades: [
        // {
        //   idActividad: 0,
        //   descripcion: string,
        //   idProyecto: 0,
        //   orden: 0,
        //   tareas: [
        //     {
        //       idTarea: 0,
        //       descripcion: string,
        //       idActividad: 0,
        //       idResponsable: 0,
        //       fechaInicio: new Date(),
        //       fechaFinal: new Date(),
        //       idEstado: 0,
        //       fechaCreacion: new Date()
        //     }
        //   ]
        // }
      ],
      tiposBeneficiarioProyectos: [
        // {
        //   idTipoBeneficiarioProyecto: 0,
        //   idTipo: 0,
        //   idProyecto: 0
        // }
      ]
      
  });

  /*

  {
  idProyecto: 0,
  codigo: "string",
  nombre: "string",
  descripcion: string,
  objetivoGeneral: string,
  objetivoEspecifico: string,
  resultados: string,
  fechaInicio: 2022-04-06T03:57:34.602Z,
  fechaFinal: 2022-04-06T03:57:34.602Z,
  idRangoBeneficiario: 0,
  cantidadBeneficiarios: 0,
  anos: 0,
  meses: 0,
  dias: 0,
  idRangoPresupuestario: 0,
  montoPresupuestarioDOP: 0,
  montoPresupuestarioUSD: 0,
  tipoMoneda: string,
  idGerente: 0,
  isDelete: true,
  fechaCreacion: 2022-04-06T03:57:34.602Z,
  aliado: {
    idAliado: 0,
    nombre: string,
    identificacion: string,
    idClasificacion: 0,
    direccion: string,
    informacion: string
  },
  donante: {
    idDonante: 0,
    idProyecto: 0,
    nombre: string,
    identificacion: string,
    idClasificacion: 0,
    idDonacionClasificacion: 0,
    monto1: 0,
    monto2: 0,
    donacion: 0,
    direccion: string,
    informacion: string
  },
  desafiosProyectos: [
    {
      idDesafioProyecto: 0,
      idProyecto: 0,
      idDesafio: 0
    }
  ],
  documentosProyectos: [
    {
      idDocumento: 0,
      idProyecto: 0,
      idTarea: 0,
      contenido: string,
      fecha: 2022-04-06T03:57:34.602Z,
      nombreArchivo: string,
      ext: string,
      url: string,
      size: 0,
      file: string
    }
  ],
  lugaresImplementaciones: [
    {
      idImplementacion: 0,
      idProyecto: 0,
      idProvincia: 0
    }
  ],
  actividades: [
    {
      idActividad: 0,
      descripcion: string,
      idProyecto: 0,
      orden: 0,
      tareas: [
        {
          idTarea: 0,
          descripcion: string,
          idActividad: 0,
          idResponsable: 0,
          fechaInicio: 2022-04-06T03:57:34.602Z,
          fechaFinal: 2022-04-06T03:57:34.602Z,
          idEstado: 0,
          fechaCreacion: 2022-04-06T03:57:34.602Z
        }
      ]
    }
  ],
  tiposBeneficiarioProyectos: [
    {
      idTipoBeneficiarioProyecto: 0,
      idTipo: 0,
      idProyecto: 0
    }
  ]
}
  
  */

  /*
  
  {
  "idProyecto": 0,
  "codigo": "",
  "nombre": "",
  "descripcion": "",
  "objetivoGeneral": "",
  "objetivoEspecifico": "",
  "resultados": "",
  "fechaInicio": "2022-03-23T03:48:29.894Z",
  "fechaFinal": "2022-03-23T03:48:29.894Z",
  "idRangoBeneficiario": 1, //Select
  "cantidadBeneficiarios": 0,
  "idDonante": 1,
  "idAliado": 1, //Select
  "anos": 0,
  "meses": 0,
  "dias": 0,
  "idRangoPresupuestario": 0,
  "montoPresupuestario": 0,
  "tipoMoneda": "string",
  "idGerente": 0,
  "isDelete": true,
  "fechaCreacion": "2022-03-23T03:48:29.894Z",
  "desafiosProyectos": [],
  "documentosProyectos": [],
  "lugaresImplementaciones": [],
  "actividades": [],
  "tiposBeneficiarioProyectos": []
}
  */

  /*
  {
  "idProyecto": 0,
  "codigo": "string",
  "nombre": "string",
  "descripcion": "string",
  "fechaInicio": "2022-02-25T19:07:24.703Z",
  "fechaFinal": "2022-02-25T19:07:24.703Z",
  "idTipoBeneficiario": "string",
  "datosBeneficiario": "string",
  "idTipoPresupuesto": "string",
  "rangoPresupuestado": 0,
  "descripcionEspecie": "string",
  "desafiosProyectos": [
    {
      "idDesafioProyecto": 0,
      "idProyecto": 0,
      "idDesafio": 0
    }
  ],
  "documentosProyectos": [
    {
      "idDocumento": 0,
      "idProyecto": 0,
      "idTarea": 0,
      "contenido": "string",
      "fecha": "2022-02-25T19:07:24.703Z",
      "nombreArchivo": "string",
      "ext": "string",
      "url": "string"
    }
  ],
  "lugaresImplementaciones": [
    {
      "idImplementacion": 0,
      "idProyecto": 0,
      "idProvincia": 0
    }
  ],
  "tareas": [
    {
      "idTarea": 0,
      "descripcion": "string",
      "idProyecto": 0,
      "fechaInicio": "2022-02-25T19:07:24.703Z",
      "fechaFinal": "2022-02-25T19:07:24.703Z",
      "idEstado": 0
    }
  ],
  "territoriosImpactados": [
    {
      "idImpacto": 0,
      "idProyecto": 0,
      "idMunicipio": 0,
      "idBarrio": 0
    }
  ]
}
  
  */
  
  const[disabled, setDisabled] = useState(true)


  const providerProject = useMemo(
    () => ({ projectData, setProjectData }),
    [projectData, setProjectData]
  ); 

  const createFiles = (codigo) =>{
    for(let i = 0; i < projectData.documentosFisicos?.length; i++){              
      let formData = new FormData(); 
      formData.append('File', projectData.documentosFisicos[i].file);
      formData.append('CodigoProyecto', codigo); 
      addFiles(formData);
    }
  }

  const handleFinish = async () => {
    swal({
      title: `Registro de Proyetos`,
      text: "¿Deseas guardar los datos digitados?",
      icon: "info",
      buttons: true      
    }).then((willSave) => {
      if (willSave) {         
        if(params.id > 0){
          //update
          updateProject(params.id, projectData).then((x) => {  
            createFiles(x.data.data.codigo);
            navigate("/project", { raplece: true });
          });
        }else{
          //insert
          addProject(projectData).then((x) => {                 
            createFiles(x.data.data.codigo);
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
      data.documentosFisicos = [];
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
            <Box style={{ mb: 20, padding: 20, minHeight: "65vh" }} className="container" >
              {activeStep === 0 ? (
                <ProjectForm disabled={disabled} />
              ) : activeStep === 1 ? (
                <BudgetForm disabled={disabled} />
              ) : activeStep === 2 ? (
                <TaksForm disabled={disabled} />
              ) : activeStep === 3 ? (
                <FileForm disabled={disabled} />
              ): activeStep === 4 ? (
                <ValidationForm />
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
