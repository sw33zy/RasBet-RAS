import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@material-ui/core";
import moment from "moment";
import * as React from "react";
import MoreInfoRow from "./MorInfoRow";
import WinChecker, {result, result2} from "./WinChecker";
import winChecker from "./WinChecker";

const style = {
    width: 1150,
    height:150,
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
    background: "linear-gradient(to right, white, white 99.00%, #DDA74F 1.00%)"
}


const BetCardListRow = (betcard,index, mode) => {
    const [id,setId] = useState('')

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

    const multiplier = function(items, prop){
        return items.reduce( function(a, b){
            return a * b[prop];
        }, 1);
    };

    const GetInfo = ({id})=>{
        setId(id)
        return(
            <div>
                <p style={{fontFamily:"Segoe UI"}}> {moment(event.date).format('D')+"/"+moment(event.date).format('M') + "-" + moment(event.date).format('H:mm')}</p>
                <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0}}>{event.name}</p>
                {occurrence.type === '1' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 TR - Vitória casa
                    </p> : null}
                {occurrence.type === 'X' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 TR - Empate
                    </p> : null}
                {occurrence.type === '2' ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 TR - Derrota casa
                    </p> : null}
                {occurrence && occurrence.type.includes('1I') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 INT - Vitória casa ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('XI') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 INT - Empate ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('2I') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        1X2 INT - Derrota casa ao intervalo
                    </p> : null}
                {occurrence && occurrence.type.includes('+') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Mais / Menos - Mais {occurrence.type.charAt(1)}
                    </p> : null}
                {occurrence && occurrence.type.includes('-') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Mais / Menos - Menos {occurrence.type.charAt(1)}
                    </p> : null}
                {occurrence && occurrence.type===('KO') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Tipo Vitória - KO
                    </p> : null}
                {occurrence && occurrence.type===('P') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Tipo Vitória - Pontos
                    </p> : null}
                {occurrence && occurrence.type===('S') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Tipo Vitória - Submissão
                    </p> : null}
                {occurrence && occurrence.type===('TKO') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Tipo Vitória - TKO
                    </p> : null}
                {occurrence && occurrence.type===('D') ?
                    <p style={{fontFamily:"Segoe UI", margin: 0, padding: 0, marginBottom:20}}>
                        Tipo Vitória - Desistência
                    </p> : null}
            </div>
        )
    }
    const [extended,setExtended] = useState(false)
    const MoreInfo = ({ocs})=>{
        const r = []
        if(ocs.length > 0)
            ocs.map((oc,index) => {
                r.push(MoreInfoRow(index, oc.moment_odd, oc.occorenceid))
            })
        return r
    }

    return (
        <div>
            <Box style={style}>
                <span style={{fontWeight:'bold',fontFamily:"Segoe UI"}}>Boletim {betcard.id}</span>
                <Box>
                    <p style={{fontWeight:'bold',fontFamily:"Segoe UI"}}>Aposta 1</p>
                    {betcard && <GetInfo id={betcard.occurrencesIds[0].occorenceid}/>}
                </Box>
                <Box>
                    {betcard && <p style={{margin: 0, padding: 0}}> {betcard.occurrencesIds.length}</p>}
                    <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Apostas</small>
                </Box>
                <Box>
                    {betcard && <p style={{margin: 0, padding: 0}}>{betcard.amount}{betcard.currency}</p>}
                    <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Montante apostado</small>
                </Box>
                <Box>
                    {betcard && <p style={{margin: 0, padding: 0}}><WinChecker betcard={betcard} multiplier={Number(Math.floor(parseFloat(multiplier(betcard.occurrencesIds, 'moment_odd'))*betcard.amount +'e'+2)+'e-'+2)} mode={mode}/>{betcard.currency}</p>}
                    {mode === 0 ? <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Possíveis ganhos</small>
                        : <small style={{fontSize:10, color:'grey',fontFamily:"Segoe UI"}}>Ganhou</small>}
                        </Box>
                {betcard.occurrencesIds.length > 1 ?
                    <div className={"flex-items"} style={{textAlign: 'left', cursor: "pointer"}}
                         onClick={() => {
                             setExtended(!extended)
                         }}>
                        <p style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            fontFamily: 'Segoe UI',
                            color: '#DDA74F',
                            width: 120
                        }}>
                            Mais detalhes
                        </p>
                    </div>
                    :
                    <div className={"flex-items"} style={{textAlign: 'left'}}>
                        <p style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            fontFamily: 'Segoe UI',
                            color: '#999',
                            width: 120
                        }}>
                            Mais detalhes
                        </p>
                    </div>
                }
            </Box>
            {extended && betcard &&
            <MoreInfo ocs={betcard.occurrencesIds.slice(1)}/>
            }

        </div>
    )
}

export default BetCardListRow

