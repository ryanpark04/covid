import React from 'react';

class SearchBox extends React.Component {
    state = { term: '' }

    onFormSubmit = event => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.term);
    }

    render() {
        return (
            <div className="ui search">
                <form onSubmit={this.onFormSubmit} className="ui icon input">
                    <input className="prompt" type="text" onChange={e => this.setState({ term: e.target.value })} placeholder="Search zipcodes..." />
                    <i className="search icon"></i>
                </form>
                <div className="results"></div>
            </div>
        );
    }
}

export default SearchBox;