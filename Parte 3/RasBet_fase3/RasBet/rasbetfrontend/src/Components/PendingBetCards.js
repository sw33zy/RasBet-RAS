import {Toolbar} from "@mui/material";
import * as React from "react";
import {Box, Divider} from "@material-ui/core";
import axios from "axios";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import BetRow from "./BetRow";
import BetCardListRow from "./BetCardListRow";


const PendingBetCards = () =>{
    let isLogged = useSelector(state => state.loggedReducer)
    const [betcards,setBetcards] = useState('')

    const getBetcards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/viewBetCardsState/"+isLogged+"/false")
            setBetcards(await response.data)
        } catch (e) {
            console.log(e);
        }

    }

    useEffect( () => {
        getBetcards();
    }, []);

    const BetCardList = () => {
        const r = []
        if(betcards.length > 0)
            betcards.map((betcard,index) => {
                r.push(BetCardListRow(betcard,index,0))
            })
        return r
    }

    return (
        <div>

            <Toolbar/>
            <div style={{width:1250}}>
                <p style={{paddingLeft:20, fontWeight:'bold', fontFamily:"Segoe UI"}}> Apostas Pendentes</p>
                <Divider/>
            </div>
            <div style={{maxHeight: 600, overflow: 'auto'}}>
                <BetCardList/>
            </div>
        </div>
    )
}

export default PendingBetCards