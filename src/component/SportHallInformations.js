import React from 'react';
import SearchBar from "./SearchBar";


class SportHallInformations extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sportHalls: this.props.sportHalls,
            sportHallsToShow: this.props.sportHalls,
        }
    }

    changeValuesToShow(string){
        const sportHallsToShow = this.state.sportHalls;
        const afterFiltering = sportHallsToShow.filter(h => {
            return (h.name.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({sportHallsToShow: afterFiltering});
    }

    render(){
        return (
            <div>

                <SearchBar callback={(searchValue) => this.changeValuesToShow(searchValue)}/>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.sportHallsToShow.map((h, index) => {
                        return (
                            <tr key={index}>
                                <td>{h.name}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default (SportHallInformations);