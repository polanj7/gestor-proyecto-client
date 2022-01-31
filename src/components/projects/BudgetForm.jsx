import React from 'react';

export default function BudgetForm() {
  return (
    <>
      <h4 className="text-primary">
        <i className='fa fa-credit-card'></i> Presupuesto
      </h4>
      <br />
      <div className="w-75">
        <div className="form-group">
          <label htmlFor="nombre">Monto Presupuestado</label>
          <input
            type="number"
            className="form-control form-control-border w-100"
            id="nombre"
            placeholder="$ monto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Tipo</label>
          <input
            type="text"
            className="form-control form-control-border w-100"
            id="descripcion"
            placeholder="tipo"
          />
        </div>      

        <div className="form-group">
          <label htmlFor="fechafin">Descripción</label>
          <textarea         
            className="form-control form-control-border w-100"
            id="fechaFin"
            placeholder='descripción'
          />
        </div>
      </div>
    </>
  );
}
