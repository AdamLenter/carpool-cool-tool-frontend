import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarpoolBasicInfo from './CarpoolBasicInfo';
import CarpoolGuestList from './CarpoolGuestList';

function CarpoolDetails( { loggedInUser, myCarpools, displayDate, displayTime } ) {
    const params = useParams();
    const [carpoolInfo, setCarpoolInfo] = useState({});
    const [carpoolLoaded, setCarpoolLoaded] = useState(false);

    let carpoolToFind = {};
    console.log(loggedInUser.carpools_as_driver);
    if(!carpoolLoaded) {
        carpoolToFind = myCarpools.find((carpool) => carpool.id === params.id)
        if(carpoolToFind) {
            setCarpoolInfo(carpoolToFind);
            setCarpoolLoaded(true);
        }
        else {
            fetch(`http://localhost:9292/carpool/${params.id}`)
                .then((r)=>r.json())
                .then((carpool) => setCarpoolInfo(carpool))
                .then(()=>setCarpoolLoaded(true))
            }
    }
        

    if(carpoolLoaded) {
        const totalOccupants = carpoolInfo.users.length + 1;
        const pricePerOccupant = (carpoolInfo.one_way_cost/totalOccupants);
        return (
            <div>
                <h1>Carpool Details</h1>
                {carpoolInfo ? <CarpoolBasicInfo loggedInUser = {loggedInUser} carpoolInfo = {carpoolInfo} displayDate = {displayDate} displayTime = {displayTime} /> : <h2>No Carpool to Display</h2>}
                <br />
    
                <strong>One-way cost: </strong>${carpoolInfo.one_way_cost.toFixed(2)}
                <br />
                
                <strong>Total occupants: </strong>{totalOccupants}
                <br />
                
                <strong>Price per occupant: </strong>${pricePerOccupant.toFixed(2)}
                <br />
                <br />

                <strong>Number of guests: </strong>{carpoolInfo.users.length} of {carpoolInfo.number_of_guests_available}
                <br />
                <strong>Total guest charges: </strong>${(pricePerOccupant * carpoolInfo.users.length).toFixed(2)}

                {carpoolInfo.users.length > 0 ? <CarpoolGuestList carpoolGuests = {carpoolInfo.carpool_guests} carpoolGuestUsers = {carpoolInfo.users} userTransactions = {carpoolInfo.user_transactions} displayDate = {displayDate} /> : null}
            </div>
        )
        }
    else {
        return <h2>Details loading...</h2>
    }
}

export default CarpoolDetails;
