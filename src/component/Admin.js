import React from 'react';
import SearchBar from './SearchBar';
import {addAdmin} from './API';

class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inputEmail: "",
            inputPassword: "",
            loaded: false,
            error: false,
            errorMessage: "",
        };
    }

    async addAdmin(event){
        event.preventDefault();
        try{
        await addAdmin(this.state.inputEmail, this.state.inputPassword)
        } catch (e) {
            this.setState({
                error: true,
                errorMessage: e.message,
            })
        }
        this.setState({
            loaded: true
        })
    }

    render() {
        if(this.state.error){
            return (<p>{this.state.errorMessage}</p>);
        } else if(this.state.loaded){
            return (<p>Administrator added</p>);
        } else {
            return (
                <div>
                    <form onSubmit={(event) => this.addAdmin(event)}>
                        <label>Email: </label>
                        <input type="email"
                               onChange={(event) => {
                                   this.setState({inputEmail: event.target.value});
                               }}
                               required
                        />
                        <label>Password: </label>
                        <input type="password"
                               onChange={(event) => {
                                   this.setState({inputPassword: event.target.value});
                               }}
                               required
                        />

                        <button type="submit">Add</button>
                    </form>
                </div>
            );
        }
    }
}

export default (Admin)