import React, { useState } from 'react';
import AvailableCarpools from './AvailableCarpools';
import InputDateOriginDestination from './InputDateOriginDestination';

function FindCarpoolForm({ currentDate, currentTime, loggedInUser, locations, displayDate, displayTime, addUserToCarpool}) {

    // const defaultNeighborhoodLocation = locations.find((location)=>location.id == loggedInUser.home_neighborhood_location_id).name;
    const defaultNeighborhoodLocation = "";
    const [submittedParameters, setSubmittedParameters] = useState([]);
    const [availableCarpools, setAvailableCarpools] = useState([]);
    const [targetDateTime, setTargetDateTime] = useState()

    function updateFormData(event) {
        let newData = {...formData};
        newData[event.target.name] = event.target.value; 
        setFormData(newData); 
    }

    const defaultFormValues = {
        date: currentDate,
        time: currentTime, 
        originLocation: defaultNeighborhoodLocation, 
        destinationLocation: ""
    }
    const [formData, setFormData] = useState(defaultFormValues);


    function handleForm(event) {
        event.preventDefault();

        const date = formData.date;
        const originLocationId = locations.find((location)=>location.name == formData.originLocation).id;
        const destinationLocationId = locations.find((location)=>location.name == formData.destinationLocation).id;
        setTargetDateTime(new Date(`${formData.date} ${formData.time}`));
        fetch(`http://localhost:9292/find_carpools/${loggedInUser.id}/${date}/${originLocationId}/${destinationLocationId}`)
        .then((r)=>r.json())
        .then((carpools) => setAvailableCarpools(carpools))
        .then (()=>setSubmittedParameters(formData));                
    }

    let filteredCarpools = [];
    if(availableCarpools) {
        filteredCarpools = availableCarpools.filter((carpool) => {
            const carpoolDateTime = new Date(`${carpool.carpool_date} ${carpool.departure_time.substring(11, 16)}`);
            const diff = Math.abs(targetDateTime - carpoolDateTime);
            return diff <= 1800000;
        })
    }
    
    return (
        <div>
            <h1>Find Carpool</h1>
            <form onSubmit = {handleForm}>
                <InputDateOriginDestination formData = {formData} updateFormData = {updateFormData} locations = {locations} />
                <button className='app_buttons'>Submit</button>
            </form>
            <hr />

            {submittedParameters ? <AvailableCarpools carpools = {filteredCarpools} loggedInUser = {loggedInUser} submittedParameters = {submittedParameters} displayDate = {displayDate} displayTime = {displayTime} addUserToCarpool = {addUserToCarpool} /> : null}
            
        </div>
    )
}

export default FindCarpoolForm;
