import React from 'react';

function CarpoolGuest({ guestInfo }) {
       
    return (
        <div>
            <strong>Name: </strong>{guestInfo.first_name} {guestInfo.last_name}
            <br />
            <strong>Cellphone: </strong>{guestInfo.cellphone_number}
            <br />
            <strong>Address: </strong>{guestInfo.address1}
        </div>
    )
}

export default CarpoolGuest;
