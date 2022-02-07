import React, { useEffect, useState } from 'react';


export default function SelectBeneficiaries(props) {
    
  return (
    <>
        <select
            className="custom-select form-control-border"
            id="beneficiarios"
        >         
          
        {
            props.beneficiaries.length == 0 ?  <option value="0">No data</option> 
            : props.beneficiaries.map(({IdBeneficiario, Nombre}) =>{
                return <option key={IdBeneficiario} value={IdBeneficiario}>{Nombre}</option>
            })
        }            
            
        </select>
    </>
  );
}
