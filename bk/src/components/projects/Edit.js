import React, { useState, useEffect } from 'react';
import  { addProject, getProject }  from '../../services/projectsServices';
import Moment from 'react-moment';
import {useParams, Link}  from 'react-router-dom';

export default function Edit() {

  const[id, setId] =  useState(0);
  const[codigo, setCodigo] =  useState('');
  const[nombre, setNombre] =  useState('');
  const[descripcion, setDescipcion] =  useState('');
  const[fechaInicio, setFechaInicio] =  useState(new Date());

  const param = useParams();

  const addNewProject = (e) => {
    e.preventDefault();

    let newData = {
      idProjecto: id,
      codigo,
      nombre,
      descripcion,
      fechaInicio,
      fechaFinal: new Date(),
      idTipoBeneficiario: "",
      idTipoBeneficiario: "jose",
      datosBeneficiario: "jose 1",
      idTipoPresupuesto: "8",
      rangoPresupuestado: 2500,
      descripcionEspecie: "jose 4"
    }

    addProject(newData).then(resp =>{
      console.log(resp);
    });
  }

  const project = () => {    
    if(param.id > 0)  {  
      getProject(param.id).then((resp) => {
        setId(param.id);
        setCodigo(resp.codigo);
        setNombre(resp.nombre);
        setDescipcion(resp.descripcion);
        setFechaInicio(resp.fechaInicio);       
      });
    } 
  }

  useEffect(() => {
    project();
  }, []);     

  return (
    <>
      <form onSubmit={addNewProject}>
        <input type="hidden" value={param.id}></input>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">General</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="inputName">Codigo</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e?.target?.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Project Name</label>
              <input
                type="text"
                id="inputName"
                value={nombre}
                className="form-control"
                onChange={(e) => {
                  setNombre(e?.target?.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">Project Description</label>
              <textarea
                id="inputDescription"
                className="form-control"
                value={descripcion}
                rows={4}
                onChange={(e) => {
                  setDescipcion(e?.target?.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputStatus">Status</label>
              <select id="inputStatus" className="form-control custom-select">
                <option selected disabled>
                  Select one
                </option>
                <option>On Hold</option>
                <option>Canceled</option>
                <option>Success</option>
              </select>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-sm btn-primary" />
              <button className="btn btn-sm btn-danger">
                <Link to="/project" className="fas fa-times pull-right">
                  <i className=""> Cancelar</i>
                </Link>
              </button>
            </div>
          </div>
          {/* /.card-body */}
        </div>
      </form>
    </>
  );
}
