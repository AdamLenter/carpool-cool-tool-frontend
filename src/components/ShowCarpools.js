import React from 'react';
import CarpoolCard from './CarpoolCard';

function ShowCarpools({ loggedInUser, myCarpools, displayDate, displayTime }) {
    return (
        <div>
            <h2>My Carpools</h2>
            {myCarpools ? myCarpools.map((carpool)=><CarpoolCard key = {carpool.id} loggedInUser = {loggedInUser} carpoolInfo = {carpool} displayDate = {displayDate} displayTime = {displayTime} />) : <p>Loading...</p>}
        </div>
    )
}

export default ShowCarpools;
