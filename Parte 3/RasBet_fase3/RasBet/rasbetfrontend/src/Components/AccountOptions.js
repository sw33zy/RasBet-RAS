import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Alert, Divider, Menu} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between'
}

export default function AccountOptions({isLogged}){
    let isAdmin = useSelector(state => state.adminReducer)
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    const [modal, setModal] = React.useState(false);
    const handleMenu = (event) =>{
        setAnchorEl(false);
        setModal(event);
    }
    const handleModalClose = () =>{
        setModal(false);
        setMessage({...message, content: " " , type: ""});
        setValues({password: '', passwordNew: '', showPassword: false, showPassword2: false})
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
        console.log("before" , isLogged)
        setAnchorEl(false);
        dispatch({type: 'LOGIN', payload: ''})
        console.log("after" , isLogged)
        localStorage.setItem('user','')
        isLogged=''
        if(isAdmin){
            dispatch({type: 'ADMIN'})
            localStorage.setItem('admin','')
        }
        navigate("/");

    }
    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const [values, setValues] = React.useState({
        password: '',
        passwordNew: '',
        showPassword: false,
        showPassword2: false,
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const changePsw = async () => {

        console.log("curr: ", values.password, "new: ", values.passwordNew)

        try {
            const response = await axios.get("http://localhost:8080/login/"+isLogged+"/"+values.passwordNew)
            console.log("user",await response.data)
            if (await response.data) {
                setMessage({...message, content: "Nova palavra-passe tem de ser diferente da palavra-passe atual", type: "error"})
            }
            else
                try{
                    const response2 = await axios.get("http://localhost:8080/login/"+isLogged+"/"+values.password)
                    console.log("user2",await response2.data.email)
                    if (await response2.data.email === undefined) {
                        setMessage({...message, content: "Palavra-passe atual errada", type: "error"})
                    }
                    else {
                        const response3 = await axios.get("http://localhost:8080/changePassword/"+isLogged+"/"+values.passwordNew).then((response) => {
                            if(response.status === 200){
                                console.log("SUCCESSS")
                                setMessage({...message, content: "Palavra-passe alterada com sucesso", type: "success"})
                            }
                        })
                    }
                }catch (e) {
                    console.log(e);
                }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="profile of current user"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {!isAdmin ? <MenuItem onClick={()=>handleMenu(true)}>Mudar Password</MenuItem> : null}
                <MenuItem onClick={()=>handleLogout()}><span style={{color:'red', fontWeight:400}}>Terminar Sessão</span></MenuItem>
            </Menu>
            <Modal
                open={modal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="myModal"
            >
                <Box sx={style}>
                    {modal  ?
                        <div>
                            <Box sx={style}>
                                <Box style={{ width: "50%" }}>
                                    <Typography id="modal-modal-title" variant="h2" style={{fontWeight:"bold", fontFamily:"Segoe UI", fontSize: 20}} component="h2">
                                        <div style={{display: 'flex', alignItems: 'center'}}> <AccountCircle style={{marginRight:10}}/> <span>Trocar Palavra-Passe</span></div>
                                    </Typography>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira a palavra-passe atual</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{marginTop:30}}>
                                        <InputLabel htmlFor="outlined-adornment-password" required="true" style={{paddingLeft:10}}>Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        color="primary"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />

                                        {message.content && message.type === "success" &&
                                        <div style={{marginTop: "10px", color: "green"}}>
                                            <Alert severity="success">{message.content}</Alert>
                                        </div>
                                        }
                                        {message.content && message.type === "error" &&
                                        <div style={{marginTop: "10px", color: "red" }}>
                                            <Alert severity="error">{message.content}</Alert>
                                        </div>
                                        }
                                        <Button onClick={()=>changePsw()} variant="contained" color={"secondary"} style={{marginTop:70}}>Trocar</Button>
                                    </FormControl>

                                </Box>
                                <Divider orientation={'vertical'} flexItem={true}/>
                                <Box style={{ width: "50%",marginTop: "4%", alignItems: "center", justifyContent: "center", textAlign: "left", paddingLeft:20, paddingTop:2}}>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira a nova Password</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{paddingLeft:5, marginTop:30}}>
                                        <InputLabel htmlFor="outlined-adornment-new" required="true" style={{paddingLeft:10}}>Password Nova</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-passwordnew"
                                            type={values.showPassword2 ? 'text' : 'password'}
                                            value={values.passwordNew}
                                            onChange={handleChange('passwordNew')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle passwordnew visibility"
                                                        color="primary"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="PasswordNew"
                                        />
                                    </FormControl>
                                </Box>
                            </Box>

                        </div>
                        : null
                    }
                </Box>
            </Modal>
        </div>
    )
}