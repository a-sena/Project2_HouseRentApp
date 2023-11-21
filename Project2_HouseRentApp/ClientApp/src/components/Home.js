import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Image, Button, Card, Grid, Icon } from 'semantic-ui-react';

export function Home() {
    
    //useState React Hooks is used to track the value in input
    //table, setTable are to insert data into
    //the "table"holds the current value of the state
    //the initial value of table is specified as null
    //the "setTable""sets that value
    
    const [table, setTable] = useState(null);
    const url = "https://localhost:5001/Apartment";
    //med hjelp av useEffect gj�r vi axious.get
    //we use axious get call. we are sending get request to url
    //"then" we set a table we create a table with response.data
    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response.data)
            setTable(response.data);
        });
    }, []);
    //if the table value is not defined, Loading is displayed on the screen.
    if (!table) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>RENT OUT YOUR HOME!</h1>
          
            {/*Create button*/}
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
            {/*semantic-ui's Card is used to display the site content meanly the apartments  in a card view*/ }
            <Card.Group itemsPerRow="3" > {/*the number of items in each row is specified as 3*/}
            {table.map((item) =>

            (
                <Card key={item.id}>


                    <Image src={item.imageUrl1} size='large' />

                <Card.Content>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <Card.Meta style={{ textAlign: 'right', marginBottom: '0'}}>{item.adress}</Card.Meta>
                            <Card.Header as='h5' style={{ textAlign: 'left', marginTop: '10px' }}>{item.name}</Card.Header>
                           

                        
                          
                        </div>

                        {/* <Card.Description>{item.description}</Card.Description>*/}
                </Card.Content>
                <Card.Content>
    
                        <div className="row">
 
                            <div className="col-4">
                                    <Icon name="home" />
                                    <span>{item.square} m&sup2;</span>
                                </div>
                            <div className="col">
                                    <Icon name="dollar sign" />
                                    <span>{item.price}</span>
                                </div>

                       </div>
                       
                            <div className="row">
                                <div className="col-4">
                                <Icon name="bed" />
                                <span>{item.numOfRooms}</span>
                            </div>
                                <div className="col">
                                <Icon name="calendar" />
                                <span>{item.firstRentalDate}</span>
                            </div>

                        </div>

                    </Card.Content>

                    <Card.Content extra>
                        <div className="row">
                            <div className="col-md-4">
                                <Link to={`/${item.id}`}>
                                    <Button

                                        name={table.id}

                                        color="blue"


                                        fluid > View </Button> </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={`/update/${item.id}`}>
                                    <Button

                                        name={item.id}
                                        color="grey"

                                        fluid > Edit </Button></Link>
                            </div>
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
