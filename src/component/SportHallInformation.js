import React from 'react';

export default (props) => {
    return(
        <form>
            <p>Id: {props.sportHallId}</p>
            <label>Name: </label>
                <input type="text"
                   value={props.name}
                   onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Manager: </label>
                <input type="text"
                   value={props.manager}
                   onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Phone number: </label>
                <input type="text"
                       value={props.phone_number}
                       onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Email: </label>
                <input type="text"
                       value={props.email}
                       onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Address: </label>
                <input type="text"
                       value={props.address}
                       onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>City name:</label>
                <input type="text"
                       value={props.city_name}
                       onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Zip code:</label>
                <input type="text"
                       value={props.zip_code}
                       onChange={(e) => this.setState({name: e.target.value})}
                /><br/>
            <label>Country:</label>
            <input type="text"
                   value={props.country}
                   onChange={(e) => this.setState({name: e.target.value})}
            /><br/>
        </form>
    );
}