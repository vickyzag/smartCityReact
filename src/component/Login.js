import React from 'react';
import {login} from './API';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inputEmail: "",
            inputPassword: "",
            result: "test"
        }
    }

    async connect(){
        try {
            await login(this.state.inputEmail, this.state.inputPassword);
            this.props.history.push("/");
        }
        catch (e){
            throw new Error("Something went wrong, try again later "+e.toString());
        }
    }

    componentDidMount() {
        if(localStorage.getItem("token") !== null){
            this.props.history.push("/");
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={(event) => this.connect()}>
                    <label>Email: </label>
                    <input type="email"
                           id="email"
                           onChange={(event) => {
                               this.setState({inputEmail: event.target.value});
                           }}
                           required
                    />
                    <label>Password: </label>
                    <input type="password"
                           id="password"
                           onChange={(event) => {
                               this.setState({inputPassword: event.target.value});
                           }}
                           required
                    />
                    <button type="submit">Connect</button>
                </form>
                <p>{this.state.result}</p>
            </div>

        )
    }

}

export default Login;