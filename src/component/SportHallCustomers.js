import React from 'react';
import {
    loadSportHallCustomers
} from './API';
import CustomerInformations from "./CustomerInformations";

class SportHallCustomers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sportHallId : parseInt(props.match.params.id),
            customers: [],
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
                const result = await loadSportHallCustomers(this.state.sportHallId);
                const state = {
                    loaded: true,
                    loading: false,
                    customers: result,
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
        } else if (this.state.customers.length === 0){
            return (<p>No customer for this sport hall</p>);
        }else {
            return (
                <CustomerInformations
                    customers={this.state.customers}
                    />
            );
        }
    }
}


export default (SportHallCustomers);