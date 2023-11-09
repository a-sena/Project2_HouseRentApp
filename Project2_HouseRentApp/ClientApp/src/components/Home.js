import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Image, Button, Card, Grid, Icon } from "semantic-ui-react";

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
        <Card.Group itemsPerRow="5" >
            {table.map((item) =>

            (
                <Card key={item.id}>


                    <Image src={item.imageUrl1} size='medium' />

                <Card.Content>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Card.Header style={{ flex: 1 }}>{item.name}</Card.Header>

                        
                          
                        </div>

                        <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Grid columns={2}>
                        <Grid.Column>
                                <Icon name="dollar sign" />
                                <span>{item.price}</span>
                        </Grid.Column>
                       
                    </Grid>
                </Card.Content>
                    <Button.Group widths={3}>
                       
                    
                        <Link to={`/${item.id}`}>
                            <Button                        
                            basic
                            name={table.id}
                     
                            color="green"
                            icon="info circle"
                  
                            fluid > View </Button> </Link>
                        <Button
                            basic
                            name={item.id}
                            color="red"
                            icon="trash"
                            fluid > Edit </Button>


                        <Button
                            basic
                            name={item.id}
                            color="red"
                            icon="trash"
                            fluid > Delete</Button>
                        
                    

                </Button.Group>

            </Card>
        ))}
    </Card.Group>
       
    );
}
