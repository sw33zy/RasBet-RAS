import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import axios from "axios"
import React from "react"

const EventType = ({ event, message, setMessage, type, handleChange }) => {

    const id = event.split(/[:]+/)[0]
    const sport = event.split(/[:]+/)[1]
    const name = event.split(/[:]+/)[2]

    const [occurrences, setOccurrences] = React.useState([])

    const getOccurrences = async (eventId) => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrences/"+eventId)
            console.log("getOccurrences response: ", await response.data)
            setOccurrences(await response.data)
        } catch (e) {
            console.log(e)
            setMessage({ ...message, content: "Erro a ir buscar occorrências ao servidor!", type: "error" })
        }
    }

    React.useEffect(() => {
        getOccurrences(id)
    }, [])

    return (
        <FormControl sx={{ m: 1, width: '50%' }} variant="filled">
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Tipo"
                onChange={handleChange('type')}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {occurrences &&
                    occurrences.filter((oc) =>
                    (oc.type !== 'X' && oc.type !== '1' && oc.type !== '2' && !oc.type.includes('-') && !oc.type.includes('+'))  
                    ).map((oc, index) => (
                        <MenuItem
                            value={oc.type}
                        >
                            {oc.type}
                        </MenuItem>
                    ))
                }
                <MenuItem value={"end"}>Terminar</MenuItem>
                <MenuItem value={"cancel"}>Cancelar</MenuItem>
                <MenuItem value={"other"}>Outro</MenuItem>
            </Select>
        </FormControl>
    )
}

export default EventType