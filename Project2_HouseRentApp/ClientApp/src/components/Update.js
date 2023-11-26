
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






export default function Update() {

    let [selectedApartement, setSelectedApartment] = useState(null);
    //useParams gets the ID from the website's route, 
    //for example, when redirected to the update page of a specific apartment, the ID of that apartment is retrieved
    const { id } = useParams();
    //to navigate back to home page React useNavigation Hook is used
    const navigate = useNavigate();

     //we use axious get call using useEffect. we are sending get request to url with spesific apartment id
    //"then" we set data, we create a data with response.data
    useEffect(() => {
        //if id is found
        if (id) {
            var apartmentId = parseInt(id, 10); //Converting the id variable to integer
            axios.get("https://localhost:5001/Apartment/" + apartmentId) //http get request
                .then(
                    res => {
                        setData(res.data)
                        console.log(selectedApartement) //information about selected apartmant is printed on console
                        console.log(res.data);// the response is logged using console.log

                    })
                //If an error occurs during the "then"", error is catched.
                .catch((err) => {
                    //Error message is printed to the console
                    console.error("Error:", err);
                    console.log("Error:", err);
                    // Error message is displayed to the user with toastify error
                    toast.error(`Error: ${err.message}`);
                });

        }
        //if id is not found
        else {
            setSelectedApartment(null);
        }

    }, [id]);

    //the initials values of attributes are defined
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
    //the "setData"sets that value
    //the initial value of data is specified as null,(values in the initialValues variable)
    const [data, setData] = useState(initialValues);



    const handleChange = (e) => {
        const newData = { ...data };
        // e.target.value = The target value is the value the user enters in the input field
        newData[e.target.id] = e.target.value; //the value of the targetted element
        setData(newData);//updating the state by taking newData
        console.log(newData);
    };
     //React-toastify is used for input validation 
    const validation = () => {
        //React-toastify for input validation 
        
        if (!data.name) {
            console.error('Name is required')
            toast.error('Name is required')
            return false;
        }
        if (!data.adress) {
            console.error('Adress is required')
            toast.error('Adress is required')
            return false;
        }
        const correctAdresFormat = /^[\w\såøæ]+,\s+[\w\såøæ]+,\s+\d{4}$/;
        //Example: Elias kræmmersvei, Drammen, 3023
        if (!correctAdresFormat.test(data.adress)) {
            console.error("This is not correct format of an adress:", data.adress);
            toast.error("The adress should be in Street Name, City, Zip Code format.");
            return;
        }
        if (!data.price || data.price < 1) {
            console.error('the Price must be positive');
            toast.error('the Price must be positive');
            return false;
        }
        if (!data.square || data.square < 0) {
            console.error('Square must be positiv number');
            toast.error('Square must be positiv number');
            return false;
        }

        if (!data.firstRentalDate) {
            console.error('FirstRentalDate is required')
            toast.error('FirstRentalDate is required')
            return false;
        }
        const checkDateFormat = /^\d{2}\.\d{2}\.\d{4}$/;

        if (!checkDateFormat.test(data.firstRentalDate)) {
            console.error("Invalid date format");
            toast.error("Please enter a valid date in the format DD.MM.YYYY");
            return;
        }
        if (!data.numOfRooms || data.numOfRooms < 1 || data.numOfRooms > 9) {
            console.error('the RoomNumber must be between 1 and 9');
            toast.error('the RoomNumber must be between 1 and 9');

            return false;
        }
        if (!data.imageUrl1) {
            console.error('ImgUrl Of Your House is required')
            toast.error('Image Of House is required. Please provide ImgUrl')
            return false;

        }
        const checkImageUrlFormat = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)|\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/;
        if (!checkImageUrlFormat.test(data.imageUrl1)) {
            console.error('This is not correct format of an imageurl:', data.imageUrl1);
            toast.error('Enter the imageUrl in "/images/picture.jpg" format');
            return;
        }
        if (!data.description) {
            console.error('Description is required')
            toast.error('Description is required')
            return false;
        }

        return true;
    }
    //It is stated what will happen after pressing the Update button with the handleSubmit function.
    //submitting the form asynchronously with handleSubmit
    const handleSubmit = async (e) => { // async function is passed for asynchronous validation.
        //calling e.preventDefault() on the form's submission
        //it prevents the page from refreshing
        //allowing us to handle and process the form without causing the entire page to reload
        /*---------------------------------------------------------------------------------------*/
        //used source:
        //https://www.shecodes.io/athena/931-why-do-we-need-event-preventdefault-in-javascript
        /*---------------------------------------------------------------------------------------*/
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
            
                const url = "https://localhost:5001/Update/{data.id}"; //this URL must match the Route value of update function in the controller
                //sending http put request to defined url
                //the data represents the updated value
                axios.put(url, data).then((response) => {
                    console.log(response.data);
                    // alert("data uppdated successfully");

                    navigate(`/`);
                })

                //navigate to homepage after submitting the form
            axios.get("https://localhost:5001/Apartment").then(() => {
                alert("The post is updated successfully.");
                    navigate(`/`); 
                })


            
        //If an error is encountered, the catch block is executed
        } catch (error) {
            //Error message is printed to the console
            console.error('Error updating apartment:', error);
            toast.error('Error  updating apartment');
        }
    };
       //if the data value is not defined, Loading is displayed on the screen.
    if (!data && id) {
        return <div>loading...</div>
    }

    return (
        <div>

            <div>
                <h2>Update Your Apartment</h2>
                <form className="create-form" onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Name</label>
                            <span className="text-danger">*</span>

                            <input type="text" id='name' value={data.name}
                                onChange={handleChange} className="form-control" />

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
                            <label>Image Of House</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl1" value={data.imageUrl1}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Image Of Livingroom</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl2" value={data.imageUrl2}
                                onChange={handleChange} className="form-control" />

                        </div>
                        <div className="form-group col-3">
                            <label>Image Of Kitchen</label><span className="text-danger">*</span>
                            <input type="text" id="imageUrl3" value={data.imageUrl3}
                                onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image Of Restroom</label><span className="text-danger">*</span>
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
                    <button type="submit" className="btn btn-primary">Update</button>
                    <a href="/" className="btn btn-secondary">Back</a>
                </form>

            </div>
            <ToastContainer />
        </div>

    )
}
