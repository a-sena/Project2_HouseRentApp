import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Image, Button, Card, Grid, Icon } from 'semantic-ui-react';

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
        <div className="container">


            <div className='container p-5'>
                <p>WELCOME USER THIS IS DETAILS PAGE</p>
                <Image src={details.imageUrl1} size='medium' />
                <div>
                    <Icon name="home" />
                    <span>{details.square} m&sup2;</span>
                </div>
                <div>
                    <Icon name="dollar sign" />
                    <span>{details.price}</span>
                </div>
                <Link to={`https://localhost:5001/`}>
                    <Button


                        color="grey"

                        fluid > Back </Button></Link>
            </div>

        </div>
    );
}

export default Details; 