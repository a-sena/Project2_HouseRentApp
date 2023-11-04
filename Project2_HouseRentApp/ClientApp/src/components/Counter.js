
import React, { useState } from 'react';

function Counter() {
    //The source used for useState:https://react.dev/reference/react/useState
    const [apartment, setApartment] = useState({
        Name: '',
        Adress: '',
        Price: '',
        Square: '',
        FirstRentalDate: '',
        NumOfRooms: '',
        ImageUrl1: '',
        ImageUrl2: '',
        ImageUrl3: '',
        ImageUrl4: '',
        Description: '',
    });
    //Used source for handleChange:https://www.tabnine.com/code/javascript/functions/react/setValues
    const handleChange = (event) => {
        const { name, value } = event.target;
        setApartment({
            ...apartment,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        e.preventDefault();

    };

    return (
        <div>

            <div>
                <h2>Create New Apartment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Name</label><span className="text-danger">*</span>
                            <input type="text" name="Name" value={apartment.Name} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-6">
                            <label>Address</label>
                            <input type="text" name="Adress" value={apartment.Adress} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Price</label><span className="text-danger">*</span>
                            <input type="text" name="Price" value={apartment.Price} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Square</label><span className="text-danger">*</span>
                            <input type="text" name="Square" value={apartment.Square} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>First Rental Date</label><span className="text-danger">*</span>
                            <input type="text" name="FirstRentalDate" value={apartment.FirstRentalDate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Number of Rooms</label><span className="text-danger">*</span>
                            <input type="text" name="NumOfRooms" value={apartment.NumOfRooms} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Image URL 1</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl1" value={apartment.ImageUrl1} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 2</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl2" value={apartment.ImageUrl2} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 3</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl3" value={apartment.ImageUrl3} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 4</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl4" value={apartment.ImageUrl4} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" name="Description" value={apartment.Description} onChange={handleChange} className="form-control" />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Create</button>
                    <a href="/Grid" className="btn btn-secondary">Back</a>
                </form>
            </div>

        </div>
    );
}

export default Counter;
