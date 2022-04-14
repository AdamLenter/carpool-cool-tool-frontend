import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
    
function InputDateOriginDestination( { formData,  updateFormData, locations } ) {
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
 
    return (
    <>
        <label>Date: </label>
        <input type = "date" name = "date" value = {formData.date} onChange = {updateFormData} />
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
    </>
    );
}

export default InputDateOriginDestination;
