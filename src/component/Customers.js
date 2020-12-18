import React from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {loadCustomers, addCustomer, addManager, deleteCustomer} from './API';
import editIcon from "../edit.png";
import deleteIcon from "../delete.png";

class Customers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customersToShow: [],
            inputFirstName: "",
            inputLastName: "",
            inputBirthDate: "",
            inputGender: 0,
            inputPhoneNumber: "",
            inputEmail: "",
            inputPassword: "",
            inputIsInstructor: 0,
            inputLanguage: "",
            inputAddress: "",
            inputCity: "",
            inputZipCode: "",
            inputCountry: "",
            loading: true,
            error: false,
            errorMessage: "",
        };
    }
    componentDidMount() {
        this.search();
    }
    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadCustomers();
                const state = {
                    loaded: true,
                    loading: false,
                    customers: result,
                    customersToShow: result,
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
    async deleteByEmail(email){
        await deleteCustomer(email);
        this.search();
    }
    async addCustomer(event){
        event.preventDefault();
        await addCustomer(this.state.inputFirstName,this.state.inputLastName, this.state.inputBirthDate, this.state.inputGender, this.state.inputPhoneNumber, this.state.inputEmail, this.state.inputPassword, this.state.inputLanguage, this.state.inputAddress, this.state.inputCity, this.state.inputZipCode, this.state.inputCountry)
        this.search();
    }

    async addManager(event){
        event.preventDefault();
        await addManager(this.state.inputFirstName,this.state.inputLastName, this.state.inputBirthDate, this.state.inputGender, this.state.inputPhoneNumber, this.state.inputEmail, this.state.inputPassword, this.state.inputLanguage, this.state.inputAddress, this.state.inputCity, this.state.inputZipCode, this.state.inputCountry)
        this.search();
    }



    changeValuesToShow(string){
        const customersToShow = this.state.customers;
        const afterFiltering = customersToShow.filter(h => {
            return (h.first_name.toLowerCase().includes(string.toLowerCase()) || h.last_name.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({customersToShow: afterFiltering});
    }

    render() {
        if(this.state.loading === true){
            return (<p>Loading ...</p>);
        } else if(this.state.error){
            return (<p>{this.state.errorMessage}</p>);
        } else {
            return (
                <div>
                    <SearchBar callback={(searchValue) => this.changeValuesToShow(searchValue)}/>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Gender</th>
                            <th>Birth date</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Inscription date</th>
                            <th>Is manager</th>
                            <th>Is instructor</th>
                            <th>Language</th>
                            <th>Address</th>
                            <th>Sport halls</th>
                            <th>Courses</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.customersToShow.map((h, index) => {
                            return (
                                <tr key={index}>
                                    <td>{h.first_name}</td>
                                    <td>{h.last_name}</td>
                                    <td>{h.gender}</td>
                                    <td>{h.birth_date}</td>
                                    <td>{h.phone_number}</td>
                                    <td>{h.email}</td>
                                    <td>{h.inscription_date}</td>
                                    <td>{h.is_manager}</td>
                                    <td>{h.is_instructor}</td>
                                    <td>{h.language}</td>
                                    <td>{h.address}</td>
                                    <td>
                                        <Link to={`/sportHallCustomer/customer/${h.email}`}>Go to list</Link>
                                    </td>
                                    <td>
                                        <Link to={`/courseCustomer/customer/${h.email}`}>Go to list</Link>
                                    </td>
                                    <td>
                                        <Link to={`/customer/${h.email}`}><img src={editIcon} className="options-icon" alt="modify"/></Link>
                                    </td>
                                    <td>
                                        <img src={deleteIcon} className="options-icon" alt="delete"  onClick={(e) => this.deleteByEmail(h.email)}/>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                    <form>
                        <label>First name: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputFirstName: event.target.value});
                               }}/>
                        <label>Last name: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputLastName: event.target.value});
                               }}/>
                        <label>Gender: </label>
                        <input type="number"
                               onChange={(event) => {
                                   this.setState({inputGender: event.target.value});
                               }}/>
                        <label>Birth date: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputBirthDate: event.target.value});
                               }}/>
                        <label>Phone number: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputPhoneNumber: event.target.value});
                               }}/>
                        <label>Email: </label>
                        <input type="email"
                               onChange={(event) => {
                                   this.setState({inputEmail: event.target.value});
                               }}/>
                        <label>Password: </label>
                        <input type="password"
                               onChange={(event) => {
                                   this.setState({inputPassword: event.target.value});
                               }}/>
                        <label>Language: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputLanguage: event.target.value});
                               }}/>
                        <label>Address: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputAddress: event.target.value});
                               }}/>
                        <label>City: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputCity: event.target.value});
                               }}/>
                        <label>Zip code: </label>
                        <input type="number"
                               onChange={(event) => {
                                   this.setState({inputZipCode: event.target.value});
                               }}/>
                        <label>Country: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputCountry: event.target.value});
                               }}/>
                        <button onClick={(event) => this.addCustomer(event)}>Add as customer</button>
                        <button onClick={(event) => this.addManager(event)}>Add as manager</button>
                    </form>
                </div>
            );
        }
    }
}


export default (Customers);