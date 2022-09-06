import * as React from 'react';
import {Container, Divider, Pagination} from "@material-ui/core";
import {withStyles} from '@material-ui/styles';
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import './NextUpTable.css';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useDispatch, useSelector} from "react-redux";
import SportsMmaIcon from '@mui/icons-material/SportsMma';

export const IconRender = (type) => {
    if(type === 'futebol') return (<SportsSoccerIcon/>);
    if(type === 'basket') return (<SportsBasketballIcon/>);
    if(type === 'mma') return (<SportsMmaIcon/>)
}


export const occurrencesToLine = (occurrences) => {
    const array = []
    let array2 = []
    occurrences.forEach(item => {
        if(item.type.includes('1I') || item.type.includes('2I')  || item.type.includes('XI') ){
            array2.push(item)
            if(array2.length === 3) {
                array2.push("1X2 INT")
                array.push(array2)
                array2 = []
            }
        }
        if(item.type.charAt(0) === '+' || item.type.charAt(0) === '-'){
            array2.push(item)
            if(array2.length === 2) {
                array2.push("Mais / Menos")
                array.push(array2)
                array2 = []
            }
        }
        if(item.type===('KO') || item.type===('P')  || item.type===('S') || item.type===('TKO') || item.type===('D')){
            array2.push(item)
            if(array2.length === 5) {
                array2.push("Tipo vitória")
                array.push(array2)
                array2 = []
            }
        }

    })

    return array;
}

export const ocsfirstLine = (occurrences) => {
    const array = []
    array.push(occurrences.find(o => o.type === '1'))
    if(occurrences.find(o => o.type === 'X'))
        array.push(occurrences.find(o => o.type === 'X'))
    array.push(occurrences.find(o => o.type === '2'))

    return array;
}
const FiveWayBet = ({item}) => {
    console.log("item",item)
    const bets = useSelector(state => state.betReducer)
    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState('');
    useEffect(() => {
        if(bets.find(f => f === item[0].id)) setAlignment('1')
        if(bets.find(f => f === item[1].id)) setAlignment('2')
        if(bets.find(f => f === item[2].id)) setAlignment('3')
        if(bets.find(f => f === item[3].id)) setAlignment('4')
        if(bets.find(f => f === item[4].id)) setAlignment('5')
    }, [bets])
    const handleAlignment = (event, newAlignment) => {
        if(!newAlignment) {
            if (alignment === '1')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
            if (alignment === '2')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('P')).id)})
            if (alignment === '3')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('S')).id)})
            if (alignment === '4')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
            if (alignment === '5')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('D')).id)})
        }
        if(!alignment) {
            if (newAlignment === '1')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
            if (newAlignment === '2')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('P')).id)})
            if (newAlignment === '3')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('S')).id)})
            if (newAlignment === '4')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
            if (newAlignment === '5')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('D')).id)})
        }
        if(alignment && newAlignment){
            if (alignment === '1'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
                if (newAlignment === '2')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('P')).id)})
                if (newAlignment === '3')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('S')).id)})
                if (newAlignment === '4')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
                if (newAlignment === '5')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('D')).id)})
            }
            if (alignment === '2'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('P')).id)})
                if (newAlignment === '1')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
                if (newAlignment === '3')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('S')).id)})
                if (newAlignment === '4')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
                if (newAlignment === '5')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('D')).id)})
            }
            if (alignment === '3'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('S')).id)})
                if (newAlignment === '1')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
                if (newAlignment === '2')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('P')).id)})
                if (newAlignment === '4')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
                if (newAlignment === '5')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('D')).id)})
            }
            if (alignment === '4'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
                if (newAlignment === '1')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
                if (newAlignment === '2')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('P')).id)})
                if (newAlignment === '3')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('S')).id)})
                if (newAlignment === '5')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('D')).id)})
            }
            if (alignment === '5'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type===('D')).id)})
                if (newAlignment === '1')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('KO')).id)})
                if (newAlignment === '2')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('P')).id)})
                if (newAlignment === '3')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('S')).id)})
                if (newAlignment === '4')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type===('TKO')).id)})
            }
        }
        setAlignment(newAlignment);
    };
    return (
        <div style={{backgroundColor:'white', boxShadow: "5px 5px 10px 0px rgba(108,108,108,0.5)", borderRadius: 4 }}>
            <div className={"flex-container"} style={{paddingLeft:20, paddingTop:0}}>
                <div className={"flex-items"} style={{textAlign:'left', margin: 9}}>
                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', margin:5}}>
                        {item[5]}
                    </p>
                </div>
                <Divider orientation={'vertical'} flexItem={true}/>
                <div className={"flex-items"} style={{textAlign:'left', width:520}}>
                    <div className={"flex-container2"} style={{height:50}}>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            fullWidth = "true"
                        >

                            <StyledToggleButton value="1" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type===('KO')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type===('KO')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>

                            <StyledToggleButton value="2" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type===('P')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type===('P')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>

                            <StyledToggleButton value="3" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type===('S')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type===('S')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                            <StyledToggleButton value="4" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type===('TKO')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type===('TKO')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                            <StyledToggleButton value="5" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type===('D')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type===('D')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                        </ToggleButtonGroup>
                    </div>

                </div>

            </div>
        </div>
    )
}

