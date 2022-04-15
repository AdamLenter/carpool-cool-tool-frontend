import React from 'react';
import CarpoolGuest from './CarpoolGuest';

function AvailableCarpoolGuestList({ carpoolInfo }) {
    console.log(carpoolInfo.users);
    return (
        <div>
            <br />
            <strong>Current Passenger List:</strong>
            <br />
            {carpoolInfo.users.map((guest) => (
                <>
                    <strong>Name: </strong>{guest.first_name} {guest.last_name}
                    <br />
                </>
            ))}
        </div>
    )
}

export default AvailableCarpoolGuestList;
