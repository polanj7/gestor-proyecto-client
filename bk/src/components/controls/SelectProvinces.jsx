import React, { useEffect, useState } from 'react';


export default function SelectProvinces(props) {
 
  const[selectProvinces, setSelectProvinces] = useState(0);

    
  return (
    <>
        <select
            className="custom-select form-control-border"
            id="provincia"
        >         
          
        {
            props.provinces.length == 0 ?  <option value="0">No data</option> 
            : props.provinces.map(({idProvincia, nombre}) =>{
                return <option key={idProvincia} value={idProvincia}>{nombre}</option>
            })
        }            
            
        </select>
    </>
  );
}
