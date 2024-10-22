﻿import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Image, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * The `Details` component fetches and displays the detailed information of a specific apartment.
 * It uses the `useParams` hook to retrieve the apartment ID from the URL, which is then used
 * to make an API call to fetch the apartment's details. It displays a carousel of images of the apartment
 * and various details like address, description, size, price, number of rooms, and the first rental date.
 *
 * @component
 * @returns {React.ReactElement} The Details component with apartment details and images.
 */
export function Details() {
    //useParams is used to access id parameter from the URL
    const { id } = useParams()
  
    //details, setDetails are to insert data into
    //the "details"holds the current value of the state
    //the initial value of details is specified as empty
    //the "setDetails" is a function to update the current state 
    const [details, setDetails] = useState({});

    useEffect(() => {
        //axious http get call
        axios.get("https://localhost:5001/Apartment/" + id)
            .then(res => setDetails(res.data))
            //If an error is encountered, the catch block is executed
            .catch((err) => {
              //Error message is printed to the console
                console.log("Error:", err);
                // Error message is displayed to the user with toastify error
                toast.error(`Error: ${err.message}`);
            });
    }, [id]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', float: 'left' }}>
            {/*react-responsive-carousel hook is used to create slide show with pictures of apartment*/}
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
