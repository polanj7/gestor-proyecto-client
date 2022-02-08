import React, { useEffect, useState } from 'react';

export default function Content({children}) {

  return (
    
    <div className='content-wrapper'>       
        {children}       
    </div>
  )
}
