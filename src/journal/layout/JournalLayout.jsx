import { Box, Toolbar } from "@mui/material"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const drawerWidth = 240;

const JournalLayout = ({ children }) => {
    return (
        <Box className='animate__animated animate__fadeIn animate__faster' sx={{ display: 'flex' }}>

            <NavBar drawerWidth={drawerWidth} />
            <SideBar drawerWidth={drawerWidth} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Toolbar />
                {children}
            
            </Box>
        </Box>
    )
}

export default JournalLayout
