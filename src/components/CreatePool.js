import React, { useState } from 'react';
    
function CreatePool( { loggedInUser, locations, addCarpool } ) {
    const today = new Date();

    const currentDate = today.toISOString().split('T')[0];
    let currentHour = today.getHours();

    if(currentHour < 23) {
        currentHour += 1;
    }
    else {
        currentHour = 0;
    }

    if(currentHour < 10) {
        currentHour = "0" + currentHour;
    }

    const time = currentHour + ":00";
 
    const defaultNeighborhoodLocation = locations.find((location)=>location.id == loggedInUser.home_neighborhood_location_id).name;
    
    const defaultFormValues = {
        date: currentDate,
        time: time, 
        originLocation: defaultNeighborhoodLocation, 
        destinationLocation: "", 
        carGuestCapacity: loggedInUser.hasCar == "yes" ? loggedInUser.carGuestCapacity : 0, 
        oneWayCost: 1
    }
    const [formData, setFormData] = useState(defaultFormValues);

    function updateFormData(event) {
        let newData = {...formData};
        newData[event.target.name] = event.target.value; 
        setFormData(newData); 
    }

    function submitForm(event) {
        event.preventDefault();
        
        if(!formData.originLocation)
            {
            alert("Please enter an origin location.");
            }
        else
            {
            if(!formData.destinationLocation) {
                alert("Please enter a destination location.")
            }
            else {
                let formDataForDb = {...formData};

                formDataForDb.carGuestCapacity = Number(formData.carGuestCapacity);
                formDataForDb.oneWayCost = Number(formData.oneWayCost);
                formDataForDb.originLocationId = locations.find((location)=>location.name == formData.originLocation).id;
                formDataForDb.destinationLocationId = locations.find((location)=>location.name == formData.destinationLocation).id;
                formDataForDb.driverUserID = loggedInUser.id;
                
                addCarpool(formDataForDb);
                }
            }
        }

    return (
    <div>
        <h1>Create a Carpool</h1>
        <form onSubmit = {submitForm}>
            <label>Date: </label>
            <input type = "date" name = "date" value = {formData.date} onChange = {updateFormData} />
            <br />

            <label>Departure Time: </label>
            <input type = "time" name = "time" value = {formData.time} onChange = {updateFormData} />
            <br />

            <label>Origin: </label>
            <input className = "wide_select" name = "originLocation" list = "locations" value = {formData.originLocation} onChange = {updateFormData}/>
            <br />

            <label>Destination: </label>
            <input className = "wide_select" name = "destinationLocation" list = "locations" value = {formData.destinationLocation} onChange = {updateFormData} />
            <br />

            <datalist id = "locations">
                {locations.map((location)=><option key = {location.id}>{location.name}</option>) }
            </datalist>

            <label>Guest capacity: </label>
            <input name = "carGuestCapacity" value={formData.carGuestCapacity} onChange = {updateFormData} />
            <br />

            <label>Total one-way cost: $</label>
            <input name = "oneWayCost" value={formData.oneWayCost} onChange = {updateFormData} />
            <br />

            <button className = "app_buttons">Submit</button>
        </form>
        <br />
    </div>
    );
}

export default CreatePool;
