import React from 'react';
import {loadSportHall, modifySportHall} from './API';


class SportHall extends React.Component{

    constructor(props) {
        super(props);
        const state = {
            sportHallId : parseInt(props.match.params.id),
            name: "",
            manager: "",
            phone_number: "",
            email: "",
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


    async modifySportHall(event){
        event.preventDefault();
        await modifySportHall(this.state.sportHallId, this.state.name,this.state.manager, this.state.phone_number, this.state.email, this.state.address, this.state.city_name, this.state.zip_code, this.state.country)
        this.search();
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadSportHall(this.state.sportHallId);
                const state = {
                    loaded: true,
                    loading: false,
                    sportHallId: result.sportHallId,
                    name: result.name,
                    manager: result.manager,
                    phone_number: result.phone_number,
                    email: result.email,
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
                <p>Id: {this.state.sportHallId}</p>
                <label>Name: </label>
                <input type="text"
                       value={this.state.name}
                       onChange={(e) => this.setState({name: e.target.value})}
                       required
                /><br/>
                <label>Manager: </label>
                <input type="text"
                       value={this.state.manager}
                       onChange={(e) => this.setState({manager: e.target.value})}
                       required
                /><br/>
                <label>Phone number: </label>
                <input type="text"
                       value={this.state.phone_number}
                       onChange={(e) => this.setState({phone_number: e.target.value})}
                       required
                /><br/>
                <label>Email: </label>
                <input type="text"
                       value={this.state.email}
                       onChange={(e) => this.setState({email: e.target.value})}
                       required
                /><br/>
                <label>Address: </label>
                <input type="text"
                       value={this.state.address}
                       onChange={(e) => this.setState({address: e.target.value})}
                       required
                /><br/>
                <label>City name:</label>
                <input type="text"
                       value={this.state.city_name}
                       onChange={(e) => this.setState({city_name: e.target.value})}
                       required
                /><br/>
                <label>Zip code:</label>
                <input type="number"
                       value={this.state.zip_code}
                       onChange={(e) => this.setState({zip_code: e.target.value})}
                       required
                /><br/>
                <label>Country:</label>
                <input type="text"
                       value={this.state.country}
                       onChange={(e) => this.setState({country: e.target.value})}
                       required
                /><br/>
                <button onClick={(event) => this.modifySportHall(event)}>Modify</button>

            </form>
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}





export default SportHall;