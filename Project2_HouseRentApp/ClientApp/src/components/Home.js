import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Image, Button, Card, Grid, Icon } from 'semantic-ui-react';

export function Home() {
    const [table, setTable] = useState(null);
    const url = "https://localhost:5001/Apartment";

    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response.data)
            setTable(response.data);
        });
    }, []);

    if (!table) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>RENT OUT YOUR HOME!</h1>
            <h2>Hi Admin</h2>

            <div style={{marginBottom: '20px'}} class="col-md-1">
                <Link to={"/create"}>
                    <Button
                        
                        name={table.id}

                        color="green"
                       

                        fluid > + Create </Button> </Link>
            </div>
  

            <h3>Houses published by you:</h3>
            <hr />
        <Card.Group itemsPerRow="3" >
            {table.map((item) =>

            (
                <Card key={item.id}>


                    <Image src={item.imageUrl1} size='large' />

                <Card.Content>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <Card.Header style={{ textAlign: 'right', marginBottom: '0', fontStyle:'italic' }}>{item.adress}</Card.Header>
                            <Card.Header as='h5' style={{ textAlign: 'left', marginTop: '10px' }}>{item.name}</Card.Header>
                           

                        
                          
                        </div>

                        {/* <Card.Description>{item.description}</Card.Description>*/}
                </Card.Content>
                <Card.Content>
    
                        <Grid columns={2}>
 
                                <div>
                                    <Icon name="home" />
                                    <span>{item.square} m&sup2;</span>
                                </div>
                                <div>
                                    <Icon name="dollar sign" />
                                    <span>{item.price}</span>
                                </div>

                        </Grid>
                        <Grid columns={2}>

                            <div>
                                <Icon name="bed" />
                                <span>{item.numOfRooms}</span>
                            </div>
                            <div>
                                <Icon name="calendar" />
                                <span>{item.firstRentalDate}</span>
                            </div>

                        </Grid>

                    </Card.Content>

                    <Card.Content extra>
                        <div class="row">
                            <div class="col-md-4">
                                <Link to={`/${item.id}`}>
                                    <Button

                                        name={table.id}

                                        color="blue"


                                        fluid > View </Button> </Link>
                            </div>
                                <div class="col-md-4">
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
