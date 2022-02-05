import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';

//Services
import { getProvince } from '../../services/territoriesServices'
import { getBeneficiarios } from '../../services/beneficiariosServices'
import SelectProvinces from '../controls/SelectProvinces';

//mui
import Typography from "@mui/material/Typography";

//context
import { ProjectContext } from '../../context/ProjectContext'


export default function ProjectForm() {

  const {projectData, setProjectData} = useContext(ProjectContext); 
 
  //territories
  const[municipality, setMunicipality] = useState([]);
  const[neighborhood, setNeighborhood] = useState([]);
  const[provinces, setProvinces] = useState([]); 

  const[beneficiaries, setBeneficiaries] = useState([]); 
  const[beneficiarieType, setBeneficiarieType] = useState(0);
  const[countBeneficiare, setCountBeneficiare] = useState(0);


  useEffect(() =>{
      getProvinced();
      getBeneficiariosProject();
  }, [])

  const getProvinced = async () =>{
    const resp = await getProvince();   
    setProvinces(resp);   
  }

  const getBeneficiariosProject = async () =>{
    const resp = await getProvince();   
    setBeneficiaries(resp);   
  }

  const handleAddProject = (e) =>{
    e.preventDefauld();
  }

  return (   
    <>    
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Datos Generales del Proyecto
      </Typography>

      <form onSubmit={handleAddProject}>
        <div className="row">
          <div className="col-sm-8">
            <div className="w-75">
              <div className="form-group">
                <label htmlFor="nombres">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-border w-100"
                  id="nombres"
                  name="nombre"
                  placeholder="Nombre Proyecto"
                  value={projectData.nombre}
                  onChange={({ target }) => setProjectData({...projectData, nombre: target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  className="form-control form-control-border w-100"
                  id="descripcion"
                  placeholder="Descipción Proyecto"
                  value={projectData.descripcion}
                  onChange={({ target }) => setProjectData({...projectData, descripcion: target.value})}
                />
              </div>

              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="fechaInicio">Inicio</label>
                  <input
                    type="date"
                    className="form-control form-control-border w-100"
                    id="fechaInicio"
                    value={projectData.fechaInicio}
                    onChange={({ target }) => setProjectData({...projectData, fechaInicio: target.value})}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="fechafin">Fin</label>
                  <input
                    type="date"
                    className="form-control form-control-border w-100"
                    id="fechaFin"
                    value={projectData.fechaFinal}
                    onChange={({ target }) => setProjectData({...projectData, fechaFinal: target.value})}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="tipoBeneficiario">Tipo de Beneficiario</label>
                  <select
                    className="custom-select form-control-border"
                    data-placeholder="Select a State"
                    style={{ width: "100%" }}
                    value={beneficiarieType}
                    onChange={({ target }) => setBeneficiarieType(target.value)}
                  >
                    <option>Bene 1</option>
                    <option>Bene 2</option>
                  </select>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cantidadBeneficiarios">
                    Cantidad de Beneficiarios
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-border w-100"
                    id="beneficiarios"
                    placeholder="Cantidad Beneficiarios"
                    value={countBeneficiare}
                    onChange={({ target }) => setCountBeneficiare(target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="w-100">
              <div className="form-group">
                <label htmlFor="provincia">Lugar Implementación</label>
                <SelectProvinces provinces={provinces} />
              </div>

              <div className="form-group">
                <label htmlFor="barrios">Territorios Impactados</label>
                <SelectProvinces provinces={provinces} />
              </div>

              <div className="form-group">
                <label htmlFor="desafio">Desafío Impactado</label>
                <select
                  className="custom-select form-control-border"
                  id="desafio"
                >
                  <option>Educación</option>
                  <option>Salud</option>
                  <option>Saneamiento</option>
                  <option>Juventud</option>
                  <option>Otros</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
