import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Alert, Divider, Input, Slide} from "@material-ui/core";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import * as React from "react";
import {useEffect, useState} from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const style = {
    position: 'absolute',
    right: 0,
    top: 65,
    width: 400,
    backgroundColor: '#F4F6F8',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,

}

const style2 = {
    marginBottom: 10,
    paddingBottom:5,
    margin: 5,
    padding:5,
    borderRadius: 2,
    boxShadow: 24,
    background: "linear-gradient(to right, white, white 99.00%, #DDA74F 1.00%)"
}

export default function Notifications({notifications}) {
    const [notifsToRecent, setNotifsToRecent] = useState([]);

    const [checked, setChecked] = React.useState(false);

    const handleChange2 = () => {
        setChecked((prev) => !prev);
    };

    useEffect(() =>{
        setNotifsToRecent(notifications.reverse())
    }, [])
    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="profile of current user"
                aria-haspopup="true"
                onClick={handleChange2}
                color="inherit"
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>


            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                <Box style={style}>
                    <p style={{fontFamily:"Segoe UI", fontSize:20, fontWeight:'bold', color:'black', paddingLeft:20}}> Notificações </p>
                    <Divider/>
                    <div style={{maxHeight: 400, overflow: 'auto'}}>
                        {notifsToRecent.map((notif,index) => (
                            <Box style={style2}>
                                <p style={{marginBottom:-5, color:'black', paddingLeft:10, fontWeight:500, display: 'flex', alignItems: 'center'}}>
                                      <NotificationsNoneIcon style={{paddingRight:5}}/> Notificação {index+1}
                                </p>
                                <p style={{color:'black',textAlign:'left', marginLeft:30}}>
                                    {notif}
                                </p>
                            </Box>
                        ))}
                    </div>
                </Box>
            </Slide>


        </div>
    )
}
