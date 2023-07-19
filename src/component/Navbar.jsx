import { AppBar, Fab, IconButton } from "@mui/material";
import reactLogo from '../assets/react.svg'
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SecurityIcon from '@mui/icons-material/Security';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AddIcon from '@mui/icons-material/Add';
import styles from "./Navbar.module.scss"

const Navbar = () => {
    const hello = "hello"
    return (
        <AppBar position="static" color="transparent" sx={{height:1000, width:65}} className={styles.container}>
            <div className={styles.firstBlock}>
            <img src={reactLogo}/>
            <IconButton href='/homepage'>
                <HomeIcon fontSize="large"/>
            </IconButton>
            <IconButton href='/projet'>
            <DateRangeIcon fontSize="large"/>
            </IconButton>
            <IconButton href='/aucuneIdee'>
            <SecurityIcon fontSize="large"/>
            </IconButton>
            <IconButton href='/param'>
            <EngineeringIcon fontSize="large"/>
            </IconButton>
            </div>
            <Fab color="primary" aria-label="add" sx={{margin:0.6, marginBottom:2}}>
                <AddIcon />
            </Fab>
        </AppBar>
    )
}

export default Navbar;