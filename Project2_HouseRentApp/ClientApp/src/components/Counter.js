
import React, { useState } from 'react';

function Counter() {
    //The source used for useState and handleSubmit
    //https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
    // useState is used to track the value in input
    //The states are initialized as empty
    //For example Name is the getter and setName is the setter
    //the getter holds the current value of the state
    //the setter sets that value

    const [Name, setName] = useState('');
    const [Adress, setAdress] = useState('');
    const [Price, setPrice] = useState('');
    const [Square, setSquare] = useState('');
    const [FirstRentalDate, setFirstRentalDate] = useState('');
    const [NumOfRooms, setNumOfRooms] = useState('');
    const [ImageUrl1, setImageUrl1] = useState('');
    const [ImageUrl2, setImageUrl2] = useState('');
    const [ImageUrl3, setImageUrl3] = useState('');
    const [ImageUrl4, setImageUrl4] = useState('');
    const [Description, setDescription] = useState('');


  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${Name}`);
        console.log(`${Adress}`);
        console.log(`${Price}`);
        console.log(`${Square}`);
        console.log(`${FirstRentalDate}`);
        console.log(`${NumOfRooms}`);
        console.log(`${ImageUrl1}`);
        console.log(`${ImageUrl2}`);
        console.log(`${ImageUrl3}`);
        console.log(`${ImageUrl4}`);
        console.log(`${Description}`);
    }

//Description of onChange:
// (e) is short for event.
// e.target.value = The target value is the value the user enters in the input field
//with onChange we setting and tracking the value
//used source:https://stackoverflow.com/questions/71039088/what-is-onchange-e-setnamee-target-value-in-react-mean
    return (
        <div>

            <div>
                <h2>Create New Apartment</h2>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Name</label><span className="text-danger">*</span>
                         
                            <input type="text" name="Name"  onChange={(e) => setName(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-6">
                            <label>Address</label>
                            <input type="text" name="Adress"  onChange={(e) => setAdress(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Price</label><span className="text-danger">*</span>
                            <input type="text" name="Price"  onChange={(e) => setPrice(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Square</label><span className="text-danger">*</span>
                            <input type="text" name="Square"  onChange={(e) => setSquare(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>First Rental Date</label><span className="text-danger">*</span>
                            <input type="text" name="FirstRentalDate"  onChange={(e) => setFirstRentalDate(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Number of Rooms</label><span className="text-danger">*</span>
                            <input type="text" name="NumOfRooms"  onChange={(e) => setNumOfRooms(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Image URL 1</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl1"  onChange={(e) => setImageUrl1(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 2</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl2"  onChange={(e) => setImageUrl2(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 3</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl3"  onChange={(e) => setImageUrl3(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group col-3">
                            <label>Image URL 4</label><span className="text-danger">*</span>
                            <input type="text" name="ImageUrl4"  onChange={(e) => setImageUrl4(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" name="Description"  onChange={(e) => setDescription(e.target.value)} className="form-control" />
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
