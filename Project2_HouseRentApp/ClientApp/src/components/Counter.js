import React, { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Counter() {

  
   

    const initialValues =
    {
        id: 0,
        name: '',
        adress: '',
        price: 0,
        square: 0,
        firstRentalDate: '',
        numOfRooms: 0,
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        imageUrl4: '',
        description: ''
    }
    const [data, setData] = useState(initialValues);

    const navigate = useNavigate();

   const handleChange= (e)=> {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    };

    const validation = () => {
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
            toast.error('Number of Rooms must be between 1 and 9');
            return false;
        }
        if (!data.price || data.price < 1) {
            toast.error('Price must be a valid positive number');
            return false;
        }
        if (!data.square || data.square < 0) {
            toast.error('Square must be a valid non-negative number');
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data) {
            console.error('data object is null or undefined.');
            return;
        }
        if (!validation()) {
            console.error('Form validation failed.');
            return;
        }
        console.log(data);
        try {
            const url = "https://localhost:5001/Create"
         
              axios.post(url, data).then(res=>
                {
                console.log(res.data);
                alert("data posted successfully");
                    navigate('/');
                })

        } catch (error) {
            console.error('Error creating apartment:', error);
            toast.error('Error creating apartment');
        }
    };

    

    return (
        <div>

            <div>
                <h2>Create New Apartment</h2>
                <form className="create-form" onSubmit={handleSubmit}>
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
                    <a href="/Grid" className="btn btn-secondary">Back</a>
                </form>

            </div>
            <ToastContainer />
        </div>
        
    );
}

export default Counter;