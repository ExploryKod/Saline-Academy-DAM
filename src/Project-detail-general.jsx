import * as React from 'react';
import { useState } from 'react'
import Tabmenu from './component/TabMenu';
import AddRush from './component/AddRush';
import ProjectSummary from './component/ProjectSummary'
import ProjectPlanning from './component/ProjectPlanning'


function ProjectDetailGeneral() {

    const [page, setPage] = useState("one")

    const havePage = (page) => {
      setPage(page);
    };

  return (
    <>
    <div className='tab-menu'>
        <Tabmenu givePage={havePage}></Tabmenu>
    </div>
    {page === "one" && <ProjectSummary/>}
    {page === "two" && <div></div>}
    {page === "three" && <AddRush/>}
    {page === "four" && <ProjectPlanning/>}
    </>
  )
}

export default ProjectDetailGeneral
