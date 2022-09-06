import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";

export default function WalletsDropdown({wallets}) {

    const [currency, setCurrency] = React.useState(wallets[1].currency);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    
    return (

        <div>
            <FormControl color='secondary' variant="standard" sx={{ m: 1, minWidth: 120 }}>

                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currency}
                    onChange={handleChange}
                    label="Currency"
                    style={{color:'white'}}
                >
                    {wallets && wallets.map((wallet,index) => (
                        <MenuItem key={index} value={wallet.currency}>
                            {wallet.currency + ": " + Number(Math.floor(parseFloat(wallet.balance) + 'e' + 2) + 'e-' + 2)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
}
