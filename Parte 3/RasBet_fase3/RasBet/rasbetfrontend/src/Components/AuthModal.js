import * as React from 'react'
import axios from "axios"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {Alert, Fade} from "@material-ui/core";
import logo from "../assets/logo.png"
import {occurrencesToLine} from "./NextUpTable";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between'
}


export default function AuthModal() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
        setMode(false)
    }
    const handleOpenRegister = () =>{
        setOpen(true)
        setMode(true)
    }

    const handleClose = () => setOpen(false)

    const [mode, setMode] = React.useState(false)

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        docId: '',
        showPassword: false,
    })

    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const login = async (email, password) => {

        console.log("email: ", email, "password: ", password)
        if(!email || !password)
            setMessage({...message, content: "Campo obrigatório *", type: "error"})
        else
            try {
                const response = await axios.get("http://localhost:8080/loginExpert/"+email+"/"+password)
                if (await response.data) {
                    setMessage({...message, content: "Identificado administrador!", type: "success"})
                    setTimeout(()=>{dispatch({type: 'LOGIN', payload: response.data.email})},1000)
                    dispatch({type: 'ADMIN'})


                }
                else{
                    const response = await axios.get("http://localhost:8080/login/"+email+"/"+password)
                    console.log("user",await response.data)
                    if (await response.data) {
                        setMessage({...message, content: "Autenticado com sucesso!", type: "success"})
                        setTimeout(()=>{dispatch({type: 'LOGIN', payload: response.data.id})},1000)
                    }
                    else
                        setMessage({...message, content: "Email ou password errado!", type: "error"})
                }

            } catch (e) {
                console.log(e);
            }
    }

    const register = async (docId, email, password) => {
        console.log("docId: ", docId, "email: ", email, "password: ", password)
        if(!email || !password || !docId)
            setMessage({...message, content: "Campo obrigatório *", type: "error"})
        else
            try {
                const response = await axios.get("http://localhost:8080/register/"+email+"/"+password+"/"+docId)
                console.log("user",await response.data)
                if (await response.data)
                    setMessage({...message, content: "Registado com sucesso!", type: "success"})
                else
                    setMessage({...message, content: "Já existe um utilizador com o email inserido!", type: "error"})
            } catch (e) {
                console.log(e);
            }

    }

    return (
        <div>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button variant="contained"
                        color={"secondary"}
                        style={{marginRight:5}}
                        onClick={handleOpen}>Login</Button>
                <Button variant="outlined"
                        color={"secondary"}
                        onClick={handleOpenRegister}>Register</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="myModal"
            >

                <Box sx={style}>
                    <Box style={{ width: "60%" }}>
                        <Typography id="modal-modal-title" variant="h2" style={{fontWeight:"bold", fontFamily:"Segoe UI", fontSize: 20}} component="h2">
                            {mode ? <p>Register</p> : <p>Login</p>}
                        </Typography>
                        {mode ?
                            <div style={{ fontSize: "14px", marginTop:-20, display: "flex" }}>
                                <p>Já tem conta?</p> <p style={{ marginLeft: "5px", color: "#0385B0", cursor: "pointer" }} onClick={() => {setMode(!mode)}}>Login</p>
                            </div>
                            :
                            <div style={{ fontSize: "14px", marginTop:-20, display: "flex" }}>
                                <p>Criar nova conta?</p> <p style={{ marginLeft: "5px", color: "#0385B0", cursor: "pointer",fontFamily:"Segoe UI" }} onClick={() => setMode(!mode)}>Criar Conta</p>
                            </div>
                        }

                        {message.content && message.type === "success" &&
                            <div style={{marginTop: "10px", color: "green", width:"75%" }}>
                                <Alert severity="success">{message.content}</Alert>
                            </div>
                        }

                        {message.content && message.type === "error" &&
                            <div style={{marginTop: "10px", color: "red" ,width:"75%"}}>
                                <Alert severity="error">{message.content}</Alert>
                            </div>
                        }

                        <Box style={{ marginTop: "10px" }}>
                            {mode &&
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-docId" required="true">ID</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-docId"
                                        type="text"
                                        value={values.docId}
                                        onChange={handleChange('docId')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AccountBoxIcon
                                                    aria-label="docId"
                                                    color="primary"
                                                    edge="end"
                                                    disabled />
                                            </InputAdornment>
                                        }
                                        label="docId"
                                    />
                                </FormControl>
                            }
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email" required="true">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <EmailIcon
                                                aria-label="email"
                                                color="primary"
                                                edge="end"
                                                disabled />
                                        </InputAdornment>
                                    }
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" required="true">Password</InputLabel>
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
                            </FormControl>
                        </Box>
                        <Box sx={{ marginTop: "25px" }}>
                            {mode ?
                                <Button sx={{ marginLeft: "8px" }} variant="contained" onClick={() => register(values.docId, values.email, values.password)}>REGISTER</Button>
                                :
                                <Button sx={{ marginLeft: "8px" }} variant="contained" onClick={() => login(values.email, values.password)}>LOGIN</Button>
                            }

                        </Box>
                    </Box>
                    <Box sx={{ width: "40%", marginTop: "8%", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <img
                            style={{ width: "180px" }}
                            src={window.location.origin + logo}
                            alt="logo.jpg"
                        />
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}