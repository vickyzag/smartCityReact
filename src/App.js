import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import logo from './logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {

    const classes = useStyles();

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href="/sportHalls">Sport Halls</Button>
                    <Button color="inherit" href="/courses">Courses</Button>
                    <Button color="inherit" href="/customer">Customers</Button>
                    <Button color="inherit" href="/manager">Manager</Button>
                    <Button color="inherit" href="/admin">Admin</Button>
                    <Typography variant="h6" className={classes.title}>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </Typography>
                    <Button color="inherit" href="/login">Login</Button>
                </Toolbar>
            </AppBar>
            <Routes/>
        </div>
    );
}

export default App;
