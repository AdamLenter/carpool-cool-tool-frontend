import React from 'react';
import AvailableCarpoolGuestName from './AvailableCarpoolGuestName.js';

function AvailableCarpoolGuestList({ carpoolInfo }) {
    console.log(carpoolInfo.users);
    return (
        <div>
            <br />
            <strong>Current Passenger List:</strong>
            <br />
            {carpoolInfo.users.map((guest) => <AvailableCarpoolGuestName key = {guest.id} guest = {guest} />)}
        </div>
    )
}

export default AvailableCarpoolGuestList;
