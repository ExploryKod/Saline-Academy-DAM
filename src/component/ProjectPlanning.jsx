import './ProjectPlanning.css'
import * as React from 'react';
import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import SupabaseService from "../tools/SupabaseClient";


function ProjectPlanning() {

    const [projects, setProjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState();
    const [crews, setCrews] = useState([]);
    const [crew, setCrew] = useState();
    const sbs = new SupabaseService();

    const handleTeachers = () => {
      sbs.getAllTeachers().then((p) => {
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
        console.log(room, teacher, crew);
        sbs.insertDataPlannification(room, teacher, crew);
    };

    useEffect(() => {
        sbs.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })
	  return (

<div className='splitscreen'>
          <div className='leftSide'>
          {projects.map((project, index) => (
            <ProjectCard key={index} title={project.title} state="En cours" status={project.status}/>
          ))}
          </div>    
          <div className='rightSide'>
            <div className='project-detail-background'>
              <h1 className='project-detail-title'>Enregistrement Cello</h1>
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
