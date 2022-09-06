import { Box, Button, Divider, FilledInput, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Alert } from "@material-ui/core"
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import OccurrenceTable from "./OccurrenceTable"
import axios from "axios"

const AddEvent = () => {

  const addEvent = async (values, date) => {
    console.log("addEvent: ", {
      name: values.name,
      date: date,
      sport: values.sport,
      state: "pending",
      description: values.description,
    })
    try {
      const response = await axios.post(
        'http://localhost:8080/addEvent',
        {
          name: values.name,
          date: date,
          sport: values.sport,
          state: "pending",
          description: values.description,
        }
      )
      const event = await response.data
      console.log("addEvent response: ", event)

      return event

    } catch (e) {
      console.log("addEvent error: ", e.response)
      setMessage({ ...message, content: "Erro a adicionar evento!", type: "error" })
    }
  }

  const addElements = async (eventId, values) => {
    console.log("addElements: ", [
      {
        idEvent: eventId,
        description: values.team1
      },
      {
        idEvent: eventId,
        description: values.team2
      }
    ])
    try {
      const response = await axios.post(
        'http://localhost:8080/addElements',
        [
          {
            idEvent: eventId,
            description: values.team1
          },
          {
            idEvent: eventId,
            description: values.team2
          }
        ]
      )
      console.log("addElements response: ", await response)

    } catch (e) {
      console.log("addElements error: ", e.response)
      setMessage({ ...message, content: "Erro a adicionar elementos!", type: "error" })
    }
  }

  const addOccurrences = async (occurrences) => {
    console.log("addOccurrences: ", occurrences)
    try {
      const response = await axios.post(
        'http://localhost:8080/addOccurrences',
        occurrences
      )
      console.log("addOccurrences response: ", await response)
      setMessage({ ...message, content: "Evento e occorrências adicionados com sucesso!", type: "success" })

    } catch (e) {
      console.log("addOccurrences error: ", e.response)
      setMessage({ ...message, content: "Erro a adicionar elementos!", type: "error" })
    }
  }

  const submit = async (values, dateTime, dateTimeISO, valuesFutebol, checkedFutebol, valuesBasket, checkedBasket, valuesMMA, checkedMMA) => {

    const date = dateTimeISO.split(/[.]+/)[0]
    console.log("date: ", date)
    console.log("values: ", values)

    if (values.name === '' || values.sport === '' || values.team1 === '' || values.team2 === '') {
      setMessage({ ...message, content: "Existem campos em vazio!", type: "error" })
    } else {

      const event = await addEvent(values, date)

      await addElements(event.id, values)

      //______________________________FUTEBOL OCCURRENCES_____________________________

      if (values.sport === "futebol") {
        console.log(valuesFutebol, checkedFutebol)
        // 1 X 2 TR
        if (checkedFutebol.oneXtwoTRChecked === true) {
          if (valuesFutebol.one !== '' && valuesFutebol.x !== '' && valuesFutebol.two !== '') {
            const oc = [{
              type: "1",
              odd: valuesFutebol.one,
              event: event.id,
              win: 0
            },
            {
              type: "X",
              odd: valuesFutebol.x,
              event: event.id,
              win: 0
            },
            {
              type: "2",
              odd: valuesFutebol.two,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1X2 TR!", type: "error" })
          }
        }
        // 1 X 2 INT
        if (checkedFutebol.oneXtwoIntChecked === true) {
          if (valuesFutebol.oneI !== '' && valuesFutebol.xI !== '' && valuesFutebol.twoI !== '') {
            const oc = [{
              type: "1I",
              odd: valuesFutebol.one,
              event: event.id,
              win: 0
            },
            {
              type: "XI",
              odd: valuesFutebol.x,
              event: event.id,
              win: 0
            },
            {
              type: "2I",
              odd: valuesFutebol.two,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1X2 INT!", type: "error" })
          }
        }
        // Mais/Menos Golos
        if (checkedFutebol.N1Checked === true) {
          if (valuesFutebol.N1 !== '' && valuesFutebol.plusN1 !== '' && valuesFutebol.minusN1 !== '') {
            const oc = [{
              type: "+" + valuesFutebol.N1,
              odd: valuesFutebol.plusN1,
              event: event.id,
              win: 0
            },
            {
              type: "-" + valuesFutebol.N1,
              odd: valuesFutebol.minusN1,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência Mais/Menos Golos!", type: "error" })
          }
        }
      }
      //______________________________BASKET OCCURRENCES_____________________________
      if (values.sport === "basket") {
        console.log(valuesBasket, checkedBasket)
        // 1 2
        if (checkedBasket.oneTwoChecked === true) {
          if (valuesBasket.one !== '' && valuesBasket.two !== '') {
            const oc = [{
              type: "1",
              odd: valuesBasket.one,
              event: event.id,
              win: 0
            },
            {
              type: "2",
              odd: valuesBasket.two,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1 2!", type: "error" })
          }
        }
        // 1 X 2 INT1
        if (checkedBasket.oneXtwoInt1Checked === true) {
          if (valuesBasket.oneI1 !== '' && valuesBasket.twoI1 !== '' && valuesBasket.xI1 !== '') {
            const oc = [{
              type: "1I1",
              odd: valuesBasket.oneI1,
              event: event.id,
              win: 0
            },
            {
              type: "XI1",
              odd: valuesBasket.xI1,
              event: event.id,
              win: 0
            },
            {
              type: "2I1",
              odd: valuesBasket.twoI1,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1 X 2 INT1!", type: "error" })
          }
        }
        // 1 X 2 INT2
        if (checkedBasket.oneXtwoInt2Checked === true) {
          if (valuesBasket.oneI2 !== '' && valuesBasket.twoI2 !== '' && valuesBasket.xI2 !== '') {
            const oc = [{
              type: "1I2",
              odd: valuesBasket.oneI2,
              event: event.id,
              win: 0
            },
            {
              type: "XI2",
              odd: valuesBasket.xI2,
              event: event.id,
              win: 0
            },
            {
              type: "2I2",
              odd: valuesBasket.twoI2,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1 X 2 INT2!", type: "error" })
          }
        }
        // 1 X 2 INT3
        if (checkedBasket.oneXtwoInt3Checked === true) {
          if (valuesBasket.oneI3 !== '' && valuesBasket.twoI3 !== '' && valuesBasket.xI3 !== '') {
            const oc = [{
              type: "1I3",
              odd: valuesBasket.oneI3,
              event: event.id,
              win: 0
            },
            {
              type: "XI3",
              odd: valuesBasket.xI3,
              event: event.id,
              win: 0
            },
            {
              type: "2I3",
              odd: valuesBasket.twoI3,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1 X 2 INT3!", type: "error" })
          }
        }
        // Mais/Menos Pontos
        if (checkedBasket.N1Checked === true) {
          if (valuesBasket.N1 !== '' && valuesBasket.plusN1 !== '' && valuesBasket.minusN1 !== '') {
            const oc = [{
              type: "+" + valuesBasket.N1,
              odd: valuesBasket.plusN1,
              event: event.id,
              win: 0
            },
            {
              type: "-" + valuesBasket.N1,
              odd: valuesBasket.minusN1,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência Mais/Menos Pontos!", type: "error" })
          }
        }
      }

      if (values.sport === "mma") {
        console.log(valuesMMA, checkedMMA)
        // 1 2
        if (checkedMMA.oneTwoChecked === true) {
          if (valuesMMA.one !== '' && valuesMMA.two !== '') {
            const oc = [{
              type: "1",
              odd: valuesMMA.one,
              event: event.id,
              win: 0
            },
            {
              type: "2",
              odd: valuesMMA.two,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência 1 2!", type: "error" })
          }
        }
        // Mais/Menos Pontos
        if (checkedMMA.NChecked === true) {
          if (valuesMMA.N !== '' && valuesMMA.plusN !== '' && valuesMMA.minusN !== '') {
            const oc = [{
              type: "+" + valuesMMA.N,
              odd: valuesMMA.plusN,
              event: event.id,
              win: 0
            },
            {
              type: "-" + valuesMMA.N,
              odd: valuesMMA.minusN,
              event: event.id,
              win: 0
            }]
            await addOccurrences(oc)
          } else {
            setMessage({ ...message, content: "Existem campos em vazio na ocorrência Mais/Menos Rondas!", type: "error" })
          }
        }
      }
      // KoPSTkoD
      if (checkedMMA.KoPSTkoDChecked === true) {
        if (valuesMMA.ko !== '' && valuesMMA.p !== '' && valuesMMA.s !== ''  && valuesMMA.tko !== '' && valuesMMA.d !== '') {
          const oc = [{
            type: "KO",
            odd: valuesMMA.ko,
            event: event.id,
            win: 0
          },
          {
            type: "P",
            odd: valuesMMA.p,
            event: event.id,
            win: 0
          },
          {
            type: "S",
            odd: valuesMMA.s,
            event: event.id,
            win: 0
          },
          {
            type: "TKO",
            odd: valuesMMA.tko,
            event: event.id,
            win: 0
          },
          {
            type: "D",
            odd: valuesMMA.d,
            event: event.id,
            win: 0
          }]
          await addOccurrences(oc)
        } else {
          setMessage({ ...message, content: "Existem campos em vazio na Odds Vitória!", type: "error" })
        }
      }
    }


  }

  const [values, setValues] = useState({
    name: '',
    sport: '',
    description: '',
    team1: '',
    team2: ''
  })

  //______________________________FUTEBOL STATES_____________________________

  const [valuesFutebol, setValuesFutebol] = useState({
    one: '',
    two: '',
    x: '',
    oneI: '',
    twoI: '',
    xI: '',
    N1: '',
    plusN1: '',
    minusN1: '',
  })

  const [checkedFutebol, setCheckedFutebol] = useState({
    oneXtwoTRChecked: false,
    oneXtwoIntChecked: false,
    N1Checked: false,
  })

  const handleChangeValuesFutebol = (prop) => (event) => {
    setValuesFutebol({ ...valuesFutebol, [prop]: event.target.value });
    console.log("valuesFutebol: ", valuesFutebol)

    /* if (valuesFutebol.one !== '' && valuesFutebol.two !== '' && valuesFutebol.x !== '') {
      setCheckedFutebol({...checkedFutebol, oneXtwoTRChecked: true})
    } else {
      setCheckedFutebol({...checkedFutebol, oneXtwoTRChecked: false})
    } */

  }

  const handleChangeCheckedFutebol = (prop) => (event) => {
    setCheckedFutebol({ ...checkedFutebol, [prop]: event.target.checked });
    console.log("checkedFutebol: ", checkedFutebol)
  }

  //______________________________BASKETBOL STATES_____________________________

  const [valuesBasket, setValuesBasket] = useState({
    one: '',
    two: '',
    oneI1: '',
    twoI1: '',
    xI1: '',
    oneI2: '',
    twoI2: '',
    xI2: '',
    oneI3: '',
    twoI3: '',
    xI3: '',
    xI: '',
    N1: '',
    plusN1: '',
    minusN1: '',
  })

  const [checkedBasket, setCheckedBasket] = useState({
    oneTwoChecked: false,
    oneXtwoInt1Checked: false,
    oneXtwoInt2Checked: false,
    oneXtwoInt3Checked: false,
    N1Checked: false,
  })

  const handleChangeValuesBasket = (prop) => (event) => {
    setValuesBasket({ ...valuesBasket, [prop]: event.target.value });
    console.log("valuesBasket: ", valuesBasket)
  }

  const handleChangeCheckedBasket = (prop) => (event) => {
    setCheckedBasket({ ...checkedBasket, [prop]: event.target.checked });
    console.log("checkedBasket: ", checkedBasket)
  }

  //______________________________MMA STATES_____________________________

  const [valuesMMA, setValuesMMA] = useState({
    one: '',
    two: '',
    N: '',
    plusN: '',
    minusN: '',
    ko: '',
    p: '',
    s: '',
    tko: '',
    d: '',
  })

  const [checkedMMA, setCheckedMMA] = useState({
    oneTwoChecked: false,
    NChecked: false,
    KoPSTkoDChecked: false,
  })

  const handleChangeValuesMMA = (prop) => (event) => {
    setValuesMMA({ ...valuesMMA, [prop]: event.target.value });
    console.log("valuesMMA: ", valuesMMA)
  }

  const handleChangeCheckedMMA = (prop) => (event) => {
    setCheckedMMA({ ...checkedMMA, [prop]: event.target.checked });
    console.log("checkedMMA: ", checkedMMA)
  }


  const CHARACTER_LIMIT_DESCRIPTION = 200

  const [dateTime, setDateTime] = React.useState(new Date())

  const [dateTimeISO, setDateTimeISO] = React.useState(new Date().toISOString())

  const handleChangeDateTime = (newValue) => {
    setDateTime(newValue)
    setDateTimeISO(newValue.toISOString())
  }

  const [message, setMessage] = React.useState({
    content: '',
    type: '',
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar/>
      <Typography variant='h4' sx={{ marginTop: "20px" }}>
        Adicionar Evento
      </Typography>
      <Divider sx={{ marginBottom: "30px" }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ width: "40%" }}>

          {message &&
            <Alert sx={{ m: 1, width: "88%" }} severity={message.type}>{message.content}</Alert>
          }

          <FormControl sx={{ m: 1, width: "88%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-name">Nome</InputLabel>
            <FilledInput
              id="filled-adornment-name"
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              label="name"
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Data e Hora"
              value={dateTime}
              onChange={handleChangeDateTime}
              renderInput={(params) => <TextField sx={{ m: 1, width: "43%" }} variant="filled" {...params} />}
            />
          </LocalizationProvider>

          <FormControl variant="filled" sx={{ m: 1, width: "42%" }}>
            <InputLabel id="demo-simple-select-filled-label">Modalidade</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={values.sport}
              onChange={handleChange('sport')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"futebol"}>Futebol</MenuItem>
              <MenuItem value={"basket"}>Basquetebol</MenuItem>
              <MenuItem value={"mma"}>MMA</MenuItem>
            </Select>
          </FormControl>

          {(values.sport == "futebol" || values.sport == "basket") &&
            <div>
              <FormControl sx={{ m: 1, width: "88%" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-team1">Equipa 1</InputLabel>
                <FilledInput
                  id="filled-adornment-team1"
                  type="text"
                  value={values.team1}
                  onChange={handleChange('team1')}
                  label="team1"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "88%" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-team2">Equipa 2</InputLabel>
                <FilledInput
                  id="filled-adornment-team2"
                  type="text"
                  value={values.team2}
                  onChange={handleChange('team2')}
                  label="team2"
                />
              </FormControl>
            </div>
          }

          {(values.sport == "mma") &&
            <div>
              <FormControl sx={{ m: 1, width: "88%" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-team1">Elemento 1</InputLabel>
                <FilledInput
                  id="filled-adornment-team1"
                  type="text"
                  value={values.team1}
                  onChange={handleChange('team1')}
                  label="team1"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "88%" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-team2">Elemento 2</InputLabel>
                <FilledInput
                  id="filled-adornment-team2"
                  type="text"
                  value={values.team2}
                  onChange={handleChange('team2')}
                  label="team2"
                />
              </FormControl>
            </div>
          }

          <TextField
            id="filled-multiline-static"
            label="Descrição"
            multiline
            rows={4}
            /* defaultValue="Default Value" */
            variant="filled"
            sx={{ m: 1, width: "88%" }}
            value={values.description}
            helperText={`${values.description.length}/${CHARACTER_LIMIT_DESCRIPTION}`}
            onChange={handleChange("description")}
            inputProps={{
              maxlength: CHARACTER_LIMIT_DESCRIPTION
            }}
          />
          <Box>
            <Button sx={{ marginLeft: "8px" }} variant="contained" onClick={() => submit(values, dateTime, dateTimeISO, valuesFutebol, checkedFutebol, valuesBasket, checkedBasket, valuesMMA, checkedMMA)}>SUBMETER</Button>
          </Box>
        </Box>
        {values.sport &&
          <Box style={{ width: "60%" }}>

            <OccurrenceTable
              sport={values.sport}
              valuesFutebol={valuesFutebol} handleChangeFutebol={handleChangeValuesFutebol}
              valuesCheckedFutebol={checkedFutebol} handleChangeCheckedFutebol={handleChangeCheckedFutebol}
              valuesBasket={valuesBasket} handleChangeBasket={handleChangeValuesBasket}
              valuesCheckedBasket={checkedBasket} handleChangeCheckedBasket={handleChangeCheckedBasket}
              valuesMMA={valuesMMA} handleChangeMMA={handleChangeValuesMMA}
              valuesCheckedMMA={checkedMMA} handleChangeCheckedMMA={handleChangeCheckedMMA}
            />

          </Box>
        }
      </Box>
    </Box>
  )
}

export default AddEvent