import * as React from 'react';
import { useState } from 'react'
import SupabaseService from "./tools/SupabaseClient";
import Tabmenu from './component/TabMenu';
import AddRush from './component/AddRush';
import ProjectSummary from './component/ProjectSummary'


function ProjectDetailGeneral() {

    const [projects, setProjects] = useState([]);
    const sbsProjects = new SupabaseService();
    const [page, setPage] = React.useState("one")

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
    {page === "four" && <div>four</div>}
    </>
  )
}

export default ProjectDetailGeneral
