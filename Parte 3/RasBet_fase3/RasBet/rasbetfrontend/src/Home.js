import {useEffect, useState} from "react";
import axios from "axios";
import {LandingCarousel} from "./Components/carousel";
import NextUpTable from "./Components/NextUpTable";
import Pagination from '@mui/material/Pagination';
import moment from "moment";
import locale from 'moment/locale/pt';


const Home = () => {
    moment.locale('pt');
    const [events,setEvents] = useState("")
    const getEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/listEvents")
            console.log(await response.data)
            setEvents(await response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

    //if(indexOfLastPost + postsPerPage > events.length) setPostsPerPage(events.length-indexOfLastPost)
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    // Similar to componentDidMount and componentDidUpdate:
     useEffect( () => {
         getEvents();
     }, []);

    //if(indexOfLastPost + postsPerPage > events.length) setPostsPerPage(events.length-indexOfLastPost)
    const carrousel_games = []
    if(events.length > 0){
        carrousel_games.push(events[Math.floor(Math.random() * events.length)])
        carrousel_games.push(events[Math.floor(Math.random() * events.length)])
        carrousel_games.push(events[Math.floor(Math.random() * events.length)])
        carrousel_games.push(events[Math.floor(Math.random() * events.length)])
    }

    return (
        <div>
            {carrousel_games.length > 0 && <LandingCarousel list_users={carrousel_games}/>}
            {events && <NextUpTable game_list={events}/>}
            {/*<Pagination color='secondary' count={Math.ceil(events.length / postsPerPage)} page={currentPage} onChange={(event,val)=> setCurrentPage(val)}/>*/}

            {/*<Pagination*/}
            {/*    postsPerPage={postsPerPage}*/}
            {/*    totalPosts={events.length}*/}
            {/*    paginate={paginate}*/}
            {/*    currentPage={currentPage}*/}
            {/*/>*/}
        </div>
    )
}

export default Home;