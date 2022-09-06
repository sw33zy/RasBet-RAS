import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import BetCardListRow from "./BetCardListRow";
import {Toolbar} from "@mui/material";
import {Divider} from "@material-ui/core";
import * as React from "react";

const OverBetCards = () =>{
    let isLogged = useSelector(state => state.loggedReducer)
    const [betcards,setBetcards] = useState('')

    const getBetcards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/viewBetCardsState/"+isLogged+"/true")
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
                r.push(BetCardListRow(betcard,index,1))
            })
        return r
    }

    return (
        <div>

            <Toolbar/>
            <div style={{width:1250}}>
                <p style={{paddingLeft:20, fontWeight:'bold', fontFamily:"Segoe UI"}}> Apostas Finalizadas</p>
                <Divider/>
            </div>
            <div style={{maxHeight: 600, overflow: 'auto'}}>
                <BetCardList/>
            </div>
        </div>
    )
}

export default OverBetCards