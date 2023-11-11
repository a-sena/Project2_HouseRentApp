import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
export function Details() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState([]);

     useEffect(() => {
         axios.get("https://localhost:5001/Apartment/" + id)
         .then(res => setDetails(res.data))
         
         .catch(err => console.log(err))
    
     } , []);
    return (
        <div className="container">

        
            <div className='container p-5'>
                <p>{details.id}</p>
                <p>{details.price}</p>
                <p>{details.description}</p>
                <Link to="/">Back</Link>
            </div>

        </div>
    );
}

