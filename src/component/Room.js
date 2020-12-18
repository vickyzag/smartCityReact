import React from 'react';
import {loadRoom, modifyRoom} from './API';


class Room extends React.Component{

    constructor(props) {
        super(props);
        const state = {
            id_room : parseInt(props.match.params.id_room),
            id_sport_hall : parseInt(props.match.params.id_sport_hall),
            max_capacity: 0,
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
        await modifyRoom(this.state.id_room, this.state.id_sport_hall,this.state.max_capacity);
        this.search();
    }

    search() {
        this.setState({loading: true, error: false}, async () => {
            try{
                const result = await loadRoom(this.state.id_room, this.state.id_sport_hall);
                const state = {
                    loaded: true,
                    loading: false,
                    id_room: result.id_room,
                    id_sport_hall: result.id_sport_hall,
                    max_capacity: result.max_capacity
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
                <form>
                    <p>Room: {this.state.id_room} - Sporthall: {this.state.id_sport_hall}</p>
                    <label>Room: </label>
                    <input type="text"
                           value={this.state.id_room}
                           onChange={(e) => this.setState({id_room: e.target.value})}
                           required
                    /><br/>
                    <label>Sport hall: </label>
                    <input type="text"
                           value={this.state.id_sport_hall}
                           onChange={(e) => this.setState({id_sport_hall: e.target.value})}
                           required
                    /><br/>
                    <label>Max capacity: </label>
                    <input type="text"
                           value={this.state.max_capacity}
                           onChange={(e) => this.setState({max_capacity: e.target.value})}
                           required
                    /><br/>
                    <button onClick={(event) => this.modifyRoom(event)}>Modify</button>
                </form>
        }

        return(
            <div>
                {Content}
            </div>
        );
    }
}

export default (Room)