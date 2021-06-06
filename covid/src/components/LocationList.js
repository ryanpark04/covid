import React from 'react';
import LocationItem from './LocationItem';

const LocationList = props => {
    const locations = props.locations.map(location => {
        return <div key={location.name}> <LocationItem data={location} /> </div>;
    });

    return (
        <div className="ui list">
            {locations}
        </div>
    );
};

export default LocationList;