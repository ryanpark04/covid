import React from 'react';
import SearchBar from './SearchBar';

class Start extends React.Component {
    state = { term: '' }

    onSubmit = term => {
        this.setState({ term: term });

        this.props.onFormSubmit(term);
    }

    wasClicked = () => {
        this.props.onButtonClick();
    }

    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider">Or</div>
                    <div className="middle aligned row">
                        <div className="column">
                            <div className="ui icon header">
                                <i className="search icon"></i>
                                Find Zipcode
                            </div>
                            <div className="field">
                                <SearchBar onFormSubmit={this.onSubmit} />
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui icon header">
                                <i className="world icon"></i>
                                Search by Location
                            </div>
                            <div onClick={this.wasClicked} className="ui primary button">
                                Search
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Start;