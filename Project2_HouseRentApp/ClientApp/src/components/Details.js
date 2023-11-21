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
        <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', float: 'left' }}>
            {/*Used source for Carousel: https://medium.com/@isabellepino/package-for-react-carousel-31aac8b1f090  */ }
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

            </Carousel>
        </div>
            <div style={{ width: '50%', float: 'left', padding: '20px' }}>
                <h1 style={{ textAlign: 'left', marginBottom: '0' }}>{details.name}</h1>

                <p style={{ textAlign: 'left', marginBottom: '10px', marginTop: '0', fontStyle: 'italic' }}>{details.adress}</p>

                <p style={{ marginBottom: '30px', marginTop: '10px',fontSize: '16px'  }} >{details.description}</p>
                <div className="row">
                    <div className="col-4">
                        <Icon name="home" />
                        <span style={{ fontSize: '20px' }}>{details.square} m&sup2;</span>
                    </div>
                    <div className="col">
                        <Icon name="dollar sign" />
                        <span style={{ fontSize: '20px' }}>{details.price}</span>
                    </div>
                    </div>
                <div className="row">
                    <div className="col-4">
                        <Icon name="bed" />
                        <span style={{ fontSize: '20px' }}>{details.numOfRooms}</span>
                    </div>
                    <div className="col">
                        <Icon name="calendar" />
                        <span style={{ fontSize: '20px' }}>{details.firstRentalDate}</span>
                    </div>
</div>
            </div>
        </div>
    );

}
export default Details;
