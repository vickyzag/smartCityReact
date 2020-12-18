import React from 'react';
import SearchBar from "./SearchBar";


class CourseInformations extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.courses,
            coursesToShow: this.props.courses,
        }
    }

    changeValuesToShow(string){
        const coursesToShow = this.state.courses;
        const afterFiltering = coursesToShow.filter(h => {
            return (h.sport_hall.toLowerCase().includes(string.toLowerCase()) || h.activity.toLowerCase().includes(string.toLowerCase()) || h.level.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({coursesToShow: afterFiltering});
    }

    render(){
        return (
            <div>

                <SearchBar callback={(searchValue) => this.changeValuesToShow(searchValue)}/>
                <table>
                    <thead>
                    <tr>
                        <th>Sport hall</th>
                        <th>Room</th>
                        <th>Starting date time</th>
                        <th>Ending date time</th>
                        <th>Level</th>
                        <th>Activity</th>
                        <th>Instructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.coursesToShow.map((h, index) => {
                        return (
                            <tr key={index}>
                                <td>{h.sport_hall}</td>
                                <td>{h.id_room}</td>
                                <td>{h.starting_date_time}</td>
                                <td>{h.ending_date_time}</td>
                                <td>{h.level}</td>
                                <td>{h.activity}</td>
                                <td>{h.instructor.email}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default (CourseInformations);