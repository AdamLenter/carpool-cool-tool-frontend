import React from 'react';
import { useParams } from 'react-router-dom';
import CarpoolBasicInfo from './CarpoolBasicInfo';
import CarpoolGuestList from './CarpoolGuestList';

function CarpoolDetails( { carpools, displayDate, displayTime } ) {
    
    const params = useParams();
    const carpoolInfo = carpools.find((carpool)=>carpool.id == params.id);

    console.log(carpoolInfo);

    const totalOccupants = carpoolInfo.users.length + 1;
    const pricePerOccupant = (carpoolInfo.one_way_cost/totalOccupants);

    if(carpoolInfo) {
        return (
            <div>
                <h1>Carpool Details</h1>
                {carpoolInfo ? <CarpoolBasicInfo carpoolInfo = {carpoolInfo} displayDate = {displayDate} displayTime = {displayTime} /> : <h2>No Carpool to Display</h2>}
                <br />
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
