import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../component/Login';
import SportHalls from '../component/SportHalls';
import SportHall from '../component/SportHall';
import SportHallCustomers from '../component/SportHallCustomers';
import Courses from '../component/Courses';
import Course from '../component/Course';
import CourseCustomers from '../component/CourseCustomers'
import Room from '../component/Room'
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
                <Route path="/courses" component={Courses}>
                </Route>
                <Route path="/course/:id" component={Course}>
                </Route>
                <Route path="/courseCustomer/course/:id" component={CourseCustomers}>
                </Route>
                <Route path="/sportHallCustomer/sportHall/:id" component={SportHallCustomers}>
                </Route>
                <Route path="/room/:id" component={Room}>
                </Route>
                <Route path="/" component={Home}>
                </Route>
            </Switch>
        </Router>
    );
}