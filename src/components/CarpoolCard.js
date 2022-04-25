import React from 'react';
import { useHistory } from 'react-router-dom';
import CarpoolBasicInfo from './CarpoolBasicInfo';

function CarpoolCard({ loggedInUser, carpoolInfo, displayDate, displayTime }) {
    const history = useHistory();
    
    function handleDetailsButton() {
        history.push(`/show_carpool_details/${carpoolInfo.id}`);
    }
    return (
        <div className = "carpool_div">
            <CarpoolBasicInfo loggedInUser = {loggedInUser} carpoolInfo = {carpoolInfo} displayDate = {displayDate} displayTime = {displayTime} />
            <br />
            <button className='app_buttons' onClick={handleDetailsButton}>See details</button>
        </div>
    )
}

export default CarpoolCard;