const ThreeWayBet = ({item}) => {
    console.log(item)
    const bets = useSelector(state => state.betReducer)
    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState('');
    useEffect(() => {
        if(bets.find(f => f === item[0].id)) setAlignment('left')
        if(bets.find(f => f === item[1].id)) setAlignment('center')
        if(bets.find(f => f === item[2].id)) setAlignment('right')
    }, [bets])
    const handleAlignment = (event, newAlignment) => {
        if(!newAlignment) {
            if (alignment === 'left')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('1I')).id)})
            if (alignment === 'center')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('XI')).id)})
            if (alignment === 'right')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('2I')).id)})
        }
        if(!alignment) {
            if (newAlignment === 'left')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('1I')).id)})
            if (newAlignment === 'center')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('XI')).id)})
            if (newAlignment === 'right')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('2I')).id)})
        }
        if(alignment && newAlignment){
            if (alignment === 'left'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('1I')).id)})
                if (newAlignment === 'center')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('XI')).id)})
                if (newAlignment === 'right')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('2I')).id)})
            }
            if (alignment === 'center'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('XI')).id)})
                if (newAlignment === 'left')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('1I')).id)})
                if (newAlignment === 'right')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('2I')).id)})
            }
            if (alignment === 'right'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('2I')).id)})
                if (newAlignment === 'center')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('XI')).id)})
                if (newAlignment === 'left')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('1I')).id)})
            }
        }
        setAlignment(newAlignment);
    };
    return (
        <div style={{backgroundColor:'white', boxShadow: "5px 5px 10px 0px rgba(108,108,108,0.5)", borderRadius: 4 }}>
            <div className={"flex-container"} style={{paddingLeft:20, paddingTop:0}}>
                <div className={"flex-items"} style={{textAlign:'left', margin: 9}}>
                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', margin:5}}>
                        {item[3]}
                    </p>
                </div>
                <Divider orientation={'vertical'} flexItem={true}/>
                <div className={"flex-items"} style={{textAlign:'left', width:520}}>
                    <div className={"flex-container2"} style={{height:50}}>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            fullWidth = "true"
                        >

                            <StyledToggleButton value="left" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type.includes('1I')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type.includes('1I')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>

                            <StyledToggleButton value="center" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type.includes('XI')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type.includes('XI')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>

                            <StyledToggleButton value="right" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items2"} style={{width:241}}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type.includes('2I')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type.includes('2I')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                        </ToggleButtonGroup>
                    </div>

                </div>

            </div>
        </div>
    )
}

const TwoWayBet = ({item}) => {
    const bets = useSelector(state => state.betReducer)
    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState('');
    useEffect(() => {
        if(bets.find(f => f === item[0].id)) setAlignment('1')
        if(bets.find(f => f === item[1].id)) setAlignment('2')
    }, [bets])
    const handleAlignment = (event, newAlignment) => {
        console.log("ANTES",alignment)
        console.log("DEPOIS",newAlignment)
        if(!newAlignment) {
            if (alignment === '2')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('-')).id)})
            if (alignment === '1')
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('+')).id)})
        }
        if(!alignment) {
            console.log("YOO")
            if (newAlignment === '1')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('+')).id)})
            if (newAlignment === '2')
                dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('-')).id)})
        }
        if(alignment && newAlignment){
            if (alignment === '1'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('+')).id)})
                if (newAlignment === '2')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('-')).id)})
            }
            if (alignment === '2'){
                dispatch({type: 'REMOVEBET', payload: parseInt(item.find(o => o.type.includes('-')).id)})
                if (newAlignment === '1')
                    dispatch({type: 'INSERTBET', payload: parseInt(item.find(o => o.type.includes('+')).id)})
            }
        }
        setAlignment(newAlignment);
    };
    return (
        <div style={{backgroundColor:'white', boxShadow: "5px 5px 10px 0px rgba(108,108,108,0.5)", borderRadius: 4 }}>
            <div className={"flex-container"} style={{paddingLeft:20, paddingTop:0}}>
                <div className={"flex-items"} style={{textAlign:'left', margin: 9}}>
                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', margin:5}}>
                        {item[2]}
                    </p>
                </div>
                <Divider orientation={'vertical'} flexItem={true}/>
                <div className={"flex-items"} style={{textAlign:'left', width:520}}>
                    <div className={"flex-container2"} style={{height:50}}>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            fullWidth = "true"
                        >
                            <StyledToggleButton value="1" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items3"}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type.includes('+')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type.includes('+')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                            <StyledToggleButton value="2" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                                <div className={"flex-items3"} style={{width:327}}>
                                    <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                        <span style={{color:"grey"}}>{item.find(o => o.type.includes('-')).type} </span>
                                        {Number(Math.floor(parseFloat(item.find(o => o.type.includes('-')).odd) +'e'+2)+'e-'+2)}
                                    </p>
                                </div>
                            </StyledToggleButton>
                        </ToggleButtonGroup>
                    </div>

                </div>

            </div>
        </div>
    )
}
const MoreBets = ({lineArray}) => {

    const results = [];

    lineArray.forEach((item,index) => {
        if(item.length===4) {
            results.push(
                <ThreeWayBet item={item}/>
            )
        }
        if(item.length===3) {
            results.push(
                <TwoWayBet item={item}/>
            )
        }
        if(item.length===6) {
            results.push(
                <FiveWayBet item={item}/>
            )
        }

    })

    return results
}

