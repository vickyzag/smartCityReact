import React from 'react';
import SearchBar from "./SearchBar";


class CustomerInformations extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.customers,
            customersToShow: this.props.customers,
        }
    }

    changeValuesToShow(string){
        const customersToShow = this.state.customers;
        const afterFiltering = customersToShow.filter(h => {
            return (h.first_name.toLowerCase().includes(string.toLowerCase()) || h.last_name.toLowerCase().includes(string.toLowerCase())|| h.email.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({customersToShow: afterFiltering});
    }

    render(){
            return (
                <div>

                    <SearchBar callback={(searchValue) => this.changeValuesToShow(searchValue)}/>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.customersToShow.map((h, index) => {
                            return (
                                <tr key={index}>
                                    <td>{h.first_name}</td>
                                    <td>{h.last_name}</td>
                                    <td>{h.email}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
    }
}
export default (CustomerInformations);