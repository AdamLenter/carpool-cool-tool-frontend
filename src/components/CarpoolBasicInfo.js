import React from 'react';

function CarpoolBasicInfo({ loggedInUser, carpoolInfo, displayDate, displayTime }) {  

    return (
        <div>
            <strong>Driver: </strong>{carpoolInfo.driver_user_id === loggedInUser.id ? "(self)" : carpoolInfo.driver_user.first_name.concat(" ", carpoolInfo.driver_user.last_name)}
            <br />
            <strong>Date: </strong>{displayDate(carpoolInfo.carpool_date)}
            <br />
            <strong>Departure time: </strong>{displayTime(carpoolInfo.departure_time)}
            <br />
            <strong>Origin: </strong>{carpoolInfo.origin_location.name}
            <br />
            <strong>Destination: </strong>{carpoolInfo.destination_location.name}
        </div>
    )
}

export default CarpoolBasicInfo;
