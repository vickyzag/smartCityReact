import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../component/Login';
import SportHalls from '../component/SportHalls';
import SportHall from '../component/SportHall';
import Courses from '../component/Courses';
import Course from '../component/Course';
import Home from '../component/Home';

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/login" component={Login}>
                </Route>
                <Route path="/sportHalls" component={SportHalls}>
                </Route>
                <Route path="/sportHall/:id" component={SportHall}>
                </Route>
                <Route path="/sportHall/delete/:id" component={SportHall}>
                </Route>
                <Route path="/courses" component={Courses}>
                </Route>
                <Route path="/courses/:id" component={Course}>
                </Route>
                <Route path="/courses/:id" component={Home}>
                </Route>
            </Switch>
        </Router>
    );
}