import React from 'react';

const LocationItem = props => {
    console.log()
    return (
        <div className="item">
            <div className="ui segment">
                <div> {props.data.name} <span style={{ float: "right" }}> {props.data.availability} </span></div>
                <br/>
                <div>{props.data.address}  •  {props.data.cityInfo} <span style={{ float: "right" }}> {props.data.distance} </span></div>
            </div>
        </div>
    );
}

export default LocationItem;