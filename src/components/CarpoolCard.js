import React from 'react';
import { useHistory } from 'react-router-dom';

function CarpoolCard({ carpoolInfo }) {
    const history = useHistory();
    
    const carpoolDate = new Date(carpoolInfo.carpool_date);
    const displayedDate = carpoolDate.toLocaleString('default', { dateStyle: 'medium' });        
    const displayedTime = carpoolDate.toLocaleString('default', { timeStyle: 'short' });        
    
    function handleDetailsButton() {
        history.push(`/show_carpool_details/${carpoolInfo.id}`);
    }
    return (
        <div className = "carpool_div">
            <strong>Date: </strong>{displayedDate}
            <br />
            <strong>Departure time: </strong>{displayedTime}
            <br />
            <strong>Origin: </strong>{carpoolInfo.origin_location.name}
            <br />
            <strong>Origin: </strong>{carpoolInfo.destination_location.name}
            <br />
            <br />
            <strong>Guests:</strong>
            <br />
            <button className='app_buttons' onClick={handleDetailsButton}>See details</button>
        </div>
    )
}

export default CarpoolCard;
