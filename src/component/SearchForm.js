import React from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadSportHalls, deleteSportHall} from './API';
import editIcon from "../edit.png";
import deleteIcon from "../delete.png";

class SearchForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sportHalls: [],
            sportHallsToShow: [],
            inputName: "",
            inputManager: "",
            inputPhoneNumber: "",
            inputEmail: "",
            inputAddress: "",
            inputZipCode: "",
            inputCity: "",
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
                const result = await loadSportHalls();
                const state = {
                    loaded: true,
                    loading: false,
                    sportHalls: result,
                    sportHallsToShow: result,
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
    async deleteById(id){
        await deleteSportHall(id);
    }
    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            this.setState({
                sportHalls: this.props.sportHalls,
                sportHallsToShow: this.props.sportHalls
            });
        }
    }

    changeValuesToShow(string){
        const sportHallsToShow = this.state.sportHalls;
        const afterFiltering = sportHallsToShow.filter(h => {
            return (h.name.toLowerCase().includes(string.toLowerCase()) || h.address.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({sportHallsToShow: afterFiltering});
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
                            <th>Name</th>
                            <th>Manager</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.sportHallsToShow.map((h, index) => {
                            return (
                                <tr key={index}>
                                    <td>{h.name}</td>
                                    <td>{h.manager}</td>
                                    <td>{h.phone_number}</td>
                                    <td>{h.email}</td>
                                    <td>{h.address}</td>
                                    <td>
                                        <Link to={`/sportHall/${h.id}`}><img src={editIcon} className="options-icon" alt="modify"/></Link>
                                    </td>
                                    <td>
                                        <img src={deleteIcon} className="options-icon" alt="delete"  onClick={(e) => this.deleteById(h.id)}/>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                    <form>
                        <label>Name: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputName: event.target.value});
                               }}/>
                        <label>Manager: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputManager: event.target.value});
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
                        <label>Address: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputAddress: event.target.value});
                               }}/>
                        <label>Zip code: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputZipCode: event.target.value});
                               }}/>
                        <label>City: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputCity: event.target.value});
                               }}/>
                        <label>Country: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputCountry: event.target.value});
                               }}/>
                        <button onClick={(event) => this.addSportHall(event)}>Ajouter</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        sportHalls : state.sportHalls.listeSportHalls
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSportHall: (sportHallObjet) => {
            dispatch({type: "addSportHall", payload:{newSportHall: sportHallObjet}});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);