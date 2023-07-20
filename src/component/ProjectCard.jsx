import './ProjectCard.css'
import singLogo from '../assets/sing-logo.svg'
import box from '../assets/box.svg'


const ProjectCard = (props) => {
	return (
	  <div className='project-card'>
		<div className='project-card-logo'>
			<img className='project-card-logo__svg' src={singLogo} alt="singLogo" />
		</div>
		<div className="project-card-infos">
			<h3 className='project-card-infos__title'>{props.title}</h3>
			<div className='project-card-infos-state'>
				<img src={box} alt="box" />
				<p className='project-card-infos-state__status'>{props.status}</p>

			</div>
		</div>
	  </div>
	);
  };

export default ProjectCard;