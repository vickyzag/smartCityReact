import React from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {loadCourses, deleteCourse, addCourse} from './API';
import editIcon from "../edit.png";
import deleteIcon from "../delete.png";

class Courses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            coursesToShow: [],
            id_sport_hall: 0,
            id_room: 0,
            starting_date_time: "",
            ending_date_time: "",
            level: "",
            activity: "",
            instructor: "",
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
                const result = await loadCourses();
                const state = {
                    loaded: true,
                    loading: false,
                    courses: result,
                    coursesToShow: result,
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
        await deleteCourse(id);
        this.search();
    }
    async addCourse(event){
        event.preventDefault();
        try {
            await addCourse(this.state.id_sport_hall,this.state.id_room, this.state.starting_date_time, this.state.ending_date_time, this.state.level, this.state.activity, this.state.instructor)
        } catch (e){
            console.log(e);
        }
        this.search();
    }


    changeValuesToShow(string){
        const coursesToShow = this.state.courses;
        const afterFiltering = coursesToShow.filter(h => {
            return (h.activity.toLowerCase().includes(string.toLowerCase()) || h.level.toLowerCase().includes(string.toLowerCase()));
        });
        this.setState({coursesToShow: afterFiltering});
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
                            <th>Sport hall</th>
                            <th>Room id</th>
                            <th>Starting date time</th>
                            <th>Ending date time</th>
                            <th>Level</th>
                            <th>Activity</th>
                            <th>Instructor</th>
                            <th>Customers</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.coursesToShow.map((h, index) => {
                            return (
                                <tr key={index}>
                                    <td> {h.sport_hall.name}</td>
                                    <td>
                                        <Link to={`/room/${h.sport_hall.id}-${h.id_room}`}>{h.id_room}</Link>
                                    </td>
                                    <td>{h.starting_date_time}</td>
                                    <td>{h.ending_date_time}</td>
                                    <td>{h.level}</td>
                                    <td>{h.activity}</td>
                                    <td>{h.instructor}</td>
                                    <td>
                                        <Link to={`/courseCustomer/course/${h.courseId}`}>Go to list</Link>
                                    </td>
                                    <td>
                                        <Link to={`/course/${h.courseId}`}><img src={editIcon} className="options-icon" alt="modify"/></Link>
                                    </td>
                                    <td>
                                        <img src={deleteIcon} className="options-icon" alt="delete"  onClick={(e) => this.deleteById(h.courseId)}/>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                    <form onSubmit={(event) => this.addCourse(event)}>
                        <label>Sport hall id: </label>
                        <input type="number"
                               onChange={(event) => {
                                   this.setState({id_sport_hall: event.target.value});
                               }}
                               require/>
                        <label>Room id: </label>
                        <input type="number"
                               onChange={(event) => {
                                   this.setState({id_room: event.target.value});
                               }}
                               require/>
                        <label>Starting date time: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({starting_date_time: event.target.value});
                               }}
                               require/>
                        <label>Ending date time: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({ending_date_time: event.target.value});
                               }}
                               require/>
                        <label>Level: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({level: event.target.value});
                               }}
                               require/>
                        <label>Activity: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({activity: event.target.value});
                               }}
                               require/>
                        <label>Instructor email: </label>
                        <input type="email"
                               onChange={(event) => {
                                   this.setState({instructor: event.target.value});

                               }}
                               />
                        <button type="submit">Add</button>
                    </form>
                </div>
            );
        }
    }
}


export default (Courses)