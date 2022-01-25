import React, { useEffect, useState } from 'react';
import Table from './Table';

import { getProjects } from '../../services/projects'


export default function Index() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    getProjects().then(resp =>{
      setProjects(resp);
    })

  }, [])


  return (
    <>     
         {/* <Link to="project">Proyectos</Link> */}
      <Table projects = {projects} />
    </>
  )
}
