import { Box, Button, Typography } from "@mui/material"
import axios from "axios"

const style = {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between',
    margin: 15,
    marginLeft: 50,
    marginBottom: 20,
    background: "linear-gradient(to right, white, white 99.00%, #DDA74F 1.00%)",
    alignItems: "center",
    padding: 30
}

const CancelEventItem = ({ eventName, message, setMessage, deleteEvent }) => {

    const id = eventName.split(/[:]+/)[0]
    const sport = eventName.split(/[:]+/)[1]
    const name = eventName.split(/[:]+/)[2]

    const cancelEvent = async (eventId) => {

        try {
            const response = await axios.get("http://localhost:8080/cancelEvent/"+eventId)
            console.log("cancelEvent response: ", await response)
            deleteEvent(id, eventName)
            setMessage({ ...message, content: "Evento com id: "+eventId+" cancelado com sucesso!", type: "success" })
        } catch (e) {
            console.log("cancelEvent error: ", e)
            setMessage({ ...message, content: "Erro a cancelar evento com id: "+eventId+"!", type: "error" })
        }
        
    }

    return (
        <Box style={style}>
            <Box>
                <Typography variant={'h6'}>
                    Nome: {name}
                </Typography>
                <Typography variant={'body1'}>
                    Id: {id} Desporto: {sport}
                </Typography>
            </Box>
            <Box sx={{ width: "150px" }}>
                <Button variant="contained" onClick={() => cancelEvent(id)}>Cancelar Evento</Button>
            </Box>
        </Box>
    )
}

export default CancelEventItem