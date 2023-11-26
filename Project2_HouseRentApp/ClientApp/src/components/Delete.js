

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {  Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * The `Delete` component is responsible for deleting an apartment listing.
 * It fetches the apartment details based on the ID from the URL and presents them to the user.
 * Upon confirmation, it sends a DELETE request to the server to remove the apartment.
 *
 * @returns A React element that displays the apartment's details with a delete confirmation button.
 */
export function Delete() {

 //useParams gets the ID from the website's route
    const { id } = useParams();
    console.log(id);
   
  
    //useState React Hooks is used to track the data value
    //the initial value of data is specified as empty
    const [data, setData] = useState({});

   //to navigate back to home page React useNavigation Hook is used
    const navigate = useNavigate();

// We used useEffect to axious http get call. we are sending get request to url with spesific apartment id
//In this way, information about a specific apartmant is obtained from the server 
    useEffect(() => {
        
            var apartmentId = parseInt(id, 10); //Converting the id variable to integer
            axios.get("https://localhost:5001/Apartment/" + apartmentId)
            .then(res => {setData(res.data); 
                })
                //If an error occurs during the "then"", error is catched.
            .catch((err) => {
                 //Error message is printed to the console
                 console.error("Error:", err);
                 

            });
       },[id]);

   
   
    console.log("This apartment is about to be deleted", data);

    /**
     * Sends a DELETE request for the specified apartment ID.
     * After a successful delete, it navigates back to the home page.
     *
     * @param {number} id - The ID of the apartment to be deleted.
     */
    
    const handleDelete = (id) => {
        //Delete request with axious
        try {
            axios.delete(`https://localhost:5001/Delete/${id}`)


        } catch (error) {
            //Error message is printed to the console
            console.log('Error deleting apartment:', error);
            // Error message is displayed to the user with toastify error
            toast.error('Error deleting apartment');
        }
    

        alert("The apartment  is deleted successfully.");
        navigate("/");

    };


               
           
        
    
    return(
    <div className="container py-4">

        <h1 className="display-4">Apartment id: {id}</h1>

            <ul className="list-group w-50">
              
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>Name:</span> {data.name}</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>Address: </span>{data.adress}</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>Price:</span> $ {data.price}</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>Square:</span> {data.square} m&sup2;</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>FirstRentalDate:</span> {data.firstRentalDate}</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>NumOfRooms:</span> {data.numOfRooms}</li>
                <li className="list-group-item"><span style={{ fontWeight: "bold" }}>Description:</span> {data.description}</li>
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

                            fluid> Back to Home Page</Button>
                    
                </Link>
                </div>
            </div>
        </div>
    )
}
