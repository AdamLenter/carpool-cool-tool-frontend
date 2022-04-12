import React from 'react';
import CarpoolCard from './CarpoolCard';

function ShowCarpools({ carpoolsAsDriver }) {

    const displayedCarpools = [...carpoolsAsDriver];
    console.log(carpoolsAsDriver);

    const sortedCarpools = displayedCarpools.sort((a, b)=> {
        if(a.carpool_date.concat(" ", a.departure_time) > b.carpool_date.concat(" ", b.departure_time)){
          return -1;
          }
        else {
          return 1;
        }
      }
      )

      console.log(sortedCarpools);
    return (
        <div>
            <h2>My Carpools</h2>
            {sortedCarpools ? sortedCarpools.map((carpool)=><CarpoolCard key = {carpool.id} carpoolInfo = {carpool} />) : <p>Loading...</p>}
        </div>
    )
}

export default ShowCarpools;
