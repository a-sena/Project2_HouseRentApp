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
        return null;
    }

    return (
        <Card.Group itemsPerRow="3" >
            {table.map((item) =>

            (
                <Card key={item.id}>


                    <Image src={item.imageUrl1} size='medium' />

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

                    <Button.Group widths={3}>
                       
                    
                        <Link to={`/${item.id}`}>
                            <Button                        
                            
                            name={table.id}
                     
                            color="ui blue button"
                                
                  
                                fluid > View </Button> </Link>
                        <Link to={`/${item.id}`}>
                        <Button
                            
                            name={item.id}
                            color="ui grey button"
                          
                                fluid > Edit </Button></Link>

                        <Link to={`/${item.id}`}>
                        <Button
                            
                            name={item.id}
                            color="ui red button"
                           
                            fluid > Delete</Button></Link>
                        
                    

                </Button.Group>

            </Card>
        ))}
    </Card.Group>
       
    );
}
