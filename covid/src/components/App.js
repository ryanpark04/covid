import axios from 'axios';
import React from 'react';
import SearchBox from './SearchBox';
import LocationList from './LocationList';

class App extends React.Component {
    state = { results: [] }
    
    onTermSubmit = async (term) => {
        const response = await axios.post("/search", { "zipcode" : term } )
        this.setState({
            results: response.data
        })
    }

    render() {
        return (
            <div>
                <SearchBox onFormSubmit={this.onTermSubmit} />
                <LocationList locations={this.state.results} />
            </div>
        );
    }
}

export default App;
