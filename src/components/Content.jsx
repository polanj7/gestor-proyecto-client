import React, { useEffect, useState } from 'react';


import {  
  Outlet 
} from "react-router-dom";


export default function Content(props) {

  return (
    <div className='content-wrapper'>       
        {props.children}       
    </div>
  )
}
