import React from 'react';
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await this.props.loginUser(this.state);

            localStorage.setItem('user', JSON.stringify(user));

            this.props.setAuthUser(user);

            this.props.history.push('/');

        } catch (errors) {
            this.setState({errors})
        }
        console.log(this.state)
    };

    render() {
        return (
            < LoginForm
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                errors = {this.state.errors}
            />
        );
    }
}
Login.propTypes ={
    loginUser: PropTypes.func.isRequired,
    setAuthUser: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,

};
export default Login