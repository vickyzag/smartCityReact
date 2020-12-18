import React from 'react';
import {loadCustomer, modifyCustomer} from './API';


class Customer extends React.Component{

    constructor(props) {
        super(props);
        const state = {
            id : parseInt(props.match.params.id),
            first_name: "",
            last_name: "",
            birth_date: "",
            gender: 0,
            phone_number: "",
            email: "",
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
        await modifyCustomer(this.state.id, this.state.first_name,this.state.last_name, this.state.birth_date, this.state.gender, this.state.phone_number, this.state.email, this.state.password, this.state.language, this.state.address, this.state.city_name, this.state.zip_code, this.state.country)
        this.search();
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadCustomer(this.state.id);
                const state = {
                    loaded: true,
                    loading: false,
                    id: result.id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    birth_date: result.birth_date,
                    gender: result.gender,
                    phone_number: result.phone_number,
                    email: result.email,
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
                    <p>Id: {this.state.id}</p>
                    <label>Id: </label>
                    <input type="text"
                           value={this.state.id}
                           onChange={(e) => {
                               this.setState({id: e.target.value});}}
                           required
                    /><br/>
                    <label>First name: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputFirstName: event.target.value});}}
                    /><label>Last name: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputLastName: event.target.value});}}
                           required
                    />
                    <label>Gender: </label>
                    <input type="number"
                           onChange={(event) => {
                               this.setState({inputGender: event.target.value});}}
                           required
                    />
                    <label>Birth date: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputBirthDate: event.target.value});}}
                           required
                    />
                    <label>Phone number: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputPhoneNumber: event.target.value});}}
                           required
                    />
                    <label>Email: </label>
                    <input type="email"
                           onChange={(event) => {
                               this.setState({inputEmail: event.target.value});}}
                           required
                    />
                    <label>Language: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputLanguage: event.target.value});}}
                           required
                    />
                    <label>Address: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputAddress: event.target.value});}}
                           required
                    />
                    <label>City: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputCity: event.target.value});}}
                           required
                    />
                    <label>Zip code: </label>
                    <input type="number"
                           onChange={(event) => {
                               this.setState({inputZipCode: event.target.value});}}
                           required
                    />
                    <label>Country: </label>
                    <input type="text"
                           onChange={(event) => {
                               this.setState({inputCountry: event.target.value});}}
                           required
                    />
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