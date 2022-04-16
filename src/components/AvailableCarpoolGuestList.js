import React from 'react';
import AvailableCarpoolGuestName from './AvailableCarpoolGuestName.js';

function AvailableCarpoolGuestList({ carpoolInfo }) {
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
