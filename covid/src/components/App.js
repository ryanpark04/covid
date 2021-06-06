import axios from 'axios';
import React from 'react';
import SearchBox from './SearchBox';
import LocationList from './LocationList';

class App extends React.Component {
    state = { results: [], searching: false, lat: null, lon: null, errorMessage: "" }

    onButtonClick = async () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude, lon: position.coords.longitude }),
            (err) => this.setState({ errorMessage: err.message })
        );
        this.setState({ searching: true })
        const response = await axios.post("/searchByLocation", { "lat" : 37.7749, "lon": -122.4194 });
        this.setState({
            results: response.data,
            searching: false
        })
    }
    
    onTermSubmit = async (term) => {
        this.setState({ searching: true })
        const response = await axios.post("/searchByZipcode", { "zipcode" : term } )
        this.setState({
            results: response.data,
            searching: false
        })
    }

    wasFound = () => {
        if (this.state.searching) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        } else {
            return (
                <div className="ui grid">
                    <div className="five wide column">
                        <LocationList locations={this.state.results} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div style={{ display: "inline-block" }}>
                    <button className="ui button" onClick={this.onButtonClick}>Search by Location</button>
                </div>
                <div style={{ display: "inline-block" }}>
                    <SearchBox onFormSubmit={this.onTermSubmit} />
                </div>
                
                {this.wasFound()}
                
                
            </div>
        );
    }
}

export default App;
