import * as React from 'react'
import { Box, Divider, Typography } from "@mui/material"
import axios from "axios"
import {Alert, Toolbar} from "@material-ui/core"
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import EventItem from './EventItem'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, eventName, theme) {
    return {
        fontWeight:
            eventName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

const EndEvent = () => {

    const [events, setEvents] = React.useState([])


    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const getEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/listEvents")
            console.log("getEvents response: ", await response.data)
            setEvents(await response.data)
        } catch (e) {
            console.log("getEvents error: ", e)
            setMessage({ ...message, content: "Erro a ir buscar eventos ao servidor!", type: "error" })
        }
    }

    React.useEffect(() => {
        getEvents()

    }, [])

    const theme = useTheme()
    const [eventName, setEventName] = React.useState([])

    const handleChange = (event) => {
        const { target: { value } } = event
        setEventName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
        console.log(eventName)
    }

    const deleteEventFromState = (id, eventNameElement) => {

        console.log("delete: ", id, eventNameElement)

        setEvents(events.filter((event) =>
            event.id !== Number(id)
        ))

        const filteredEvents = events.filter((event) =>
            event.id !== Number(id)
        )
        console.log("filteredEvents: ", filteredEvents)

        setEventName(eventName.filter((event) =>
            event !== eventNameElement
        ))

        const filteredEventName = eventName.filter((event) =>
            event !== eventNameElement
        )
        console.log("filteredEventNmae: ", filteredEventName)

    }


    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar/>
            <Typography variant='h4' sx={{ marginTop: "20px" }}>
                Terminar Evento
            </Typography>
            <Divider sx={{ marginBottom: "30px" }} />
            {message &&
                <Alert sx={{ m: 1, width: "80%" }} severity={message.type}>{message.content}</Alert>
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box style={{ width: "100%" }}>
                    <div>
                        <FormControl sx={{ m: 1, width: "50%" }}>
                            <InputLabel id="demo-multiple-chip-label">Eventos</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={eventName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Eventos" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {events.map((event) => (
                                    <MenuItem
                                        key={event.id}
                                        value={event.id + ":" + event.sport + ":" + event.name}
                                        style={getStyles(event.name, eventName, theme)}
                                    >
                                        {event.id + ":" + event.sport + ":" + event.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            </Box>
            <div style={{ marginTop: "40px", maxHeight: "400px", overflowY: "scroll" }}>
                {eventName.map((eventName) => (
                    <EventItem eventName={eventName} message={message} setMessage={setMessage} deleteEvent={deleteEventFromState} />
                ))}
            </div>

        </Box>
    )
}

export default EndEvent