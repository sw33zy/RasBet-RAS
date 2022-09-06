import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Checkbox, FilledInput, FormControl, FormControlLabel, FormGroup, InputLabel, Typography } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    /* '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, */
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))


const OccurrenceTable = ({ sport,
    valuesFutebol, handleChangeFutebol, valuesCheckedFutebol, handleChangeCheckedFutebol,
    valuesBasket, handleChangeBasket, valuesCheckedBasket, handleChangeCheckedBasket,
    valuesMMA, handleChangeMMA, valuesCheckedMMA, handleChangeCheckedMMA
}) => {
    //___________________________________FUTEBOL OCCURRENCES TABLE_____________________________
    if (sport === "futebol") {
        return (
            <>
                <Typography variant='h6' sx={{ marginBottom: "10px" }}>
                    Apostas Futebol
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableBody>
                            {/* 1 X 2 TR */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedFutebol.oneXtwoTRChecked} onChange={handleChangeCheckedFutebol('oneXtwoTRChecked')} />} label="1 X 2 TR" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-one">Odd 1</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-one"
                                            value={valuesFutebol.one}
                                            onChange={handleChangeFutebol('one')}
                                            type='number'
                                            inputProps={{
                                                    min: '1',
                                                    step: '.01'
                                                }
                                            }
                                            label="one"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-x">Odd X</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-x"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.x}
                                            onChange={handleChangeFutebol('x')}
                                            label="x"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-two">Odd 2</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-two"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.two}
                                            onChange={handleChangeFutebol('two')}
                                            label="two"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* 1 X 2 INT */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedFutebol.oneXtwoIntChecked} onChange={handleChangeCheckedFutebol('oneXtwoIntChecked')} />} label="1 X 2 INT" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-oneI">Odd 1I</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-oneI"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.oneI}
                                            onChange={handleChangeFutebol('oneI')}
                                            label="oneI"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-xI">Odd XI</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-xI"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.xI}
                                            onChange={handleChangeFutebol('xI')}
                                            label="xI"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-twoI">Odd 2I</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-twoI"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.twoI}
                                            onChange={handleChangeFutebol('twoI')}
                                            label="twoI"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* Mais/Menos Golos */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedFutebol.N1Checked} onChange={handleChangeCheckedFutebol('N1Checked')} />} label="Mais/Menos Golos" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-N1">Diferença</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-N1"
                                            type='number'
                                            inputProps={{
                                                min: '0.5',
                                                step: '1'
                                            }
                                            }
                                            value={valuesFutebol.N1}
                                            onChange={handleChangeFutebol('N1')}
                                            label="N1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-x">Odd Mais {valuesFutebol.N1}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-plusN1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.plusN1}
                                            onChange={handleChangeFutebol('plusN1')}
                                            label="plusN1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-minusN1">Odd Menos {valuesFutebol.N1}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-minusN1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesFutebol.minusN1}
                                            onChange={handleChangeFutebol('minusN1')}
                                            label="minusN1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
    //___________________________________BASKET OCCURRENCES TABLE_____________________________
    if (sport === "basket") {
        return (
            <>
                <Typography variant='h6' sx={{ marginBottom: "10px" }}>
                    Apostas Basquetebol
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableBody>
                            {/* 1 2 */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedBasket.oneTwoChecked} onChange={handleChangeCheckedBasket('oneTwoChecked')} />} label="1 2" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-one">Odd 1</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-one"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.one}
                                            onChange={handleChangeBasket('one')}
                                            label="one"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">

                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-two">Odd 2</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-two"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.two}
                                            onChange={handleChangeBasket('two')}
                                            label="two"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* 1 X 2 INT1 */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedBasket.oneXtwoInt1Checked} onChange={handleChangeCheckedBasket('oneXtwoInt1Checked')} />} label="1 X 2 INT1" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-oneI1">Odd 1IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-oneI1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.oneI1}
                                            onChange={handleChangeBasket('oneI1')}
                                            label="oneI1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-xI1">Odd XIN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-xI1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.xI1}
                                            onChange={handleChangeBasket('xI1')}
                                            label="xI1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-twoI1">Odd 2IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-twoI1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.twoI1}
                                            onChange={handleChangeBasket('twoI1')}
                                            label="twoI1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* 1 X 2 INT2 */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedBasket.oneXtwoInt2Checked} onChange={handleChangeCheckedBasket('oneXtwoInt2Checked')} />} label="1 X 2 INT2" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-oneI2">Odd 1IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-oneI2"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.oneI2}
                                            onChange={handleChangeBasket('oneI2')}
                                            label="oneI2"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-xI2">Odd XIN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-xI2"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.xI2}
                                            onChange={handleChangeBasket('xI2')}
                                            label="xI2"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-twoI2">Odd 2IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-twoI2"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.twoI2}
                                            onChange={handleChangeBasket('twoI2')}
                                            label="twoI2"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* 1 X 2 INT3 */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedBasket.oneXtwoInt3Checked} onChange={handleChangeCheckedBasket('oneXtwoInt3Checked')} />} label="1 X 2 INT3" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-oneI3">Odd 1IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-oneI3"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.oneI3}
                                            onChange={handleChangeBasket('oneI3')}
                                            label="oneI3"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-xI3">Odd XIN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-xI3"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.xI3}
                                            onChange={handleChangeBasket('xI3')}
                                            label="xI3"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-twoI3">Odd 2IN</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-twoI3"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.twoI3}
                                            onChange={handleChangeBasket('twoI3')}
                                            label="twoI3"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* Mais/Menos Pontos */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedBasket.N1Checked} onChange={handleChangeCheckedBasket('N1Checked')} />} label="Mais/Menos Pontos" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-N1">Diferença</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-N1"
                                            type='number'
                                            inputProps={{
                                                min: '0.5',
                                                step: '1'
                                            }
                                            }
                                            value={valuesBasket.N1}
                                            onChange={handleChangeBasket('N1')}
                                            label="N1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-x">Odd Mais {valuesBasket.N1}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-plusN1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.plusN1}
                                            onChange={handleChangeBasket('plusN1')}
                                            label="plusN1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-minusN1">Odd Menos {valuesBasket.N1}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-minusN1"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesBasket.minusN1}
                                            onChange={handleChangeBasket('minusN1')}
                                            label="minusN1"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
    //___________________________________MMA OCCURRENCES TABLE_____________________________
    if (sport === "mma") {
        return (
            <>
                <Typography variant='h6' sx={{ marginBottom: "10px" }}>
                    Apostas MMA
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableBody>
                            {/* 1 2 */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedMMA.oneTwoChecked} onChange={handleChangeCheckedMMA('oneTwoChecked')} />} label="1  2" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-one">Odd 1</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-one"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.one}
                                            onChange={handleChangeMMA('one')}
                                            label="one"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">

                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-two">Odd 2</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-two"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.two}
                                            onChange={handleChangeMMA('two')}
                                            label="two"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                            {/* Mais/Menos pontos */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedMMA.NChecked} onChange={handleChangeCheckedMMA('NChecked')} />} label="Mais/Menos Rondas" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-N">Diferença</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-N"
                                            type='number'
                                            inputProps={{
                                                min: '0.5',
                                                step: '1'
                                            }
                                            }
                                            value={valuesMMA.N}
                                            onChange={handleChangeMMA('N')}
                                            label="N"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-plusN">Odd Mais {valuesMMA.N}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-plusN"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.plusN}
                                            onChange={handleChangeMMA('plusN')}
                                            label="plusN"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-minusN">Odd Menos {valuesMMA.N}</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-minusN"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.minusN}
                                            onChange={handleChangeMMA('minusN')}
                                            label="minusN"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>

                            {/* KoPSTkoD */}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={valuesCheckedMMA.KoPSTkoDChecked} onChange={handleChangeCheckedMMA('KoPSTkoDChecked')} />} label="Odds vitória" />
                                    </FormGroup>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-ko">KO Odd</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-ko"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.ko}
                                            onChange={handleChangeMMA('ko')}
                                            label="ko"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-p">Pontos Odd</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-p"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.p}
                                            onChange={handleChangeMMA('p')}
                                            label="p"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-s">Submissão Odd</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-s"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.s}
                                            onChange={handleChangeMMA('s')}
                                            label="s"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-tko">TKO Odds</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-tko"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.tko}
                                            onChange={handleChangeMMA('tko')}
                                            label="tko"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormControl sx={{ width: "90%" }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-d">Desqualificação Odds</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-d"
                                            type='number'
                                            inputProps={{
                                                min: '1',
                                                step: '.01'
                                            }
                                            }
                                            value={valuesMMA.d}
                                            onChange={handleChangeMMA('d')}
                                            label="d"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }


}

export default OccurrenceTable