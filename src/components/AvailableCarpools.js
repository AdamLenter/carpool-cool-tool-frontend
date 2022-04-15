import React from 'react';
import AvailableCarpoolCard from './AvailableCarpoolCard';

function AvailableCarpools({ carpools, submittedParameters, displayDate, displayTime }) {
    return (
        <div>
            <h1>Available Carpools</h1>
            <p>
                <strong>Origin: </strong> {submittedParameters.originLocation}
                <br />
                <strong>Destination: </strong> {submittedParameters.destinationLocation}
                <br />

            </p>
                {carpools.length > 0 ? carpools.map((carpool)=><AvailableCarpoolCard key = {carpool.id} carpoolInfo = {carpool} displayDate = {displayDate} displayTime = {displayTime} />) : <h2>(no matching carpools)</h2>}
        </div>
    )
}

export default AvailableCarpools;
