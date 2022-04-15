import React from 'react';
import AvailableCarpoolCard from './AvailableCarpoolCard';

function AvailableCarpools({ carpools, loggedInUser, submittedParameters, displayDate, displayTime, addUserToCarpool }) {
    return (
        <div>
            <h1>Available Carpools</h1>
            <p>
                <strong>Origin: </strong> {submittedParameters.originLocation}
                <br />
                <strong>Destination: </strong> {submittedParameters.destinationLocation}
                <br />

            </p>
                {carpools.length > 0 ? carpools.map((carpool)=><AvailableCarpoolCard key = {carpool.id} carpoolInfo = {carpool} loggedInUser = {loggedInUser} displayDate = {displayDate} displayTime = {displayTime} addUserToCarpool = {addUserToCarpool} />) : <h2>(no matching carpools)</h2>}
        </div>
    )
}

export default AvailableCarpools;
