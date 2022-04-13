import React from 'react';

function CarpoolBasicInfo({ carpoolInfo, displayDate, displayTime }) {  
    
    return (
        <>
            <strong>Date: </strong>{displayDate(carpoolInfo.carpool_date)}
            <br />
            <strong>Departure time: </strong>{displayTime(carpoolInfo.departure_time)}
            <br />
            <strong>Origin: </strong>{carpoolInfo.origin_location.name}
            <br />
            <strong>Destination: </strong>{carpoolInfo.destination_location.name}
        </>
    )
}

export default CarpoolBasicInfo;
