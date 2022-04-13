import React from 'react';
import CarpoolCard from './CarpoolCard';

function ShowCarpools({ carpoolsAsDriver, displayDate, displayTime }) {

    const displayedCarpools = [...carpoolsAsDriver];

    const sortedCarpools = displayedCarpools.sort((a, b)=> {
        if(a.carpool_date.concat(" ", a.departure_time) > b.carpool_date.concat(" ", b.departure_time)){
          return -1;
          }
        else {
          return 1;
        }
      }
      )
    return (
        <div>
            <h2>My Carpools</h2>
            {sortedCarpools ? sortedCarpools.map((carpool)=><CarpoolCard key = {carpool.id} carpoolInfo = {carpool} displayDate = {displayDate} displayTime = {displayTime} />) : <p>Loading...</p>}
        </div>
    )
}

export default ShowCarpools;
