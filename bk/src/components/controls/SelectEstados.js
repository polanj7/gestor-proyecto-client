import React from 'react';

export default function SelectEstados({ Estados }) {

  if(Estados.length == 0){
    return ('Error!');
  }

  return (
    <div className="col-12 col-sm-6">
    <div className="form-group">
        <label>Multiple (.select2-purple)</label>
        <div className="select2-purple">
        <select className="select2" multiple="multiple" data-placeholder="Select a State" data-dropdown-css-class="select2-purple" style={{width: '100%'}}>    
            {
              Estados.data.map((d, idx) => {
                return (
                  <option key={idx}>{d.nombre}</option>
                )
              })
            }
        </select>
        </div>
    </div>
    </div>

  );
}
