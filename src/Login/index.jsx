import React from 'react';
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";


class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    userinputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await this.props.loginUser(this.state);

        } catch (errors) {
            this.setState({errors})
        }
        console.log(this.state)
    }

    render() {
        return (
            < LoginForm
                userinputchange={this.userinputchange}
                handleSubmit={this.handleSubmit}
                errors = {this.state.errors}
            />
        )
    }
}
Login.propTypes ={
    loginUser: PropTypes.func.isRequired,
    setauthUser: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,

};
export default Login