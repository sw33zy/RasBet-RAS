import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Alert, Divider, Input, List, Menu, Slide} from "@material-ui/core";
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
import AssignmentIcon from '@mui/icons-material/Assignment';
import Modal from "@mui/material/Modal";
import axios from "axios";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import {useEffect, useState} from "react";
import BetRow from "./BetRow";

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
const props = {
    inputProps: {
        'min': '0.01',
        'step': '.01'
    }
}


export default function Betcard({isLogged, getWallets}){
    const bets = useSelector(state => state.betReducer)

    const [checked, setChecked] = React.useState(false);

    const handleChange2 = () => {
        setChecked((prev) => !prev);
    };

    const dispatch = useDispatch();

    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const [values, setValues] = React.useState({
        currency: '€',
        wager: ''
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    localStorage.setItem('multiplier','1')
    const saveMultiplier = (multiplier) =>{
        localStorage.setItem('multiplier2', multiplier)
    }
    const getMultiplier = () =>{
        return localStorage.getItem('multiplier2')
    }
    const BetList = ({bets2}) => {
        const r = []
        if(bets2.length > 0)
            bets2.map((bet,index) => {
                r.push(BetRow(bet, index, saveMultiplier))
            })
        return r
    }

    const addBetcard = async () => {
        if(!values.wager || !values.currency)
            setMessage({...message, content: "Campo obrigatório *", type: "error"})
        else if(bets.length === 0)
            setMessage({...message, content: "Selecione uma aposta", type: "error"})
        else
            try {
                const response = await axios.post(
                    "http://localhost:8080/createBetCard/" + values.wager + "/" + values.currency+ "/" + isLogged,
                    bets
                ).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        setMessage({...message, content: error.response.data, type: "error"})
                    }})
                const betcard = await response.data
                console.log("addBetcard response: ", betcard)
                setMessage({...message, content: "Boletim criado com sucesso!", type: "success"})
                getWallets(isLogged)

            } catch (e) {
                console.log("addEvent error: ", e.response)
                //setMessage({ ...message, content: "Erro a adicionar evento!", type: "error" })
            }
    }

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
                <Badge badgeContent={bets.length} color="error">
                    <AssignmentIcon />
                </Badge>
            </IconButton>


                <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                    <Box style={style}>
                        <p style={{fontFamily:"Segoe UI", fontSize:20, fontWeight:'bold', color:'black', paddingLeft:20}}> Boletim de Apostas </p>
                        <Divider/>
                        <div style={{maxHeight: 600, overflow: 'auto'}}>
                            <div style={{maxHeight: 400, overflow: 'auto'}}>
                                {bets && <BetList bets2={bets}/>}
                            </div>
                            <Divider sx={{ borderBottomWidth: 5 , background:'#DDA74F'}} />
                            <p style={{color:'grey', paddingLeft:15,textAlign:'left', fontWeight:600, alignItems:'center'}}>
                                Montante base

                                <FormControl color='secondary' variant="standard" sx={{ m: 1, maxWidth: 130 }} style={{paddingLeft:15,float:'right'}}>
                                    <InputLabel variant="standard" style={{paddingLeft:20, marginTop:-15}} htmlFor="standard-adornment-amount" required="true">Montante</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        type="number"
                                        inputProps={props.inputProps}
                                        value={values.wager}
                                        defaultValue="0.01"
                                        onChange={handleChange('wager')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                {values.currency}
                                            </InputAdornment>
                                        }
                                        label="amount"
                                    />
                                </FormControl>
                                <FormControl color='secondary' variant="standard" sx={{ m: 1, maxWidth: 100 }} style={{paddingLeft:15,float:'right'}}>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={values.currency}
                                        onChange={handleChange('currency')}
                                        label="Currency"
                                    >
                                        <MenuItem value='€'>
                                            €
                                        </MenuItem>
                                        <MenuItem value='$'>
                                            $
                                        </MenuItem>
                                        <MenuItem value='ADA'>
                                            ADA
                                        </MenuItem>

                                    </Select>
                                </FormControl>
                            </p>
                            <Divider/>
                            <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                                Ganhos possíveis*
                                <span style={{float:'right', paddingRight:15}}>
                                    {Number(Math.floor(parseFloat(getMultiplier()) + 'e' + 2)*values.wager + 'e-' + 2)} {values.currency}
                                </span>
                            </p>
                            <p style={{color:'black', paddingLeft:15,textAlign:'left', fontSize:10, maxWidth:300}}>* Se todos os prognósticos selecionados estiverem corretos e nenhum for cancelado.</p>
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
                            <div style={{padding:15}}>
                                <Button onClick={()=>addBetcard()} variant="contained" color={"secondary"}>Criar boletim</Button>
                            </div>

                        </div>
                    </Box>
                </Slide>


        </div>
    )
}