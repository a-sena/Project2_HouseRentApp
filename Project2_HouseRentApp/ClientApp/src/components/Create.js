
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






export default function Create() {

    let [selectedApartement, setSelectedApartment] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        //sending get request
        //used source for get request:
   //https://stackabuse.com/get-http-request-in-react/
        if (id) {
            var apartmentId = parseInt(id, 10);
            axios.get("https://localhost:5001/Apartment/" + apartmentId)
                .then( 
                    res => {
                        setData(res.data) 
                        console.log(selectedApartement)
                        console.log(res.data);

                    })

                .catch(err => console.log(err));
        } else {
            setSelectedApartment(null);
        }

    }, [id]);
//The states are initialized as empty
    const initialValues = {
        id: 0,
        name: '',
        address: '',
        price: 0,
        square: 0,
        firstRentalDate: '',
        numOfRooms: 0,
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        imageUrl4: '',
        description: ''
    };

    console.log("init", initialValues)
    // useState React Hooks is used to track the value in input
    //the "data"holds the current value of the state
    //the "setData""sets that value
    const [data, setData] = useState(initialValues);




    const handleChange = (e) => {
        const newData = { ...data };
        // e.target.value = The target value is the value the user enters in the input field
        newData[e.target.id] = e.target.value; //the value of the targetted element
        setData(newData);//updating the state by taking newData
        console.log(newData);
    };

    const validation = () => {
    //React-toastify for input validation 
        if (!data.name) {
            toast.error('name is required')
            return false;
        }
        if (!data.adress) {
            toast.error('adress is required')
            return false;
        }
        if (!data.description) {
            toast.error('description is required')
            return false;
        }
        if (!data.firstRentalDate) {
            toast.error('FirstRentalDate is required')
            return false;
        }
        if (!data.imageUrl1) {
            toast.error('ImageUrl1 is required')
            return false;

        }
        if (!data.numOfRooms || data.numOfRooms < 1 || data.numOfRooms > 9) {
            toast.error('the RoomNumber must be between 1 and 9');
            return false;
        }
        if (!data.price || data.price < 1) {
            toast.error('the Price must be positive');
            return false;
        }
        if (!data.square || data.square < 0) {
            toast.error('Square must be positiv number');
            return false;
        }
        return true;
    }
    //It is stated what will happen after pressing the Update button with the handleSubmit function.
    const handleSubmit = async (e) => {
        e.preventDefault();
        //if data is not found the error message is written on the console
        if (!data) {
            console.error('data object is null');
            return;
        }
        //if validation is faild the error message is written on the console
        if (!validation()) {
            console.error('Form validation failed.');
            return;
        }
        //if validation is succeded the data is written on the console
        console.log(data);
        try {
      
     //used source for post reques: https://blog.logrocket.com/how-to-use-axios-post-requests/
                const url = "https://localhost:5001/Create"
     //sending HTTP POST request 
                axios.post(url, data).then(response => {
                    console.log(response.data);
                    // alert("data posted successfully");
                    navigate(`/`);

                })

            }

        catch (error) {

            console.error('Error creating apartment:', error);
            toast.error('Error creating apartment');
        }
    };

    if (!data && id) {
        return <div>loading...</div>
    }

    return (
        <div>

            <div>
                <h2>Create New Apartment</h2>
                <form className="create-form" onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Name</label>
                            <span className="text-danger">*</span>

                            <input type="text" id='name' value={data.name}
                                onChange={handleChange} className="form-control" /> {/*//with onChange we setting and tracking the value */}

                        </div>
                        <div className="form-group col-6">
                            <label>Address</label>

                            <input type="text" id="adress" value={data.adress}
                                onChange={handleChange} className="form-control" />

                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Price</label><span className="text-danger">*</span>
                            <input type="number" id="price" value={data.price}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Square</label><span className="text-danger">*</span>
                            <input type="number" id="square" value={data.square}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>First Rental Date</label><span className="text-danger">*</span>
                            <input type="text" id="firstRentalDate" value={data.firstRentalDate}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Number of Rooms</label><span className="text-danger">*</span>
                            <input type="number" id="numOfRooms" value={data.numOfRooms}
                                onChange={handleChange} className="form-control" />

                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Image URL 1</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl1" value={data.imageUrl1}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 2</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl2" value={data.imageUrl2}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 3</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl3" value={data.imageUrl3}
                                onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 4</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl4" value={data.imageUrl4}
                                onChange={handleChange} className="form-control" />

                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" id="description" value={data.description}
                            onChange={handleChange} className="form-control" />

                    </div>

                    <br />
                    <button type="submit" className="btn btn-primary">Create</button>
                    <a href="/" className="btn btn-secondary">Back</a>
                </form>

            </div>
            <ToastContainer />
        </div>

    )
}
