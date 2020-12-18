import React from 'react';
import {loadCourse, modifyCourse} from './API';


class Course extends React.Component{

    constructor(props) {
        super(props);
        const state = {
            courseId : parseInt(props.match.params.id),
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
        this.state = state;
    }

    componentDidMount() {
        this.search();
    }


    async modifyCourse(event){
        event.preventDefault();
            await modifyCourse(this.state.courseId, this.state.id_sport_hall, this.state.id_room,this.state.starting_date_time, this.state.ending_date_time, this.state.level, this.state.activity, this.state.instructor)
            this.search();
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadCourse(this.state.courseId);
                const state = {
                    loaded: true,
                    loading: false,
                    courseId: result.courseId,
                    id_sport_hall: result.id_sport_hall,
                    id_room: result.id_room,
                    starting_date_time: result.starting_date_time,
                    ending_date_time: result.ending_date_time,
                    level: result.level,
                    activity: result.activity,
                    instructor: result.instructor,
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
                <form onSubmit={(event) => this.modifyCourse(event)}>
                <p>Id: {this.state.courseId}</p>
                <label>Sport hall id: </label>
                <input type="number"
                       value={this.state.id_sport_hall}
                       onChange={(e) => this.setState({id_sport_hall: e.target.value})}
                       required
                /><br/>
                <label>Room id: </label>
                <input type="number"
                       value={this.state.id_room}
                       onChange={(e) => this.setState({id_room: e.target.value})}
                       required
                /><br/>
                <label>Starting date time: </label>
                <input type="text"
                       value={this.state.starting_date_time}
                       onChange={(e) => this.setState({starting_date_time: e.target.value})}
                       required
                /><br/>
                <label>Ending date time: </label>
                <input type="text"
                       value={this.state.ending_date_time}
                       onChange={(e) => this.setState({ending_date_time: e.target.value})}
                       required
                /><br/>
                <label>Level: </label>
                <input type="text"
                       value={this.state.level}
                       onChange={(e) => this.setState({level: e.target.value})}
                       required
                /><br/>
                <label>Activity:</label>
                <input type="text"
                       value={this.state.activity}
                       onChange={(e) => this.setState({activity: e.target.value})}
                       required
                /><br/>
                <label>Instructor email:</label>
                <input type="email"
                       value={this.state.instructor}
                       onChange={(e) => this.setState({instructor: e.target.value})}
                       required
                /><br/>

                <button type="submit">Modify</button>

            </form>
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}





export default Course;