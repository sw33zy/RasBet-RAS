import React, {useEffect, useState} from 'react'
import './Pagination.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {

    const pageNumbers = []
    const [selected, setSelected] = useState('')
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const RenderNumber = ({number}) => {
        if (number === currentPage) {
            return (
                <div className="pagination-number-selected">
                    {number}
                </div>
            )
        } else {
            return (
                <div className="pagination-number">
                    {number}
                </div>
            )
        }
    }

    const [hovered, setHovered] = useState(false)

    const PrevButton = ({ hover }) => {

        const styleNormal = { color: "#DDA74F", marginRight: "-8px"}

        const styleHovered = { color: "white", marginRight: "-8px"}

        if (hover) {
            return (
                <ArrowBackIosIcon sx={styleHovered}/>
            )
        } else {
            return (
                <ArrowBackIosIcon sx={styleNormal}/>
            )
        }
    }

    const NextButton = ({ hover }) => {

        const styleNormal = { color: "#DDA74F"}

        const styleHovered = { color: "white"}

        if (hover) {
            return (
                <ArrowForwardIosIcon sx={styleHovered}/>
            )
        } else {
            return (
                <ArrowForwardIosIcon sx={styleNormal}/>
            )
        }
    }

    return (
        <nav>
            <div className="pagination" >
                <ul style={{ float: 'right', paddingRight:120}}>
                    {(currentPage !== 1) &&
                        <div className="pagination-icons"
                             onMouseEnter={() =>
                                 setHovered(true)
                             }
                             onMouseLeave={() =>
                                 setHovered(false)
                             }
                             onClick={() => {
                                 paginate(currentPage - 1);
                                 if (currentPage !== 1) {
                                     setHovered(false);
                                 }
                             }}
                        >
                            <PrevButton hover={hovered}/>
                        </div>
                    }
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => paginate(number)}>
                            <RenderNumber number={number}/>
                        </li>
                    ))}
                    {(currentPage < pageNumbers.length) &&
                        <div className="pagination-icons"
                             onMouseEnter={() =>
                                 setHovered(true)
                             }
                             onMouseLeave={() =>
                                 setHovered(false)
                             }
                             onClick={() => {
                                 paginate(currentPage + 1);
                                 if (currentPage === pageNumbers.length) {
                                     setHovered(false);
                                 }
                             }}
                        >
                            <NextButton hover={hovered}/>
                        </div>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Pagination