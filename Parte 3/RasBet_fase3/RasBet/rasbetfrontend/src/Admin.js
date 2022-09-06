import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import DraftsIcon from '@mui/icons-material/Drafts'
import AddBoxIcon from '@mui/icons-material/AddBox'
import CancelIcon from '@mui/icons-material/Cancel'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import EventIcon from '@mui/icons-material/Event'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AddEvent from './Components/AddEvent'
import AuthModal from './Components/AuthModal'
import EndEvent from "./Components/EndEvent";
import CancelEvent from "./Components/CancelEvent";
import AddFactEvent from "./Components/AddFactEvent";

const drawerWidth = 270

const Admin = () => {

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
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Adicionar Evento" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Adicionar Facto a Evento" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Terminar Evento" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemIcon>
                                <CancelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cancelar Evento" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            {selectedIndex === 0 &&
                <AddEvent />
            }
            {selectedIndex === 1 &&
                <AddFactEvent />
            }
            {selectedIndex === 2 &&
                <EndEvent />
            }
            {selectedIndex === 3 &&
            <CancelEvent />
            }

        </Box>
    )
}

export default Admin