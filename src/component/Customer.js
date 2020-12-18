import React from 'react';
import {loadCustomer, modifyCustomer} from './API';


class Customer extends React.Component{

    constructor(props) {
        super(props);
        const state = {
            email : props.match.params.email,
            first_name: "",
            last_name: "",
            birth_date: "",
            gender: 0,
            phone_number: "",
            newEmail: "",
            password: "",
            is_instructor: "",
            language: "",
            address: "",
            city_name: "",
            zip_code: 0,
            country: "",
            loading: true,
            error: false,
            errorMessage: "",
        };
        this.state = state;
    }

    componentDidMount() {
        this.search();
    }


    async modifyCustomer(event){
        event.preventDefault();
        await modifyCustomer(this.state.email, this.state.first_name,this.state.last_name, this.state.birth_date, this.state.gender, this.state.phone_number, this.state.newEmail, this.state.password, this.state.language, this.state.address, this.state.city_name, this.state.zip_code, this.state.country)
        this.search();
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadCustomer(this.state.email);
                const state = {
                    loaded: true,
                    loading: false,
                    id: result.id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    birth_date: result.birth_date,
                    gender: result.gender,
                    phone_number: result.phone_number,
                    newEmail: result.email,
                    password: result.password,
                    language: result.language,
                    address: result.address,
                    city_name: result.city_name,
                    zip_code: result.zip_code,
                    country: result.country
                };
                this.setState(state);
            } catch (e) {
                this.setState({
                    error: true,
                    loading: false,
                    loaded: true,
                    errorMessage: e.message
                });
            }
        });
    }

    render(){
        let Content;
        if(this.state.loading === true){
            Content =  <p>Loading ...</p>
        } else if(this.state.error){
            Content = <p>{this.state.errorMessage}</p>
        } else {
            Content =
                <form>
                    <p>Customer email: {this.state.email}</p>
                    <label>Id: </label>
                    <input type="text"
                           value={this.state.id}
                           onChange={(e) => {
                               this.setState({id: e.target.value});}}
                           required
                    /><br/>
                    <label>First name: </label>
                    <input type="text"
                           value={this.state.first_name}
                           onChange={(event) => {
                               this.setState({first_name: event.target.value});}}
                    /><br/>
                    <label>Last name: </label>
                    <input type="text"
                           value={this.state.last_name}
                           onChange={(event) => {
                               this.setState({last_name: event.target.value});}}
                           required
                    /><br/>
                    <label>Gender: </label>
                    <input type="number"
                           value={this.state.gender}
                           onChange={(event) => {
                               this.setState({gender: event.target.value});}}
                           required
                    /><br/>
                    <label>Birth date: </label>
                    <input type="text"
                           value={this.state.birth_date}
                           onChange={(event) => {
                               this.setState({birth_date: event.target.value});}}
                           required
                    /><br/>
                    <label>Phone number: </label>
                    <input type="text"
                           value={this.state.phone_number}
                           onChange={(event) => {
                               this.setState({phone_number: event.target.value});}}
                           required
                    /><br/>
                    <label>Email: </label>
                    <input type="email"
                           value={this.state.newEmail}
                           onChange={(event) => {
                               this.setState({newEmail: event.target.value});}}
                           required
                    /><br/>
                    <label>Language: </label>
                    <input type="text"
                           value={this.state.language}
                           onChange={(event) => {
                               this.setState({language: event.target.value});}}
                           required
                    /><br/>
                    <label>Address: </label>
                    <input type="text"
                           value={this.state.address}
                           onChange={(event) => {
                               this.setState({address: event.target.value});}}
                           required
                    /><br/>
                    <label>City: </label>
                    <input type="text"
                           value={this.state.city_name}
                           onChange={(event) => {
                               this.setState({city_name: event.target.value});}}
                           required
                    /><br/>
                    <label>Zip code: </label>
                    <input type="number"
                           value={this.state.zip_code}
                           onChange={(event) => {
                               this.setState({zip_code: event.target.value});}}
                           required
                    /><br/>
                    <label>Country: </label>
                    <input type="text"
                           value={this.state.country}
                           onChange={(event) => {
                               this.setState({country: event.target.value});}}
                           required
                    /><br/>
                    <button onClick={(event) => this.modifyCustomer(event)}>Modify</button>

                </form>
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}


export default (Customer);