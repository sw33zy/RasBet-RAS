import {useEffect, useState} from "react";
import axios from "axios";
import MoreInfoRow from "./MorInfoRow";

const WinChecker = ({betcard, multiplier, mode}) =>{
    const [isWin,setIsWin] = useState(0)
    const [id,setId] = useState('')
    const [occurrence,setOccurrence] = useState('')
    const [event,setEvent] = useState('')
    const getOccurrence = async (bet) => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrence/"+bet)
            const oc = await response.data
            setOccurrence(oc)
            if(oc.win===true)
                setIsWin(1)
            else if(oc.win===false){
                setIsWin(0)
            }

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

    useEffect(()=>{
        moreInfo();
    }, [betcard])
    const moreInfo = ()=>{
        if(betcard.occurrencesIds.length > 0)
            betcard.occurrencesIds.map((oc,index) => {
                setId(oc.occorenceid)
            })
    }

    if(mode===0)
        return multiplier
    else
        return isWin*multiplier
}

export default WinChecker
