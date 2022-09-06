import {Box} from "@material-ui/core";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
const style2 = {
    width: 1150,
    height:100,
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    margin: 15,
    marginLeft: 50,
    marginBottom: 20,
    marginTop:-20,
    background: "linear-gradient(to right, white, white 99.00%, #DDA74F 1.00%)"
}

const MoreInfoRow = (index, moment_odd, id)=> {
    const [occurrence,setOccurrence] = useState('')
    const [event,setEvent] = useState('')
    const getOccurrence = async (bet) => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrence/"+bet)
            const oc = await response.data
            setOccurrence(oc)
            const response2 = await axios.get("http://localhost:8080/getEvent/"+oc.event)
            setEvent(await response2.data)
            return oc.odd
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(  () => {
        getOccurrence(id)
    }, [id]);


    return(
        <Box style={style2}>
            <p style={{fontWeight:'bold',fontFamily:"Segoe UI"}}>Aposta {index+2}</p>
            <p style={{fontFamily:"Segoe UI"}}>{event.name}</p>
            <Box>
                {occurrence.type === '1' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        1X2 TR - Vitória casa
                    </p> : null}
                {occurrence.type === 'X' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        1X2 TR - Empate
                    </p> : null}
                {occurrence.type === '2' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        1X2 TR - Derrota casa
                    </p> : null}
                {occurrence && occurrence.type.includes('1I') ?
                    <p style={{fontFamily:"Segoe UI",margin: 0, padding: 0}}>
                        1X2 INT - Vitória casa ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('XI') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        1X2 INT - Empate ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('2I') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        1X2 INT - Derrota casa ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('+') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Mais / Menos : {occurrence.type}
                    </p> : null}
                {occurrence && occurrence.type.includes('-') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Mais / Menos : {occurrence.type}
                    </p> : null}
                {occurrence && occurrence.type===('KO') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Tipo vitória - KO
                    </p> : null}
                {occurrence && occurrence.type===('P') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Tipo vitória - Pontos
                    </p> : null}
                {occurrence && occurrence.type===('S') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Tipo vitória - Submissão
                    </p> : null}
                {occurrence && occurrence.type===('TKO') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Tipo vitória - TKO
                    </p> : null}
                {occurrence && occurrence.type===('D') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>
                        Tipo vitória - Desqualificação
                    </p> : null}
                <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Tipo de aposta</small>
            </Box>
            <Box>
                <p style={{fontFamily:"Segoe UI",margin: 0, padding: 0}}> {moment(event.date).format('D')+"/"+moment(event.date).format('M') + "-" + moment(event.date).format('H:mm')}</p>
                <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Data</small>
            </Box>
            <Box style={{width: 120}}>
                <p style={{fontFamily:"Segoe UI",margin: 0, padding: 0}}>{Number(Math.floor(parseFloat(moment_odd) +'e'+2)+'e-'+2)}</p>
                <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Cota</small>
            </Box>
        </Box>
    )
}

export default MoreInfoRow