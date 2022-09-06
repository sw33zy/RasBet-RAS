import IconButton from "@mui/material/IconButton";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {Alert, Divider, Menu} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const props = {
    inputProps: {
        'min': '0.01',
        'step': '.01'
    }
}

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
const exchanger = (from,to, balance)=>{
    const map = new Map()
    map.set("€", 1.00)
    map.set("$", 1.13)
    map.set("ADA", 0.79)

    const exchange1 = map.get(from)
    const exchange2 = map.get(to)

    return Number(Math.floor(((exchange2/exchange1)*parseFloat(balance))*0.97 + 'e' + 2) + 'e-' + 2)
}


export default function Wallets ({wallets,getWallets}) {
    const [values, setValues] = React.useState({
        amount: 0
    })

    const handleChangeMoney = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const [modal, setModal] = React.useState('');
    const open2 = Boolean(modal);
    const handleMenu = (event) =>{
        setAnchorEl(false);
        setModal(event);
    }

    const handleModalClose = () =>{
        setModal(false);
        setMessage({...message, content: " " , type: ""});
    }

    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    const [currency, setCurrency] = React.useState('€');
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const getCurrency = () =>{
        return currency
    }

    const [currency2, setCurrency2] = React.useState('$');
    const handleChange2 = (event) => {
        setCurrency2(event.target.value);
    };
    const user = useSelector(state => state.loggedReducer)

    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const transfer = async (balance, currency) => {
        let minBal = 0
        if(currency==="€")
            minBal = 5
        if(currency==="$")
            minBal = 5.65
        if(currency==="ADA")
            minBal = 3.95
        if(minBal > balance)
            setMessage({...message, content: "Valor mínimo de transferência: " + minBal + currency, type: "error"})
        else
            try {
                const response = await axios.get("http://localhost:8080/withdrawMoney/"+ user+"/"+balance+"/" + currency).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        setMessage({...message, content: error.response.data, type: "error"})
                    }
                }).then((response) => {
                    const balanceR = parseFloat(balance) - Number(Math.floor(parseFloat(balance * 0.03) + 'e' + 2) + 'e-' + 2)
                    if(response.status === 200){
                        console.log("SUCCESSS")
                        setMessage({...message, content: "Transferido " + balance + currency + " com sucesso!" +
                            " Irá receber " + balanceR + currency + " dentro de 2 a 3 dias.", type: "success"})
                        getWallets(user)
                    }
                })
            } catch (e) {
                console.log(e);
            }
    }

    const deposit = async (balance, currency) => {
        if(balance < 0)
            setMessage({...message, content: "Insira uma quantia positiva!", type: "error"})
        else
            try {
                balance = parseFloat(balance) + Number(Math.ceil(parseFloat(balance * 0.05) + 'e' + 2) + 'e-' + 2)
                console.log(balance)
                const response = await axios.get("http://localhost:8080/depositMoney/"+ user+"/"+balance+"/"+currency).then(
                    (response) => {
                    if(response.status === 200){
                        console.log("SUCCESSS")
                        setMessage({...message, content: "Depositado " + balance + currency + " com sucesso!", type: "success"})
                        getWallets(user)
                    }
                })
            } catch (e) {
                console.log(e);
            }
    }

    const convert = async (from, to, balance) => {
        if(balance < 0)
            setMessage({...message, content: "Insira uma quantia positiva!", type: "error"})
        else
            try {
                const response = await axios.get("http://localhost:8080/exchangeMoney/"+ from+"/"+to+"/" + balance + "/" + user).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        setMessage({...message, content: error.response.data, type: "error"})
                    }
                }).then((response) => {
                    const balanceR = exchanger(from, to, balance)
                    if(response.status === 200){
                        setMessage({...message, content: "Convertido " + balance + from + " em " +
                                + balanceR + to + " !", type: "success"})
                        getWallets(user)
                    }
                })
            } catch (e) {
                console.log(e);
            }
    }

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="wallet of current user"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountBalanceWalletIcon />
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
                <MenuItem onClick={()=>handleMenu('withdraw')}>Levantar</MenuItem>
                <MenuItem onClick={()=>handleMenu('deposit')}>Depositar</MenuItem>
                <MenuItem onClick={()=>handleMenu('exchange')}>Converter</MenuItem>
            </Menu>
            <Modal
                open={open2}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="myModal"
            >
                <Box sx={style}>
                    {modal === 'withdraw' ?
                        <div>
                            <Box sx={style}>
                                <Box style={{ width: "50%" }}>
                                    <Typography id="modal-modal-title" variant="h2" style={{fontWeight:"bold", fontFamily:"Segoe UI", fontSize: 20}} component="h2">
                                        <div style={{display: 'flex', alignItems: 'center'}}> <AccountBalanceWalletIcon style={{marginRight:10}}/> <span>Levantar dinheiro</span></div>
                                    </Typography>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira moeda a levantar</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{marginTop:30}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={currency}
                                            onChange={handleChange}
                                            label="Currency"
                                        >
                                            {wallets && wallets.map((wallet,index) => (
                                                <MenuItem key={index} value={wallet.currency}>
                                                    {wallet.currency}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                        <Button onClick={()=>transfer(values.amount,getCurrency())} variant="contained" color={"secondary"} style={{marginTop:70}}>Transferir</Button>
                                    </FormControl>

                                </Box>
                                <Divider orientation={'vertical'} flexItem={true}/>
                                <Box style={{ width: "50%",marginTop: "5%", alignItems: "center", justifyContent: "center", textAlign: "left", paddingLeft:20}}>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira quantia a levantar</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{paddingLeft:5}}>
                                        <InputLabel style={{paddingLeft:38}} htmlFor="outlined-adornment-amount" required="true">Montante</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            type="number"
                                            inputProps={props.inputProps}
                                            value={values.amount}
                                            defaultValue="0.01"
                                            onChange={handleChangeMoney('amount')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {currency}
                                                </InputAdornment>
                                            }
                                            label="amount"
                                        />
                                    </FormControl>

                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>O valor mínimo de transferência é <span style={{color:'black'}}>5.00€</span> </p>
                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>Cada transferência implica uma taxa de  <span style={{color:'black'}}>3%</span> </p>

                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>
                                        Tem um total de
                                        <span style={{color:'black'}}> {Number(Math.floor(parseFloat(wallets.find(w => w.currency === getCurrency()).balance) + 'e' + 2) + 'e-' + 2)}{getCurrency()} </span>
                                          para levantar</p>
                                </Box>
                            </Box>

                        </div>
                        : null
                    }
                    {modal === 'deposit' ?
                        <div>
                            <Box sx={style}>
                                <Box style={{ width: "50%" }}>
                                    <Typography id="modal-modal-title" variant="h2" style={{fontWeight:"bold", fontFamily:"Segoe UI", fontSize: 20}} component="h2">
                                        <div style={{display: 'flex', alignItems: 'center'}}> <AccountBalanceWalletIcon style={{marginRight:10}}/> <span>Depositar dinheiro</span></div>
                                    </Typography>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira moeda a depositar</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{marginTop:30}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={currency}
                                            onChange={handleChange}
                                            label="Currency"
                                        >
                                            {wallets && wallets.map((wallet,index) => (
                                                <MenuItem key={index} value={wallet.currency}>
                                                    {wallet.currency}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                        <Button onClick={()=>deposit(values.amount,getCurrency())} variant="contained" color={"secondary"} style={{marginTop:70}}>Depositar</Button>
                                    </FormControl>

                                </Box>
                                <Divider orientation={'vertical'} flexItem={true}/>
                                <Box style={{ width: "50%",marginTop: "5%", alignItems: "center", justifyContent: "center", textAlign: "left", paddingLeft:20}}>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira quantia a depositar</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{paddingLeft:5}}>
                                        <InputLabel style={{paddingLeft:38}} htmlFor="outlined-adornment-amount" required="true">Montante</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            type="number"
                                            inputProps={props.inputProps}
                                            value={values.amount}
                                            defaultValue="0.01"
                                            onChange={handleChangeMoney('amount')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {currency}
                                                </InputAdornment>
                                            }
                                            label="amount"
                                        />
                                    </FormControl>

                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>
                                        Irá receber
                                        <span style={{color:'black', fontWeight:'600'}}> {values.amount}{getCurrency()} +  </span>
                                        <span style={{color:'#DDA74F', fontWeight:'600'}}> {Number(Math.floor(parseFloat(values.amount * 0.05) + 'e' + 2) + 'e-' + 2)}{getCurrency()} </span>
                                        pelo seu depósito</p>
                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}> <span style={{color:'#DDA74F', fontWeight:'600'}}>+5% bónus</span>  por cada depósito </p>

                                </Box>
                            </Box>

                        </div> : null
                    }
                    {modal === 'exchange' ?
                        <div>
                            <Box sx={style}>
                                <Box style={{ width: "50%" }}>
                                    <Typography id="modal-modal-title" variant="h2" style={{fontWeight:"bold", fontFamily:"Segoe UI", fontSize: 20}} component="h2">
                                        <div style={{display: 'flex', alignItems: 'center'}}> <AccountBalanceWalletIcon style={{marginRight:10}}/> <span>Converter dinheiro</span></div>
                                    </Typography>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira moeda a converter</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{marginTop:10}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={currency}
                                            onChange={handleChange}
                                            label="Currency"
                                        >
                                            {wallets && wallets.map((wallet,index) => (
                                                <MenuItem key={index} value={wallet.currency}>
                                                    {wallet.currency}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira moeda a receber</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{marginTop:10}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={currency2}
                                            onChange={handleChange2}
                                            label="Currency"
                                        >
                                            {wallets && wallets.map((wallet,index) => (
                                                <MenuItem key={index} value={wallet.currency}>
                                                    {wallet.currency}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>

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
                                    <Button onClick={()=>convert(currency, currency2, values.amount)} variant="contained" color={"secondary"} style={{marginTop:70, marginRight:20}}>Converter</Button>

                                </Box>
                                <Divider orientation={'vertical'} flexItem={true}/>
                                <Box style={{ width: "50%",marginTop: "5%", alignItems: "center", justifyContent: "center", textAlign: "left", paddingLeft:20}}>
                                    <p style={{fontWeight:600, fontFamily:"Segoe UI"}}>Insira quantia a converter</p>
                                    <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }} style={{paddingLeft:5}}>
                                        <InputLabel style={{paddingLeft:38}} htmlFor="outlined-adornment-amount" required="true">Montante</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            type="number"
                                            inputProps={props.inputProps}
                                            value={values.amount}
                                            defaultValue="0.01"
                                            onChange={handleChangeMoney('amount')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {currency}
                                                </InputAdornment>
                                            }
                                            label="amount"
                                        />
                                    </FormControl>
                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>Cada conversão implica uma taxa de  <span style={{color:'black'}}>3%</span> </p>

                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>
                                        Tem um total de
                                        <span style={{color:'black'}}> {Number(Math.floor(parseFloat(wallets.find(w => w.currency === getCurrency()).balance) + 'e' + 2) + 'e-' + 2)}{getCurrency()} </span>
                                        para levantar</p>
                                    <p style={{paddingLeft:15, fontSize:13, color:'grey'}}>
                                        A sua conversão irá resultar em:
                                        <span style={{color:'black'}}> {exchanger(currency,currency2,values.amount)}{currency2} </span>
                                        </p>
                                </Box>
                            </Box>

                        </div>
                        : null
                    }
                </Box>
            </Modal>
        </div>
    );

}