import React from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadSportHalls, deleteSportHall} from './API';
import editIcon from "../edit.png";
import deleteIcon from "../delete.png";

class Courses extends React.Component{

    constructor(props) {
        super(props);

    }



    render(){
        return(
            <div>
                Course
            </div>
        );
    }
}



export default Courses;