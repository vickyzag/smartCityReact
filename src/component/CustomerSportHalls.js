import React from 'react';
import {
    loadCustomerSportHalls
} from './API';
import SportHallInformations from "./SportHallInformations";

class CustomerSportHalls extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customer : props.match.params.email,
            sportHalls: [],
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
                const result = await loadCustomerSportHalls(this.state.customer);
                const state = {
                    loaded: true,
                    loading: false,
                    sportHalls: result,
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


    render() {
        if(this.state.loading === true){
            return (<p>Loading ...</p>);
        } else if(this.state.error){
            return (<p>{this.state.errorMessage}</p>);
        } else if (this.state.sportHalls.length === 0){
            return (<p>No sport hall for this customer</p>);
        }else {
            return (
                < SportHallInformations
                    sportHalls={this.state.sportHalls}
                />
            );
        }
    }
}


export default (CustomerSportHalls);