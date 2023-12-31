import { useContext } from 'react'
import { AppBar, Fab, IconButton } from "@mui/material";
import { AppContext } from '../AppContext';
import salineLogo from '../assets/saline_logo/logo_dark.svg'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import AddIcon from '@mui/icons-material/Add';
import styles from "./Navbar.module.scss"

const Navbar = () => {
    const { handleLogout } = useContext(AppContext);

    const disconnectUser = () => {
        handleLogout();
    };

    return (
        <AppBar position="static" color="transparent" sx={{height:"100%", width:65}} className={styles.container}>

            <div className={styles.firstBlock}>
            <img src={salineLogo}/>
            <IconButton href='/Homepage'>
                <HomeIcon fontSize="large"/>
            </IconButton>
            <IconButton href='/Project-detail-general'>
            <DateRangeIcon fontSize="large"/>
            </IconButton>
            <IconButton href='/planningBoard'>
            <ManageHistoryRoundedIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={disconnectUser}>
                <LogoutIcon fontSize="large"/>
            </IconButton>
            </div>
            <Fab color="primary" aria-label="add"  href='/CreateProject' sx={{margin:0.6, marginBottom:2}}>
                <AddIcon />
            </Fab>
        </AppBar>
    )
}

export default Navbar;