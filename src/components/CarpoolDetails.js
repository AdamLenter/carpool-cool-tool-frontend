import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CarpoolBasicInfo from './CarpoolBasicInfo';
import CarpoolGuestList from './CarpoolGuestList';

function CarpoolDetails( { loggedInUser, myCarpools, displayDate, displayTime, currentDate, markCarpoolComplete } ) {
    const params = useParams();
    const [carpoolInfo, setCarpoolInfo] = useState({});
    const [carpoolLoaded, setCarpoolLoaded] = useState(false);

    let carpoolToFind = {};
    console.log(carpoolInfo.carpool_complete)
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

    function handleMarkCarpoolComplete(event) {
        let updatedCarpoolInfo = {...carpoolInfo};
        updatedCarpoolInfo.carpool_complete = "Yes";

        
        const transactionAmount = Math.floor((carpoolInfo.one_way_cost/(carpoolInfo.users.length + 1)) * 100) / 100;

        const userTransactions = [];
        for(let i = 0; i < carpoolInfo.carpool_guests.length; i++) {
            userTransactions.push({
                sender_user_id: carpoolInfo.carpool_guests[i].user_id, 
                transaction_amount: transactionAmount, 
                carpool_guest_id: carpoolInfo.carpool_guests[i].id,
                recipient_user_id: carpoolInfo.driver_user_id, 
                user_transaction_date: currentDate
            })
        }
        updatedCarpoolInfo.user_transactions = userTransactions;

        setCarpoolInfo(updatedCarpoolInfo);
        markCarpoolComplete(updatedCarpoolInfo);
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

                {currentDate >= carpoolInfo.carpool_date && carpoolInfo.driver_user_id === loggedInUser.id && !carpoolInfo.carpool_complete && carpoolInfo.users.length > 0 ? (<div><button className = "app_buttons" onClick = {handleMarkCarpoolComplete}>Mark Carpool Complete</button></div>) : null}
            </div>
        )
        }
    else {
        return <h2>Details loading...</h2>
    }
}

export default CarpoolDetails;
