import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';

//Services
import { getProvince } from '../../services/territoriesServices'
import { getBeneficiarios } from '../../services/beneficiariosServices'
import SelectProvinces from '../controls/SelectProvinces';

//mui
import Typography from "@mui/material/Typography";

//context
import { ProjectContext } from '../../context/ProjectContext';

const challengesImpacted = [
  {text: 'Educación', value: 'Educación'},
  {text: 'Salud', value: 'Salud'},
  {text: 'Saneamiento', value: 'Saneamiento'},
  {text: 'Juventud', value: 'Juventud'},
  {text: 'Otros', value: 'Otros'}
]

export default function ProjectForm() {

  const {projectData, setProjectData} = useContext(ProjectContext); 
 
  //territories
  const[municipality, setMunicipality] = useState([]);
  const[neighborhood, setNeighborhood] = useState([]);
  const[provinces, setProvinces] = useState([]); 

  const[beneficiarieType, setBeneficiarieType] = useState(0);
  const[countBeneficiare, setCountBeneficiare] = useState(0);


  useEffect(() =>{
      getProvinced();    
  }, [])

  const getProvinced = async () =>{
    const resp = await getProvince();   
    setProvinces(resp);   
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
                  rows={4}
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

              <div className="row mt-2">
                <div className="form-group col-sm-6">
                  <label htmlFor="tipoBeneficiario">Tipo de Beneficiario</label>
                  <select
                    className="custom-select form-control-border"
                    data-placeholder="Select a State"
                    style={{ width: "100%" }}
                    value={beneficiarieType}
                    onChange={({ target }) => setBeneficiarieType(target.value)}
                  >
                    <option>Sin definir</option>
                    <option>Sin definir</option>
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

              <div className="form-group">
                <label htmlFor="descripcion">Beneficiario(s)</label>
                <textarea
                  className="form-control form-control-border w-100"
                  id="descripcion"
                  placeholder="Detalles los beneficiarios"
                  value={projectData.datosBeneficiario}
                  onChange={({ target }) => setProjectData({...projectData, datosBeneficiario: target.value})}
                  rows={4}
                />
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
                  {
                    challengesImpacted.map(x =>{
                      return <option value={x.value}>{x.text}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
