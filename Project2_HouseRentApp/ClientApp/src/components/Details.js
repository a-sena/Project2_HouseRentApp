import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Image, Button, Card, Grid, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

export function Details() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get("https://localhost:5001/Apartment/" + id)
            .then(res => setDetails(res.data))

            .catch(err => console.log(err))

    }, [id]);

    return (
        <div style={{ width: '50%', float: 'left' }}>
        <Carousel >

            <div >
                <Image src={details.imageUrl1} />
                <p className="legend">Picture of House</p>
            </div>
            <div>
                <Image src={details.imageUrl2} />
                <p className="legend">Living Room</p>
            </div>
            <div>
                <Image src={details.imageUrl3} />
                <p className="legend">Kitchen</p>
            </div>
            <div>
                <Image src={details.imageUrl4}  />
                <p className="legend">Restroom</p>
            </div>
            <div>

                <Image src={details.imageUrl5}  />
                <p className="legend">Bathroom</p>
            </div>
            </Carousel>
        </div>
    );

}
export default Details;
