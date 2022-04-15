import React from 'react';

function AvailableCarpoolGuestName({ guest }) {
    return (
        <div>
           <strong>Name: </strong>{guest.first_name} {guest.last_name}
           <br />
        </div>
    )
}

export default AvailableCarpoolGuestName;
