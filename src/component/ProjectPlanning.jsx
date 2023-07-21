import './ProjectPlanning.css'
import * as React from 'react';
import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import SupabaseService from "../tools/SupabaseClient";


function ProjectPlanning() {

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState();
    const [crews, setCrews] = useState([]);
    const [crew, setCrew] = useState();
	const [data, setData] = useState(null);
    const sbs = new SupabaseService();

    const handleTeachers = () => {
      sbs.getAllTeachers().then((p) => {
        console.log(p)
          setTeachers(p.data);
      });}

    const handleRooms = () => {  
      sbs.getAllRooms().then((p) => {
          setRooms(p.data);
      });}
    
    const handleRoom = (event) => {
      setRoom(event.target.value)
    };

    const handleTeacher = (event) => {
      setTeacher(event.target.value)
    };

    const handleCrew = (event) => {
      setCrew(event.target.value)
    };

    const handleCrews = () => {  
      sbs.getAllCrews().then((p) => {
          setCrews(p.data);
      });}

      const handleSubmit = () =>  {
        sbs.insertDataPlannification(data.id, room, teacher, crew);
    };

	const setProjectToShow = (data) => {
		setData(data);
		sbs.getProjectById(data).then((res) => {setProject(res.data[0])});
	  };
console.log(data);
    useEffect(() => {
        sbs.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })
	  return (

<div className='splitscreen'>
          <div className='leftSide'>
		  <h1>Projets</h1>
          <h4>{projects.length} projets</h4>
          {projects.map((project, index) => (
            <ProjectCard setProjectToShow={setProjectToShow} key={index} title={project.title} status={project.status} project={project}/>
          ))}
          </div>    
          <div className='rightSide'>
            <div className='project-detail-background'>
              <h1 className='project-detail-title'>{data?.title}</h1>
              <section className='project-detail-section'>
                  <h1 className='project-detail-planning-title'>Plannification du projet</h1>
				  <div className='project-detail-planning-group'>
					<div className="project-detail-planning-group-form">
						<p className='project-detail-planning-group-form-label'>1. Invitation du guest au projet</p>
						<select className='project-detail-planning-group-form-select' name="list" value={teacher} onClick={handleTeachers} onChange={handleTeacher}>
						<option>Choisir un guest</option>
							{teachers?.map((teacher) => <option value={teacher.id}>{`${teacher.name}`}
						</option>)}
						</select>
					</div>
					<div className="project-detail-planning-group-form">
						<p className='project-detail-planning-group-form-label'>2. Réservation salle de tournage</p>
						<select className='project-detail-planning-group-form-select' name="list" value={room} onClick={handleRooms} onChange={handleRoom}>
						<option>Choisir une salle</option>
							{rooms?.map((room) => <option value={room.id}>{`${room.name}`}
						</option>)}
						</select>
					</div>
					<div className="project-detail-planning-group-form">
						<p className='project-detail-planning-group-form-label'>3. Invitation équipe de tournage</p>
						<select className='project-detail-planning-group-form-select' name="list" value={crew} onClick={handleCrews} onChange={handleCrew}>
						<option>Choisir une équipe de tournage</option>
							{crews?.map((crew) => <option value={crew.id}>{`${crew.name}`}
						</option>)}
						</select>
					</div>
                    <p className='project-detail-planning-group-form-label'>4. Validation et envoi de mail à l’équipe de réalisation</p>
				  </div>
                  <div className="project-detail-planning-submit">
                    <button className='project-detail-planning-submit__button' onClick={handleSubmit}>Enregistrer</button>
                  </div>
              </section>
            </div>
          </div>
        </div>
	  )
	}
export default ProjectPlanning