export const FirstLine = ({firstLine}) => {
    const bets = useSelector(state => state.betReducer)
    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState('');
    useEffect(() => {
        if(firstLine.length === 3){
            if(bets.find(f => f === firstLine[0].id)) setAlignment('left')
            if(bets.find(f => f === firstLine[1].id)) setAlignment('center')
            if(bets.find(f => f === firstLine[2].id)) setAlignment('right')
        }
        if(firstLine.length === 2){
            if(bets.find(f => f === firstLine[0].id)) setAlignment('left')
            if(bets.find(f => f === firstLine[1].id)) setAlignment('right')
        }

    }, [bets])
    const handleAlignment = (event, newAlignment) => {
        if(!newAlignment) {
            if (alignment === 'left')
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === '1').id)})
            if (alignment === 'center')
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === 'X').id)})
            if (alignment === 'right')
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === '2').id)})
        }
        if(!alignment) {
            if (newAlignment === 'left')
                dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '1').id)})
            if (newAlignment === 'center')
                dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === 'X').id)})
            if (newAlignment === 'right')
                dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '2').id)})
        }
        if(alignment && newAlignment){
            if (alignment === 'left'){
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === '1').id)})
                if (newAlignment === 'center')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === 'X').id)})
                if (newAlignment === 'right')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '2').id)})
            }
            if (alignment === 'center'){
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === 'X').id)})
                if (newAlignment === 'left')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '1').id)})
                if (newAlignment === 'right')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '2').id)})
            }
            if (alignment === 'right'){
                dispatch({type: 'REMOVEBET', payload: parseInt(firstLine.find(o => o.type === '2').id)})
                if (newAlignment === 'center')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === 'X').id)})
                if (newAlignment === 'left')
                    dispatch({type: 'INSERTBET', payload: parseInt(firstLine.find(o => o.type === '1').id)})
            }
        }
        setAlignment(newAlignment);
    };
    if(firstLine.length === 3)
        return (
            <div className={"flex-container2"} style={{height:50}}>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    fullWidth = "true"
                >
                    <StyledToggleButton value="left" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                        <div className={"flex-items2"}>
                            <p style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                fontFamily: 'Segoe UI',
                                paddingLeft: 18
                            }}>
                                <span style={{color: "grey"}}>1 </span>
                                {Number(Math.floor(parseFloat(firstLine.find(o => o.type === '1').odd) + 'e' + 2) + 'e-' + 2)}
                            </p>
                        </div>
                    </StyledToggleButton>
                    <StyledToggleButton value="center" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                        <div className={"flex-items2"}>
                            <p style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                fontFamily: 'Segoe UI',
                                paddingLeft: 18
                            }}>
                                <span style={{color: "grey"}}>X </span>
                                {Number(Math.floor(parseFloat(firstLine.find(o => o.type === 'X').odd) + 'e' + 2) + 'e-' + 2)}
                            </p>
                        </div>
                    </StyledToggleButton>
                    <StyledToggleButton value="right" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                        <div className={"flex-items2"}>
                            <p style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                fontFamily: 'Segoe UI',
                                paddingLeft: 18
                            }}>
                                <span style={{color: "grey"}}>2 </span>
                                {Number(Math.floor(parseFloat(firstLine.find(o => o.type === '2').odd) + 'e' + 2) + 'e-' + 2)}
                            </p>
                        </div>
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    else if (firstLine.length === 2)
        return (
            <div className={"flex-container"} style={{height:50}}>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    fullWidth = "true"
                >
                    <StyledToggleButton value="left" style={{borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                        <div className={"flex-items3"}>
                            <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                <span style={{color:"grey"}}>1 </span>
                                {Number(Math.floor(parseFloat(firstLine.find(o => o.type === '1').odd) +'e'+2)+'e-'+2)}
                            </p>
                        </div>
                    </StyledToggleButton>
                    <StyledToggleButton value="right" style={{ borderRadius: 0 , textAlign: 'left', textTransform: "none"}}>
                        <div className={"flex-items3"}>
                            <p style={{fontSize:15, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft: 18}}>
                                <span style={{color:"grey"}}>2 </span>
                                {Number(Math.floor(parseFloat(firstLine.find(o => o.type === '2').odd) +'e'+2)+'e-'+2)}
                            </p>
                        </div>
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </div>
        )
}

export const StyledToggleButton = withStyles({
    root: {
        fontFamily: 'Arial',
        fontSize: '15px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '15px 15px',
        textTransform: 'none',
        width: '100%',
        '&$selected': {
            backgroundColor: 'rgba(221, 167, 79, 0.20)',
            color: 'rgb(195, 139, 42)',
            '&:hover': {
                backgroundColor: 'rgba(255, 162, 0, 0.20)',
                color: 'rgb(195, 139, 42)',
            },
        },
    },
    selected: {},
})(ToggleButton);

const TableEntry = (line) =>{

    const bets = useSelector(state => state.betReducer)
    const [occurrences,setOccurrences] = useState("")
    const [extended,setExtended] = useState(false)
    const [occurrencesLine, setOccurrencesLine] = useState([])
    const [firstLine, setFirstLine] = useState([])

    const getOccurrences = async (event) => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrences/"+event)
            setOccurrences(await response.data)
            const data = await response.data
            setOccurrencesLine(occurrencesToLine(data))
            setFirstLine(ocsfirstLine(data))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect( () => {
        getOccurrences(line.id);
        getElements(line.id);
    }, [line.id]);

    const [elements,setElements] = useState("")
    const getElements = async (event) => {
        try {
            const response = await axios.get("http://localhost:8080/getElements/"+event)
            setElements(await response.data)
        } catch (e) {
            console.log(e);
        }
    }
    if (occurrences && elements && firstLine.length > 0)
        return (
            <div>
                <Container
                    disableGutters={true}
                    maxWidth={'lg'}
                >
                    <div style={{
                        backgroundColor: 'white',
                        boxShadow: "5px 5px 10px 0px rgba(108,108,108,0.5)",
                        borderRadius: 4
                    }}>
                        <div className={"flex-container"} style={{paddingLeft: 20, paddingTop: 0}}>
                            <div className={"flex-items"} style={{textAlign: 'left'}}>
                                <p style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>
                                    {elements && elements[0].description}
                                    <span className={"dateformat"}>{moment(line.date).format('LLLL')}</span>
                                </p>
                                <p style={{fontSize: 10, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>vs</p>
                                <p style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>
                                    {elements && elements[1].description}
                                    <span className={"dateformat"}>{IconRender(line.sport)}</span>
                                </p>
                            </div>
                            <Divider orientation={'vertical'} flexItem={true}/>
                            <div className={"flex-items"} style={{textAlign: 'left', width: 400}}>
                                <p style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Segoe UI', paddingLeft: 30}}>
                                    {"1X2 TR"}
                                </p>
                                <Divider/>
                                {occurrences && elements && firstLine && <FirstLine firstLine={firstLine}/>}

                            </div>
                            <Divider orientation={'vertical'} flexItem={true}/>
                            {occurrences.length > 3 ?
                                <div className={"flex-items"} style={{textAlign: 'left', cursor: "pointer"}}
                                     onClick={() => {
                                         setExtended(!extended)
                                     }}>
                                    <p style={{
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        fontFamily: 'Segoe UI',
                                        color: '#DDA74F',
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        paddingTop: 28
                                    }}>
                                        Mais Apostas
                                    </p>
                                </div>
                                :
                                <div className={"flex-items"} style={{textAlign: 'left'}}>
                                    <p style={{
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        fontFamily: 'Segoe UI',
                                        color: '#999',
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        paddingTop: 28
                                    }}>
                                        Mais Apostas
                                    </p>
                                </div>
                            }

                        </div>
                    </div>
                </Container>
                {extended &&
                <Container disableGutters={true}
                           maxWidth={'lg'}>
                    <MoreBets lineArray={occurrencesLine}/>

                </Container>
                }
            </div>
        )
}



const NextUpTable = ({game_list}) => {
    return (
        <div style={{marginTop:100}}>
            <p style={{fontSize:25, fontWeight:'bold', fontFamily:'Segoe UI', paddingLeft:120}}>
                Próximos Eventos
            </p>

            <ul style={{listStyleType: 'none'}}>

                {game_list.map((game,index) => (
                    <li key={index} style={{paddingBottom:10}}>
                        {TableEntry(game)}
                    </li>
                ))}
            </ul>

        </div>

    );
}

export default NextUpTable;