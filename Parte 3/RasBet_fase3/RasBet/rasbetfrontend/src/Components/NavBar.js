import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link} from 'react-router-dom'
import './NavBar.css'
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import AuthModal from "./AuthModal";
import WalletsDropdown from "./WalletsDropdown";
import Wallets from "./Wallets";
import axios from "axios";
import {useEffect} from "react";
import AccountOptions from "./AccountOptions";
import Betcard from "./Betcard";
import Notifications from "./Notifications";



export default function PrimarySearchAppBar() {

    const location = useLocation();
    const dispatch = useDispatch();

    let isLogged = useSelector(state => state.loggedReducer)
    let isAdmin = useSelector(state => state.adminReducer)

    if(!isLogged) {
        isLogged = localStorage.getItem('user')
        if (isLogged===null){
            isLogged = localStorage.setItem('user', '')
        }
        else
            dispatch({type: 'LOGIN', payload: isLogged})
        console.log("islogged",isLogged)
    }
    if(!isAdmin) {
        isAdmin = localStorage.getItem('admin')
        if (isAdmin===null){
            isAdmin = localStorage.setItem('admin', '')
        }
        if(isAdmin==='true')
            dispatch({type: 'ADMIN'})
    }


    const [user,setUser] =  React.useState('');

    const [wallets, setWallets] = React.useState('');

    const [currency, setCurrency] = React.useState('');

    const getWallets = async (user) =>{
        try {
            const response = await axios.get("http://localhost:8080/wallets/"+user)
            const response_data = await response.data
            setWallets(response_data)

        } catch (e) {
            console.log(e);
        }
    }
    const [notifications, setNotification] = React.useState('');

    const getNotif = async (user) =>{
        try {
            const response = await axios.get("http://localhost:8080/notifications/"+user)
            const response_data = await response.data
            setNotification(response_data)

        } catch (e) {
            console.log(e);
        }
    }

    useEffect( () => {
        if(isLogged && !isAdmin){
            localStorage.setItem('user',isLogged)
            getNotif(isLogged)
            getWallets(isLogged)
        }
        if(isLogged && isAdmin){
            localStorage.setItem('user',isLogged)
            localStorage.setItem('admin', isAdmin)
        }

    }, [isLogged, isAdmin]);




    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            {/*<MenuItem onClick={handleProfileMenuOpen}>*/}
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >

                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ height: 65, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 0.05 }} />
                    <Typography
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to='/' style={{textDecoration:0}}>
                            <p className="textGold">R<span className="textWhite">as</span><span className="textGold">B</span><span className="textWhite">et</span></p>
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 0.1 }} />
                    <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {
                            location.pathname === "/" ?
                                <Link to='/' className={"link-focus"}>
                                    <p style={{"font-family": "Trebuchet MS"}}>Ínicio</p>
                                </Link>
                                :
                                <Link to='/' className={"link"}>
                                    <p style={{"font-family": "Trebuchet MS"}}>Ínicio</p>
                                </Link>

                        }
                    </Typography>
                    <Box sx={{ flexGrow: 0.05 }} />
                    <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {
                            location.pathname === "/historico" ?
                                <Link to='/historico' className={"link-focus"}>
                                    <p style={{"font-family": "Trebuchet MS"}}>Histórico</p>
                                </Link>
                                :
                                <Link to='/historico' className={"link"}>
                                    <p style={{"font-family": "Trebuchet MS"}}>Histórico</p>
                                </Link>

                        }
                    </Typography>
                    <Box sx={{ flexGrow: 0.05 }} />
                    {isAdmin ?
                        <Typography
                            variant="body2"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            {
                                location.pathname === "/admin" ?
                                    <Link to='/admin' className={"link-focus"}>
                                        <p style={{"font-family": "Trebuchet MS"}}>Admin</p>
                                    </Link>
                                    :
                                    <Link to='/admin' className={"link"}>
                                        <p style={{"font-family": "Trebuchet MS"}}>Admin</p>
                                    </Link>

                            }
                        </Typography>
                    : null}

                    <Box sx={{ flexGrow: 1 }} />
                    {isLogged ?
                        <Box>
                            {!isAdmin ?
                                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                    {wallets && <WalletsDropdown wallets={wallets} getWallets={getWallets}/>}
                                    {wallets && <Wallets wallets={wallets} getWallets={getWallets}/>}
                                    {wallets && <Betcard isLogged={isLogged} getWallets={getWallets}/>}
                                    {notifications && <Notifications notifications={notifications}/>}
                                    <AccountOptions isLogged={isLogged}/>
                                </Box>
                            : <AccountOptions isLogged={isLogged}/>}
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        :
                        <Box>
                            <AuthModal/>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    }

                </Toolbar>
            </AppBar>

        </Box>
    );
}


