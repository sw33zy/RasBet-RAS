import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/carousel1.png"
import img2 from "../assets/carousel2.jpeg"
import img3 from "../assets/carousel3.jpeg"
import img4 from "../assets/carousel4.jpeg"
import {Container, Divider} from "@material-ui/core";
import './carousel.css';
import axios from "axios";
import {occurrencesToLine, IconRender, StyledToggleButton, ocsfirstLine, FirstLine} from './NextUpTable.js'
import moment from "moment";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {useSelector , useDispatch} from "react-redux";

const Table1X2 = (line) =>{
    const [occurrences,setOccurrences] = useState("")
    const [occurrencesLine, setOccurrencesLine] = useState([])
    const [firstLine, setFirstLine] = useState([])

    const getOccurrences = async (event) => {
        try {
            const response = await axios.get("http://localhost:8080/getOccurrences/"+event)
            console.log("ocs",await response.data)
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
            console.log("elms",await response.data)
            setElements(await response.data)
        } catch (e) {
            console.log(e);
        }
    }
    if (occurrences && elements && firstLine.length > 0) {
        return (
            <Container fixed className={"Card"}>
                <div style={{
                    backgroundColor: 'white',
                    boxShadow: "5px 5px 10px 0px rgba(108,108,108,0.5)",
                    borderRadius: 4
                }}>
                    <div className={"flex-container"} style={{paddingLeft: 20}}>
                        <div className={"flex-items"} style={{textAlign: 'left'}}>
                            <p style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>
                                {elements[0].description}
                                <span className={"dateformat"}>{moment(line.date).format('LLLL')}</span>
                            </p>
                            <p style={{fontSize: 10, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>vs</p>
                            <p style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI', margin: 5}}>
                                {elements[1].description}
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

                    </div>
                </div>
            </Container>
        )
    }


}



const LandingCarousel = ({ list_users }) => {

        return (
            <div>
            <Carousel
                infiniteLoop
                autoPlay={true}
                swipeable={true}
                emulateTouch
                showThumbs={false}
                showStatus={false}
                showArrows={false}
            >
                <div>
                    <div className={"carousel-content"}>
                        <p className={"carousel-title"}>Jogo do Dia</p>
                        <p className={"carousel-description"}> {list_users[0].description}</p>
                    </div>
                    <img src={img1}/>
                    {Table1X2(list_users[0])}
                </div>
                <div>
                    <div className={"carousel-content"}>
                        <p className={"carousel-title"}>Jogo do Dia</p>
                        <p className={"carousel-description"}> {list_users[1].description}</p>
                    </div>
                    <img src={img2}/>
                    {Table1X2(list_users[1])}
                </div>
                <div>
                    <div className={"carousel-content"}>
                        <p className={"carousel-title"}>Jogo do Dia</p>
                        <p className={"carousel-description"}> {list_users[2].description}</p>
                    </div>
                    <img src={img3}/>
                    {Table1X2(list_users[2])}
                </div>
                <div>
                    <div className={"carousel-content"}>
                        <p className={"carousel-title"}>Jogo do Dia</p>
                        <p className={"carousel-description"}> {list_users[3].description}</p>
                    </div>
                    <img src={img4}/>
                    {Table1X2(list_users[3])}
                </div>
            </Carousel>

            </div>


        );

}


export {Table1X2, LandingCarousel};