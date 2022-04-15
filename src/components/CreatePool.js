import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputDateOriginDestination from './InputDateOriginDestination';
    
function CreatePool( { currentDate, currentTime, loggedInUser, locations, addCarpool } ) {
    const history = useHistory();
 
    const defaultNeighborhoodLocation = locations.find((location)=>location.id == loggedInUser.home_neighborhood_location_id).name;
    
    const defaultFormValues = {
        date: currentDate,
        time: currentTime, 
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

                history.push("/show_carpools");
                }
            }
        }

    return (
    <div>
        <h1>Create a Carpool</h1>
        <form onSubmit = {submitForm}>
            <InputDateOriginDestination formData = {formData} updateFormData = {updateFormData} locations = {locations}  />
            
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
