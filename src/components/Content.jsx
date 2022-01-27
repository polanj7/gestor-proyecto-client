import React, { useEffect, useState } from 'react';

export default function Content(props) {

  return (
    
    <div className='content-wrapper'>       
        {props.children}       
    </div>
  )
}
