import React from 'react';

class SearchBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            searchValue : "",
            callback: props.callback
        }
    }

    changeSearchValue(event){
        console.log("avant update: " + this.state.searchValue);
        this.setState({searchValue: event.target.value}, () => {
            console.log("apres update: " + this.state.searchValue);
            this.state.callback(this.state.searchValue);
        });
    }

    render(){
        return <input
            type="text"
            placeholder="Search"
            onChange={
                (event) => this.changeSearchValue(event)
            }/>
    }

}

export default SearchBar;