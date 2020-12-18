import React from 'react';
import {loadRoom, modifyRoom, deleteRoom} from './API';


class Room extends React.Component{
    constructor(props) {
        super(props);
        const idTexte = props.match.params.id;
        const id = idTexte.split('-');
        const state = {
            id_room: id[1],
            sport_hall : {
                id_sport_hall: id[0],
                name: "",
            },
            max_capacity: 0,
            input_max_capacity: 0,
            loading: true,
            error: false,
            errorMessage: "",
        };
        this.state = state;
    }

    componentDidMount() {
        this.search();
    }


    async modifyRoom(event){
        event.preventDefault();
        await modifyRoom(this.state.id_room, this.state.sport_hall.id_sport_hall,this.state.input_max_capacity);
        this.search();
    }

    async deleteRoom(event){
        event.preventDefault();
        await deleteRoom(this.state.id_room, this.state.sport_hall.id_sport_hall);
        this.props.history.push("/courses");
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadRoom(this.state.id_room, this.state.sport_hall.id_sport_hall);
                const state = {
                    loaded: true,
                    loading: false,
                    id_room: result.id_room,
                    sport_hall: result.sport_hall,
                    max_capacity: result.max_capacity,
                    input_max_capacity: result.max_capacity
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
                <div>
                    <p>Infos:</p>
                    <p>Room: {this.state.id_room} - Sporthall: {this.state.sport_hall.name} - Max capacity: {this.state.max_capacity}</p>
                    <p>Modify:</p>
                    <form>
                        <label>Max capacity: </label>
                        <input type="text"
                               value={this.state.input_max_capacity}
                               onChange={(e) => this.setState({input_max_capacity: e.target.value})}
                               required
                        /><br/>
                        <button onClick={(event) => this.modifyRoom(event)}>Modify</button>
                    </form>
                    <p>Delete:</p>
                    <button onClick={(event) => this.deleteRoom(event)}>Delete</button>
                </div>
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}

export default (Room)