import React from 'react';
import LocationItem from './LocationItem';

const LocationList = props => {
    const locations = props.locations.map(location => {
        return <LocationItem image={location} />;
    });

    return (
        <div className="ui list">
            {locations}
        </div>
    );
};

export default LocationList;