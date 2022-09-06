import { Box, Button, FilledInput, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"

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


const EventItem = ({ eventName, message, setMessage, deleteEvent }) => {

    const id = eventName.split(/[:]+/)[0]
    const sport = eventName.split(/[:]+/)[1]
    const name = eventName.split(/[:]+/)[2]

    const [values, setValues] = useState({
        home: '',
        away: '',
        element: '',
        type: '',
        rounds: '',
    })

    const disabledTwo = () => {
        if (values.home === '' || values.away === '') {
            return true
        } else {
            return false
        }
    }

    const disabledThree = () => {
        if (values.element === '' || values.type === '' || values.rounds === '') {
            return true
        } else {
            return false
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const endEvent = async (eventId, values) => {
        
        if (sport === 'futebol' || sport === 'basket') {
            try {
                const response = await axios.get("http://localhost:8080/endEvent/"+eventId+"/"+values.home+"-"+values.away)
                console.log("endEvent response: ", await response)
                deleteEvent(id, eventName)
                setMessage({ ...message, content: "Evento com id: "+eventId+" terminado com sucesso!", type: "success" })
            } catch (e) {
                console.log("endEvent error: ", e)
                setMessage({ ...message, content: "Erro a terminar evento com id: "+eventId+"!", type: "error" })
            }
        }
        if (sport === 'mma') {
            try {
                const response = await axios.get("http://localhost:8080/endEvent/"+eventId+"/"+values.element+"-"+values.type+"-"+values.rounds)
                console.log("endEvent response: ", await response)
                deleteEvent(id, eventName)
                setMessage({ ...message, content: "Evento com id: "+eventId+" terminado com sucesso!", type: "success" })
            } catch (e) {
                console.log("endEvent error: ", e)
                setMessage({ ...message, content: "Erro a terminar evento com id: "+eventId+"!", type: "error" })
            }
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
            <Box sx={{ display: 'flex', alingItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant={'h6'} sx={{ alignText: 'center', alignSelf: 'center' }}>
                    Resultado:
                </Typography>
                {(sport === "futebol" || sport === "basket") &&
                    <>
                        <TextField
                            id="input-home"
                            label="Casa"
                            variant="filled"
                            value={values.home}
                            onChange={handleChange('home')}
                            type='number'
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "center" },
                                    min: '0',
                                    step: '1'
                                }
                            }}
                            sx={{ m: 1, width: "100px" }}
                        />
                        <Typography variant={'h5'} sx={{ alignText: 'center', alignSelf: 'center' }}>
                            -
                        </Typography>
                        <TextField
                            id="input-away"
                            label="Fora"
                            variant="filled"
                            value={values.away}
                            onChange={handleChange('away')}
                            type='number'
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "center" },
                                    min: '0',
                                    step: '1'
                                }
                            }}
                            sx={{ m: 1, width: "100px" }}
                        />
                    </>
                }
                {sport === "mma" &&
                    <>
                        <TextField
                            id="input-element"
                            label="Elemento"
                            variant="filled"
                            value={values.element}
                            onChange={handleChange('element')}
                            type='number'
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "center" },
                                    min: '1',
                                    step: '1',
                                    max: '2'
                                }
                            }}
                            sx={{ m: 1, width: "100px" }}
                        />
                        <Typography variant={'h5'} sx={{ alignText: 'center', alignSelf: 'center' }}>
                            -
                        </Typography>
                        <FormControl variant="filled" sx={{ m: 1, width: "100px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={values.type}
                                onChange={handleChange('type')}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"KO"}>KO</MenuItem>
                                <MenuItem value={"P"}>Pontos</MenuItem>
                                <MenuItem value={"S"}>Submissão</MenuItem>
                                <MenuItem value={"TKO"}>Submissão</MenuItem>
                                <MenuItem value={"D"}>Desqualificação</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant={'h5'} sx={{ alignText: 'center', alignSelf: 'center' }}>
                            -
                        </Typography>
                        <TextField
                            id="input-rounds"
                            label="Rondas"
                            variant="filled"
                            value={values.rounds}
                            onChange={handleChange('rounds')}
                            type='number'
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "center" },
                                    min: '1',
                                    step: '1'
                                }
                            }}
                            sx={{ m: 1, width: "100px" }}
                        />
                    </>
                }
            </Box>
            {(sport === "futebol" || sport === "basket") &&
                <Box sx={{ width: "150px" }}>
                    <Button disabled={disabledTwo()} variant="contained" onClick={() => endEvent(id, values)}>Terminar Evento</Button>
                </Box>
            }
            {sport === "mma" &&
                <Box sx={{ width: "150px" }}>
                    <Button disabled={disabledThree()} variant="contained" onClick={() => endEvent(id, values)}>Terminar Evento</Button>
                </Box>
            }


        </Box>
    )
}

export default EventItem