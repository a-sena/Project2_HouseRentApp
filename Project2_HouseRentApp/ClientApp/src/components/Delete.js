

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {  Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";


export function Delete() {

 //useParams gets the ID from the website's route,
    const { id } = useParams();
    console.log(id);
   
  
    //useState React Hooks is used to track the data value
    //the initial value of data is specified as null
    const [data, setData] = useState({});

   //to navigate back to home page React useNavigation Hook is used
    const navigate = useNavigate();

// We used useEffect to axious http get call. we are sending get request to url with spesific apartment id
//In this way, information about a specific apartmant is obtained from the server 
    useEffect(() => {
        
            var apartmentId = parseInt(id, 10); //Converting the id variable to integer
            axios.get("https://localhost:5001/Apartment/" + apartmentId)
            .then(res => {setData(prevData => ({ ...prevData, ...res.data })); //spread operation is used to object merging
                })
            .catch(err => console.log(err)); //if an error ocuurs, catch the error and write on the console.
       },[id]);

   
   
    console.log("This apartment is about to be deleted", data);
    
    const handleDelete = (id) => {
        //Delete request with axious
        axios.delete(`https://localhost:5001/Delete/${id}`)
           
               
            .catch((error) => {
                console.error('Error deleting apartment:', error);
               // toast.error('Error deleting apartment');
            });

        console.log("The apartment is deleted successfully.");
        navigate("/");

    };


               
           
        
    
    return(
    <div className="container py-4">

        <h1 className="display-4">Apartment id: {id}</h1>

            <ul className="list-group w-50">
              
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Name:</span> {data.name}</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Address: </span>{data.adress}</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Price:</span> $ {data.price}</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Square:</span> {data.square} m&sup2;</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>FirstRentalDate:</span> {data.firstRentalDate}</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>NumOfRooms:</span> {data.numOfRooms}</li>
                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Description:</span> {data.description}</li>
            </ul>

            <div className="row" style={{ marginLeft: '60px', marginTop: '20px' }}>
                <div className="col-2">
            <Button

                name={data.id}
                color="red"
                    onClick={() => handleDelete(data.id)}
                    fluid > Delete
                    </Button>
                </div>
                <div className="col-2">

                    <Link to="/">
                        <Button
                            name={data.id}
                            color="grey"

                            fluid> Back to Home</Button>
                    
                </Link>
                </div>
            </div>
        </div>
    )
}
