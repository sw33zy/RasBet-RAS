import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {Divider} from "@material-ui/core";

const BetRow = (bet, index,saveMultiplier) => {
    const [multiplier, setMultiplier] = useState(1)
    const [occurrence,setOccurrence] = useState('')
    const [event,setEvent] = useState('')
    const getOccurrence = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrence/"+bet)
            const oc = await response.data
            setOccurrence(oc)
            console.log("oc",oc)
            const response2 = await axios.get("http://localhost:8080/getEvent/"+oc.event)
            setEvent(await response2.data)
            console.log(await response2.data)
            return oc.odd
        } catch (e) {
            console.log(e);
        }
    }

    useEffect( async () => {
        const odd = await getOccurrence()
        if(odd){
            localStorage.setItem('multiplier', (odd*parseFloat(localStorage.getItem('multiplier'))).toString() )
            saveMultiplier(localStorage.getItem('multiplier'))
        }
    }, []);


    return(
        <div>
            <p style={{color:'black', paddingLeft:10, fontWeight:500}}>Aposta {index+1}</p>
            <p style={{margin: 0, padding: 0, color:'black',textAlign:'left', paddingLeft:15}}>
                {event.name}
                <span style={{float:'right', paddingRight:15}}>
                    {moment(event.date).format('D MMMM, H:mm')}
                </span>
            </p>
            {occurrence.type === '1' ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 TR - Vitória casa
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence.type === 'X' ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 TR - Empate
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence.type === '2' ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 TR - Derrota casa
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence && occurrence.type.includes('1I') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 INT - Vitória casa ao intervalo
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence && occurrence.type.includes('XI') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 INT - Empate ao intervalo
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence && occurrence.type.includes('2I') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    1X2 INT - Derrota casa ao intervalo
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                </span>
                </p> : null}
            {occurrence && occurrence.type.includes('+') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Mais / Menos : {occurrence.type}
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type.includes('-') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Mais / Menos : {occurrence.type}
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type===('KO') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Tipo vitória - KO
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type===('P') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Tipo vitória - Pontos
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type===('S') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Tipo vitória - Submissão
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type===('TKO') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Tipo vitória - TKO
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            {occurrence && occurrence.type===('D') ?
                <p style={{color:'black', paddingLeft:15,textAlign:'left'}}>
                    Tipo vitória - Desqualificação
                    <span style={{float:'right', paddingRight:15}}>
                    {Number(Math.floor(parseFloat(occurrence.odd) + 'e' + 2) + 'e-' + 2)}
                    </span>
                </p> : null}
            <Divider/>
        </div>
    )
}

export default BetRow;