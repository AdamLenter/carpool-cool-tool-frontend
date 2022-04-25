import React from 'react';
import { useHistory } from 'react-router-dom';
import AvailableCarpoolGuestList from './AvailableCarpoolGuestList';

function AvailableCarpoolCard({ carpoolInfo, loggedInUser, displayDate, displayTime, addUserToCarpool }) {

    const history = useHistory();
    
    function handleJoinButton() {
        addUserToCarpool(loggedInUser, carpoolInfo);
        history.push(`/show_carpool_details/${carpoolInfo.id}`);
    }

    return (
        <div className = "carpool_div">
            <strong>Driver: </strong>{carpoolInfo.driver_user.first_name} {carpoolInfo.driver_user.last_name}
            <br />
            <strong>Date: </strong>{displayDate(carpoolInfo.carpool_date)}
            <br />
            <strong>Departure time: </strong>{displayTime(carpoolInfo.departure_time)}
            <br />
            <strong>Total one-way cost: </strong>${carpoolInfo.one_way_cost}
            <br />
            <strong>Current passengers: </strong>{carpoolInfo.users.length} of {carpoolInfo.number_of_guests_available}
            <br />
            {carpoolInfo.users.length > 0 ? <AvailableCarpoolGuestList carpoolInfo = {carpoolInfo} /> : null}
            
            {carpoolInfo.users.length < carpoolInfo.number_of_guests_available ? <button className='app_buttons' onClick={handleJoinButton}>Join Carpool</button> : null}
        </div>
    )
}

export default AvailableCarpoolCard;
