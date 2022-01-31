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
      case 3:  
        navigate("f-3");              
        break;   
      case 4:  
        navigate("f-4");              
        break;       
      default:
        break;
    }  

  }

  const styleFa ={
    color: "#17a2b8"//"#007bff"

  }

  const handledSubmit = (e) =>{
    e.preventDefault();

    let formData = {
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
      fechaInicio: e.target.fechaInicio.value,
      fechaFin: e.target.fechaFin.value,
      beneficiarios: e.target.beneficiarios.value,
      lugarImplemantacion: [
        {nombre: "La Vega", id: 31},
        {nombre: "La Romana", id: 29}
      ],
      territoriosImpactados: [
        {nombre: "Jamo la Vega", id: 31},
        {nombre: "Tierra sucia La Romana", id: 29}
      ]
    }   
    
    console.log(formData)
  
  }


  return (
    <>
      <form onSubmit={handledSubmit}>
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
                <Outlet />
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
      </form>
    </>
  );
}
