import React, { Component } from 'react';
import Select from 'react-select';


class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Select
               value={this.props.selectedOption}
               onChange={this.props.handleOptionChange}
               options={this.props.options} /> 
        )
    }

}

export default Search;