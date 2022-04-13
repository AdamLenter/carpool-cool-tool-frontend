import React from 'react';
import CarpoolGuest from './CarpoolGuest';

function CarpoolGuestList({ carpoolGuests, carpoolGuestUsers, userTransactions, displayDate }) {
    console.log(userTransactions);
    return (
        <div>
            <br />
            <h2>Guests:</h2>
            {carpoolGuests.map((guest) => <CarpoolGuest key = {guest.id} carpoolGuest = {guest} carpoolGuestUsers = {carpoolGuestUsers} userTransactions = {userTransactions} displayDate = {displayDate} />)}
        </div>
    )
}

export default CarpoolGuestList;
