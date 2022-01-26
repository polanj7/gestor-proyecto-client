import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import './index.css'
import { getProjects, deleteProject } from '../../services/projectsServices';


export default function Table() {

  const [projects, setProjects] = useState([]);
  const [refreshAfterDelete, setRefreshAfterDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const removeProject = (id) => {
   
    if(!window.confirm('Deseas elminar el registro?')){
      return;
    }  

    deleteProject(id).then(resp => {      
      setRefreshAfterDelete(x => !x);        
    })
    
  }

  
  useEffect(() => {
    getProjects().then(resp =>{
      setProjects(resp);
    })    
  }, [refreshAfterDelete])


  return (
    <div className="card">
    <br/>
      <div className="card-header">
        <h3 className="card-title">Listado de Proyectos</h3>
        <div className="card-tools">

          <Link to="/project/new">
            <i className="fas fa-plus" />
          </Link>
          {/* <button
            type="button"
            className="btn btn-primary"     
          >
            <i className="fas fa-plus" />
            
          </button>
         */}
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped projects">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Código</th>
              <th style={{ width: "30%" }}>Proyecto</th>
              <th style={{ width: "20%" }}>Descripción</th>
              <th>Avances</th>
              <th style={{ width: "20%" }}>Fecha de Inicio</th>
              {/* <th style={{ width: "8%" }} className="text-center">
                Estado
              </th> */}
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>             

              {               
                projects.map((resp, idx) => {
                  return(
                    <tr key={idx}>
                      <td>{resp.codigo}</td>
                      <td>{resp.nombre}</td>
                      <td>{resp.descripcion}</td>
                      <td> Bien </td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                            {resp.fechaInicio}  
                        </Moment>                          
                      </td>
                      <td className="project-actions">
                        <a className="btn btn-default btn-sm" href="#">
                          <i className="fas fa-eye"></i>                  
                        </a>
                        <a className="btn btn-primary btn-sm" href="#">
                          <i className="fas fa-tasks"></i>                  
                        </a>
                        <a className="btn btn-warning btn-sm" href="#">
                          <Link to= {`/project/edit/${resp.idProyecto}` }>
                            <i className="fas fa-pencil-alt"></i>       
                          </Link>           
                        </a>
                        <a className="btn btn-danger btn-sm">                        
                            <i className="fas fa-trash" onClick={() => { removeProject(resp.idProyecto) }}></i>                                         
                        </a>
                      </td>
                    
                    </tr>
                  );
                })
              }

            {/* <tr>
              <td>PRO-2021-001</td>
              <td>
                <a>Compra de Materiales - La Barquita</a> 
              </td>
              <td>
                  Jose, Martin, Pedro         
              </td>
              <td className="project_progress">
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-green"
                    role="progressbar"
                    aria-valuenow={57}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "57%" }}
                  ></div>
                </div>
                <small>57% Completado</small>
              </td>
        
              <td className="project-actions">
                <a className="btn btn-default btn-sm" href="#">
                  <i className="fas fa-eye"></i>                  
                </a>
                <a className="btn btn-primary btn-sm" href="#">
                  <i className="fas fa-tasks"></i>                  
                </a>
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt"></i>                  
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash"></i>                  
                </a>
              </td>
            </tr>          */}
          </tbody>
        </table>


   


      </div>
      {/* /.card-body */}
    </div>
  );
}
