import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Image, Button, Card, Icon } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function Home() {
    
    //useState React Hooks is used to track the value in input
    //table, setTable are to insert data into
    //the "table"holds the current value of the state
    //the initial value of table is specified as null
    //the "setTable""sets that value
    
    const [table, setTable] = useState(null);
    /*Used source while implementing filtering apartments :https://dev.to/alais29/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm */
    const [filteredApartments, setFilteredApartments] = useState([]);
   
    const url = "https://localhost:5001/Apartment"; //this URL must match the Route value in the controller

    //we use axious get call using useEffect. we are sending get request to url
    //"then" we set a table we create a table with response.data

    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response.data)// the response is logged using console.log
            setTable(response.data);
            // update the filteredApartments state
            setFilteredApartments(response.data);
        
        })
 
        //If an error is encountered, the catch block is executed
            .catch((error) => {
                //Error message is written to the console,console logging
                console.error('Error :', error);
                // Error message is displayed to the user with toastify error
                toast.error('Error deleting apartment');
            });
    }, []);
    //if the table value is not defined, Loading is displayed on the screen.
    if (!table) {
        return <div>Loading...</div>;
    }
    /* Filter apartments by name */
    function onChange(e) {
        const value = e.target.value
        setFilteredApartments(table.filter(table => table.name.toLowerCase().includes(value.toLowerCase()))
        )
        
    }
    return (
        <div>
            <h1>Explore and manage your property listings easily with HouseRent App.</h1>
            <h3> <i> Your number one destination for rental postings! </i></h3>
          
            {/*"Create" button*/}
            <div style={{ marginBottom: '20px' }} className="col-md-2">
                
                <Link to={"/create"}>
                    <Button
                        
                        name={table.id}
                        size="huge"
                        color="green"
                       

                        fluid > <Icon name='plus' />  
                         Create 
                         </Button> </Link>
            </div>
  

            <h2>Houses published by you:</h2>
            <hr />
            {/*used source to create input field for search : https://react.semantic-ui.com/elements/input/#variations-icon */ }
            <div class="ui icon input" style={{ marginBottom:'40px' }}>
            <input onChange={onChange} type="search" placeholder="Search apartment..."></input>
                <i aria-hidden="true" class="search icon"></i>
            </div>
               {/*semantic-ui's Card is used to display the site content meanly the apartments  in a card view*/ }
            <Card.Group itemsPerRow="3" > {/*the number of items in each row is specified as 3*/}
                {/*map() is used to loop all the houses in the database.*/}
                {filteredApartments.map((item) =>

            (
                <Card key={item.id}>


                    <Image src={item.imageUrl1} size='large' />

                <Card.Content>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <Card.Meta style={{ textAlign: 'right', marginBottom: '0'}}>{item.adress}</Card.Meta>
                            <Card.Header as='h5' style={{ textAlign: 'left', marginTop: '10px' }}>{item.name}</Card.Header>
                           

                        
                          
                        </div>

                       
                </Card.Content>
                <Card.Content>
                        {/* Information about house size,number of rooms, first rental date, price is also addded on the each card*/ }
                        <div className="row">
                            {/* Information about house size*/}
                            <div className="col-4">
                                    <Icon name="home" />
                                    <span>{item.square} m&sup2;</span>
                            </div>
                            {/* Information about price*/}
                            <div className="col">
                                    <Icon name="dollar sign" />
                                    <span>{item.price}</span>
                                </div>

                       </div>
                        {/* Information about number of rooms*/}
                            <div className="row">
                                <div className="col-4">
                                <Icon name="bed" />
                                <span>{item.numOfRooms}</span>
                            </div>
                            {/* Information about first rental date*/}
                                <div className="col">
                                <Icon name="calendar" />
                                <span>{item.firstRentalDate}</span>
                            </div>

                        </div>

                    </Card.Content>

                    <Card.Content extra>
                        {/* View button that directs the user to the details page*/}
                        <div className="row">
                            <div className="col-md-4">
                                <Link to={`/${item.id}`}>
                                    <Button

                                        name={table.id}

                                        color="blue"


                                        fluid > View </Button> </Link>
                            </div>
                            {/* Edit button that directs users to the page where they can update their home listings*/}
                            <div className="col-md-4">
                                <Link to={`/update/${item.id}`}>
                                    <Button

                                        name={item.id}
                                        color="grey"

                                        fluid > Edit </Button></Link>
                            </div>
                            {/* Delete button that directs users to the page where they can delete their home listing*/}
                                    <div className="col-md-4">
                                <Link to={`/delete/${item.id}`}>
                                    <Button

                                        name={item.id}
                                        color="red"
                                       
                                        fluid > Delete</Button></Link>

                            </div>
                        </div>
                    </Card.Content>

            </Card>
        ))}
    </Card.Group>
        </div>
    );
}
