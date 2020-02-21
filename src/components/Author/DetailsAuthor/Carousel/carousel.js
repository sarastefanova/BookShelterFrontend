import Carousel from 'react-bootstrap/Carousel';
import React,{useState,useEffect} from "react";
import axios from "../../../../cutom-axios/axios";
import './carouselBooksAuthor.css';
import {Link} from "react-router-dom";
function ControlledCarousel(props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [allBooksAuthor,setAllBooksAuthor]=useState({});
    useEffect(()=>{

            axios.get("/books/getAllBooksByAuthor/"+props.nameAndSurname).then((data)=>{
                setAllBooksAuthor(data.data)
            })

    },[])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

        // console.log(allBooksAuthor)

    const booksArray = Object.values(allBooksAuthor);
    const booksAuthor =booksArray.map((item) =>
        <Carousel.Item key={item.name}>
            <Link to={"/detailsBook/"+item.name}>
            <img
                className="d-block w-100 carouselBooksImg"
                src={`data:image/jpeg;base64,${item.file}`}

                alt="First slide"
            />
            </Link>
            <Carousel.Caption>
                <h3>{item.name}</h3>
                {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
            </Carousel.Caption>
        </Carousel.Item>

    );

    return (




        <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
            {booksAuthor}
        </Carousel>



    );
}

export default ControlledCarousel;