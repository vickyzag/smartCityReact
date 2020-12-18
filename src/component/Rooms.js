import React from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {loadRooms, addRoom, deleteRoom} from './API';
import editIcon from "../edit.png";
import deleteIcon from "../delete.png";

class Rooms extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            roomsToShow: [],
            inputIdRoom: "",
            inputIdSportHall: "",
            inputMaxCapacity: "",
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
                const result = await loadRooms();
                const state = {
                    loaded: true,
                    loading: false,
                    rooms: result,
                    roomsToShow: result,
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
    async deleteById(id_room, id_sport_hall){
        await deleteRoom(id_room, id_sport_hall);
        this.search();
    }
    async addRoom(event){
        event.preventDefault();
        await addRoom(this.state.inputIdRoom,this.state.inputIdSportHall, this.state.inputMaxCapacity)
        this.search();
    }
    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            this.setState({
                rooms: this.props.rooms,
                roomsToShow: this.props.rooms
            });
        }
    }

    changeValuesToShow(id){
        const roomsToShow = this.state.rooms;
        const afterFiltering = roomsToShow.filter(h => {
            return (h.id_sport_hall.includes(id));
        });
        this.setState({roomsToShow: afterFiltering});
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
                            <th>Room</th>
                            <th>Sport hall</th>
                            <th>Max capacity</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.roomsToShow.map((h, index) => {
                            return (
                                <tr key={index}>
                                    <td>{h.id_room}</td>
                                    <td>{h.id_sport_hall.name}</td>
                                    <td>{h.max_capacity}</td>
                                    <td>
                                        <Link to={`/room/${h.id_sport_hall}-${h.id_room}`}><img src={editIcon} className="options-icon" alt="modify"/></Link>
                                    </td>
                                    <td>
                                        <img src={deleteIcon} className="options-icon" alt="delete"  onClick={(e) => this.deleteById(h.id_room, h.id_sport_hall)}/>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                    <form>
                        <label>Room: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputIdRoom: event.target.value});
                               }}/>
                        <label>Sport hall: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputIdSportHall: event.target.value});
                               }}/>
                        <label>Max capacity: </label>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({inputMaxCapacity: event.target.value});
                               }}/>
                        <button onClick={(event) => this.addRoom(event)}>Add</button>
                    </form>
                </div>
            );
        }
    }
}

export default (Rooms)