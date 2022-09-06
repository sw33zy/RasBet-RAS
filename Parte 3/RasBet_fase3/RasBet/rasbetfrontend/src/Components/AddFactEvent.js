import * as React from 'react'
import { Box, Button, Divider, TextField, Toolbar, Typography } from "@mui/material"
import axios from "axios"
import { Alert } from "@material-ui/core"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import EventType from './EventType'

const CHARACTER_LIMIT_DESCRIPTION = 120

const AddFactEvent = () => {

    const [events, setEvents] = React.useState([])

    const [message, setMessage] = React.useState({
        content: '',
        type: '',
    })

    const [values, setValues] = React.useState({
        eventSelected: '',
        type: '',
        description: ''
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    }

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

    const addFactToEvent = async (values) => {
        try {
            const response = await axios.get("http://localhost:8080/addFactToEvent/"+values.eventSelected.split(/[:]+/)[0]+"/"+values.description+"/"+values.type)
            console.log("addFactToEvent response: ", await response.data)
            setMessage({ ...message, content: "Facto adicionado a evento com sucesso!", type: "success" })
            setValues({...values, description: '', type:'', eventSelected: ''})
        } catch (e) {
            console.log("addFactToEvent error: ", e)
            setMessage({ ...message, content: "Erro a adicionar facto a evento!", type: "error" })
        }
    }

    React.useEffect(() => {
        getEvents()
    }, [])

    const buttonDisabled = () => {
        if (values.eventSelected === '' || values.type === '' || values.description === '') {
            return true
        } else {
            return false
        }
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Typography variant='h4' sx={{ marginTop: "20px" }}>
                Adicionar Facto a Evento
            </Typography>
            <Divider sx={{ marginBottom: "30px" }} />
            {message &&
                <Alert sx={{ m: 1, width: "80%" }} severity={message.type}>{message.content}</Alert>
            }
            <Box sx={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
                <Box style={{ width: "50%" }}>
                    <FormControl sx={{ m: 1, width: "90%" }} variant="filled">
                        <InputLabel id="demo-multiple-chip-label">Eventos</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.eventSelected}
                            label="Eventos"
                            onChange={handleChange('eventSelected')}
                        >
                            {events.map((event) => (
                                <MenuItem
                                    key={event.id}
                                    value={event.id + ":" + event.sport + ":" + event.name}
                                >
                                    {event.id + ":" + event.sport + ":" + event.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box style={{ width: "50%" }}>
                    {values.eventSelected &&
                        <EventType event={values.eventSelected} message={message} setMessage={setMessage} type={values.type} handleChange={handleChange} />
                    }
                </Box>
            </Box>
            <Box>
                {values.type &&
                    <TextField
                    id="filled-multiline-static"
                    label="Descrição"
                    multiline
                    rows={4}
                    /* defaultValue="Default Value" */
                    variant="filled"
                    sx={{ m: 1, width: "45%" }}
                    value={values.description}
                    helperText={`${values.description.length}/${CHARACTER_LIMIT_DESCRIPTION}`}
                    onChange={handleChange("description")}
                    inputProps={{
                    maxlength: CHARACTER_LIMIT_DESCRIPTION
                    }}
                    />
                }
            </Box>
            <Box>
                {values.eventSelected &&
                    <Button sx={{ marginTop: "20px", m: 1}} disabled={buttonDisabled()} variant="contained" onClick={() => addFactToEvent(values)}>SUBMETER</Button>
                }
            </Box>
        </Box>
    )
}

export default AddFactEvent