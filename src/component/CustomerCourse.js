import React from 'react';
import {
    loadCustomerCourses
} from './API';
import CourseInformations from "./CourseInformations";

class CustomerCourses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customer : props.match.params.email,
            courses: [],
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
                const result = await loadCustomerCourses(this.state.customer);
                const state = {
                    loaded: true,
                    loading: false,
                    courses: result,
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
        } else if (this.state.courses.length === 0){
            return (<p>No course for this customer</p>);
        }else {
            return (
                <CourseInformations
                    courses={this.state.courses}
                />
            );
        }
    }
}


export default (CustomerCourses);