import React, { useState } from 'react';
import StandardPageHeader from './StandardPageHeader';

function RegistrationForm({cities, neighborhoods, addUser, setRegistrationComplete}) {

    const initialCityId = cities[0].id;
    const initialNeighborhoodLocationId = neighborhoods.find((neighborhood) => neighborhood.city_id = initialCityId).id;

    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "", 
        username: "", 
        password: "", 
        address1: "", 
        address2: "", 
        cityId: initialCityId,  
        state: "New York", 
        zip: "", 
        cellphoneNumber: "", 
        homeNeighborhoodLocationId: initialNeighborhoodLocationId ? initialNeighborhoodLocationId : "", 
        hasCar: "yes", 
        carGuestCapacity: 0
    })

    const numberFields = ["cityId", "homeNeighborhoodLocationId", "carGuestCapacity"];

    function updateFormData(event) {
        let newFormData = {...formData};
        newFormData[event.target.name] = event.target.value;
        
        setFormData(newFormData);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        let recordForDB = {};

        const keys = Object.keys(formData);

        for (let i = 0; i < keys.length; i++) {
            if(numberFields.includes(keys[i])){
                //This is number field;
                recordForDB[keys[i]] = Number(formData[keys[i]]);
            }
            else {
                recordForDB[keys[i]] = formData[keys[i]];
            }
        }
        if(recordForDB.hasCar == "no") {
            recordForDB.carGuestCapacity = 0;
        }
        
       addUser(recordForDB);
       setRegistrationComplete(true);
    }

    const displayedNeighborhoods = neighborhoods.filter((neighborhood)=>neighborhood.city_id == formData.cityId);

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
                <label>First name: </label>
                <input type = "text" name = "firstName" value = {formData.firstName} onChange = {updateFormData} />
                <br />

                <label>Last name: </label>
                <input type = "text" name = "lastName" value = {formData.lastName} onChange = {updateFormData} />
                <br />

                <label>Username: </label>
                <input type = "text" name = "username" value = {formData.username} onChange = {updateFormData} />
                <br />
                
                <label>Password: </label>
                <input type = "password" name = "password" value = {formData.password} onChange = {updateFormData} />
                <br />
                
                <label>Home address1: </label>
                <input type = "text" name = "address1" value = {formData.address1} onChange = {updateFormData} />
                <br />
                
                <label>Home address2 (optional): </label>
                <input type = "text" name = "address2" value = {formData.address2} onChange = {updateFormData} />
                <br />
                
                <label>City: </label>
                <select name = "cityId" value = {formData.cityId} onChange = {updateFormData}>
                    {cities ? cities.map((city) => <option key = {city.id} value = {city.id}>{city.name}</option>) : <option disabled>Cities loading</option>}
                </select>
                <br />
                
                <label>Zip: </label>
                <input type = "text" name = "zip" value = {formData.zip} onChange = {updateFormData} />
                <br />
                
                <label>Cellphone number: </label>
                <input type = "tel" name = "cellphoneNumber" value = {formData.cellphoneNumber} onChange = {updateFormData} />
                <br />
                
                <label>Home neighborhood: </label>
                <select name = "homeNeighborhoodLocationId" value = {formData.homeNeighborhoodLocationId} onChange = {updateFormData}>
                    {displayedNeighborhoods ? displayedNeighborhoods.map((neighborhood) => <option key = {neighborhood.id} value = {neighborhood.id}>{neighborhood.city.name} - {neighborhood.name}</option>) : <option disabled>Neighborhoods loading</option>}
                </select>
                <br />
                
                <label>I have a car: </label>
                    <select name = "hasCar" value = {formData.hasCar} onChange = {updateFormData} >
                        <option value = "yes">Yes</option>
                        <option value = "no">No</option>
                    </select>
                <br />
                
                {formData.hasCar === "yes" ? (
                    <>
                        <label>Car guest capacity: </label>
                        <input type = "number" name = "carGuestCapacity" value = {formData.carGuestCapacity} onChange = {updateFormData} />
                        <br />
                    </>
                    ) : null
                }
                <button className = "app_buttons" >Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm;
