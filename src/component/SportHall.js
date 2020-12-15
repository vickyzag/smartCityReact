import React from 'react';
import {loadData} from './API';
import SportHallInFormation from './SportHallInformation'


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

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadData(this.state.sportHallId);
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
            Content = <SportHallInFormation
                sportHallId={this.state.sportHallId}
                name={this.state.name}
                manager={this.state.manager}
                phone_number={this.state.phone_number}
                email={this.state.email}
                address={this.state.address}
                city_name={this.state.city_name}
                zip_code={this.state.zip_code}
                country={this.state.country}
            />
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}





export default SportHall;