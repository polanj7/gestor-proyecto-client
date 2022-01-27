import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ContentForm() {

  const navigate = useNavigate();


  const switchDisplay = (display) =>{
    switch (display) {
      case 1:  
        navigate("f-1");              
        break;  
      case 2:  
        navigate("f-2");              
        break;      
      default:
        break;
    }
  }

  const styleFa ={
    color: "#007bff"
  }

  return (
    <>
      <section className="content pt-3 w-100">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <div className="row">
                <button
                  className="btn btn-outline-link col-2 w-100 mr-1"
                  onClick={() => {
                    switchDisplay(1);
                  }}
                >
                  <i className="fa fa-clone" aria-hidden="true" style={styleFa}>
                    &nbsp;&nbsp;
                  </i>
                  Datos Generales
                </button>
                <button
                  className="btn btn-outline-link col-2 w-100 mr-1"
                  onClick={() => {
                    switchDisplay(2);
                  }}
                >
                  <i className="fa fa-credit-card" aria-hidden="true" style={styleFa}>
                    &nbsp;&nbsp;
                  </i>
                  Propuesta Ecónomica
                </button>

                <button className="btn btn-outline-link col-2 w-100 mr-1">
                  <i className="fa fa-clone" aria-hidden="true" style={styleFa}>
                    &nbsp;&nbsp;
                  </i>
                  Tareas
                </button>

                <button className="btn btn-outline-link col-2 w-100">
                  <i className="fa fa-file" aria-hidden="true" style={styleFa}>
                    &nbsp;&nbsp;
                  </i>
                  Documentos
                </button>
              </div>
            </div>

            <div className="card-body">
              <br />
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
