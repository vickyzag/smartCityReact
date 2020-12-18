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
import CustomerSportHalls from '../component/CustomerSportHalls';
import Courses from '../component/Courses';
import Course from '../component/Course';
import Customer from '../component/Customer';
import Customers from '../component/Customers';
import CourseCustomers from '../component/CourseCustomers';
import CustomerCourses from '../component/CustomerCourse';
import Room from '../component/Room';
import Rooms from '../component/Rooms';
import Home from '../component/Home';
import Admin from '../component/Admin';

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
                <Route path="/courseCustomer/customer/:email" component={CustomerCourses}>
                </Route>
                <Route path="/sportHallCustomer/sportHall/:id" component={SportHallCustomers}>
                </Route>
                <Route path="/sportHallCustomer/customer/:email" component={CustomerSportHalls}>
                </Route>
                <Route path="/room/:id" component={Room}>
                </Route>
                <Route path="/rooms/" component={Rooms}>
                </Route>
                <Route path="/customers" component={Customers}>
                </Route>
                <Route path="/customer/:email" component={Customer}>
                </Route>
                <Route path="/admin/" component={Admin}>
                </Route>
                <Route path="/" component={Home}>
                </Route>
            </Switch>
        </Router>
    );
}