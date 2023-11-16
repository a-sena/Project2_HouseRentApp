

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {  Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";


export function Delete() {

 
    const { id } = useParams();
    console.log(id);
   
  

    const [data, setData] = useState({});

   
    const navigate = useNavigate();


    useEffect(() => {
        
            var apartmentId = parseInt(id, 10);
            axios.get("https://localhost:5001/Apartment/" + apartmentId)
                .then(
                    res => {
                      
                        setData(prevData => ({ ...prevData, ...res.data }));
                      
                       
                        

                    })

                .catch(err => console.log(err));
       
    },[id]);

   
   
        console.log("Updated Data:", data);
    
    const handleDelete = (id) => {
        axios.delete(`https://localhost:5001/Delete/${id}`)
           
               
            .catch((error) => {
                console.error('Error deleting apartment:', error);
               // toast.error('Error deleting apartment');
            });

        console.log(`House with ID ${id} deleted successfully.`);
        navigate(`/`);

    };


               
           
        
    
    return(
    <div className="container py-4">
        <Link className="btn btn-primary" to="/">
            back to Home
        </Link>
        <h1 className="display-4">Apartment id: {id}</h1>

            <ul className="list-group w-50">
              
                    <li className="list-group-item">Name: {data.name}</li>
                    <li className="list-group-item">Address: {data.adress}</li>
                    <li className="list-group-item">Price: {data.price}</li>
                    <li className="list-group-item">Square: {data.square}</li>
                    <li className="list-group-item">FirstRentalDate: {data.firtsRentalDate}</li>
                    <li className="list-group-item">NumOfRooms: {data.numOfRooms}</li>
            

            <Button

                name={data.id}
                color="red"
                    onClick={() => handleDelete(data.id)}
                    fluid > Delete
                </Button>

        </ul>

        </div>
    )
}
