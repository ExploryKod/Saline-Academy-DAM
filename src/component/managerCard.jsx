import './ManagerCard.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';



const ManagerCard = ({manager}) => {
	return (
	  <div className='project-card'>
		<div className='project-card-logo'>
            <AccountCircleIcon className='project-card-logo__svg' />
		</div>
		<div className="project-card-infos">
			<h3 className='project-card-infos__title'>{manager.firstname ? manager.firstname : ""} {manager.lastname ? manager.lastname : ""}</h3>
			<div className='project-card-infos-state'>
                <EmailIcon/>
				<p className='project-card-infos-state__status'>{manager.email ? manager.email : "Aucun email fourni"}</p>
			</div>
		</div>
	  </div>
	);
  };

export default ManagerCard;