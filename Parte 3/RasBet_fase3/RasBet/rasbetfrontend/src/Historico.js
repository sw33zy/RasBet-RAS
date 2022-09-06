import React from 'react';
import './Historico.css'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListItemText from "@mui/material/ListItemText";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from '@mui/icons-material/History';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {Divider} from "@material-ui/core";
import AddEvent from "./Components/AddEvent";
import PendingBetCards from "./Components/PendingBetCards";
import OverBetCards from "./Components/OverBetCards";

const drawerWidth = 270

const Historico = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pendentes" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary="Finalizados" />
                        </ListItemButton>

                    </List>
                </Box>
            </Drawer>
            {selectedIndex === 0 &&
                <PendingBetCards />
            }
            {selectedIndex === 1 &&
                <OverBetCards />
            }

        </Box>
    )
}

export default Historico