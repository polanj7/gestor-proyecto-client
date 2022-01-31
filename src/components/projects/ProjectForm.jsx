import React, { useEffect, useState } from 'react';
import { getProvince } from '../../services/territoriesServices'
import SelectProvinces from '../controls/SelectProvinces';


export default function ProjectForm() {

  const[municipality, setMunicipality] = useState([]);
  const[neighborhood, setNeighborhood] = useState([]);

  const[provinces, setProvinces] = useState([]); 

  useEffect(() =>{
      getProvinced();
  }, [])

  const getProvinced = async () =>{
    const resp = await getProvince();   
    setProvinces(resp);   
  }

  return (
    <>
      <h4 className="text-info">
        <i className="fa fa-object-ungroup"></i> Proyecto
      </h4>
      <br />

      <div className="row">
        <div className="col-sm-8">
          <div className="w-75">
              
            <div className="form-group">
              <label htmlFor="nombres">Nombre</label>
              <input
                type="text"
                className="form-control form-control-border w-100"
                id="nombres"
                name ="nombre"
                placeholder="mombre del proyecto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control form-control-border w-100"
                id="descripcion"
                placeholder="descipción del proyecto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaInicio">Inicio</label>
              <input
                type="date"
                className="form-control form-control-border w-100"
                id="fechaInicio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechafin">Fin</label>
              <input
                type="date"
                className="form-control form-control-border w-100"
                id="fechaFin"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cantidadBeneficiarios">
                Cantidad de Beneficiarios
              </label>
              <input
                type="number"
                className="form-control form-control-border w-100"
                id="beneficiarios"
                placeholder="# beneficiarios"
              />
            </div>

            <div className="form-group">
              <label htmlFor="provincia">Tipo de Beneficiario</label>
             <select className="custom-select form-control-border select2" multiple="multiple"  data-placeholder="Select a State" style={{width: '100%'}}>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
            </select>

            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="w-100">
            <div className="form-group">
              <label htmlFor="provincia">Lugar Implementación</label>
              <SelectProvinces provinces = {provinces} />
            </div>

            <div className="form-group">
              <label htmlFor="barrios">Territoios Impactados</label>
              <SelectProvinces  provinces = {provinces} />
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
    </>
  );
}
