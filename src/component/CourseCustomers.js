import React from 'react';
import {
    loadCourseCustomers
} from './API';
import CustomerInformations from "./CustomerInformations";

class CourseCustomers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId : parseInt(props.match.params.id),
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
                const result = await loadCourseCustomers(this.state.courseId);
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
            return (<p>No customer for this course</p>);
        }else {
            return (
                <CustomerInformations
                    customers={this.state.customers}
                    />
            );
        }
    }
}


export default (CourseCustomers);