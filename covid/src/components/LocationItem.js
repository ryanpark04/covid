import React from 'react';

const LocationItem = props => {
    console.log()
    return (
        <div className="item">
            <i className="map marker icon"></i>
            <div className="content">
                <div className="header">{props.image.name}</div>
                <div className="description">{props.image.address}  •  {props.image.cityInfo}</div>
            </div>
        </div>
    );
}

export default LocationItem;