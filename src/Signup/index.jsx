import React from 'react';
import {Link} from 'react-router-dom';
import { validate } from 'indicative/validator';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: {}
        };
    }

    userinputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    dataValidation = (event) => {
        event.preventDefault();

        const data = this.state;

        const rules = {
            Username: 'required|string',
            email: 'required|email',
            password: 'required|min:4|confirmed'
        };
        const messages = {
            required: "Empty {{field}} are not allowed",
            email: "please enter valid email address",
            range: "password must be in range of min 4 to max 8",
            'email.email': 'Email is invalid',
            'password.confirmed': 'password doesnt match'

        };


        validate(data, rules)
            .then(() => {
                console.log("success");
            })
            .catch(errors => {
                console.log(errors);
                const formattederrors ={}
                errors.forEach(error => formattederrors[error.field]= error.message)
                this.setState({
                    errors : formattederrors
                })
            })
    };



    render() {
        return (
            <div className="mh-fullscreen bg-img center-vh p-20"
                 style={{backgroundImage: "url(assets/img/bg-girl.jpg"}}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
                    <h5 className="text-uppercase text-center">Register</h5>
                    <br/>
                    <br/>
                    <form className="form-type-material" onSubmit={this.dataValidation}>
                        <div className="form-group">
                            <input type="text" name="Username" onChange={this.userinputchange} className="form-control"
                                   placeholder="Username"/>
                            {
                                this.state.errors['Username'] &&
                                <small className= "text-danger" >{this.state.errors['Username']}</small>

                            }                        </div>
                        <div className="form-group">
                            <input type="text" name="email" onChange={this.userinputchange} className="form-control"
                                   placeholder="Email address"/>
                                   {
                            this.state.errors['email'] &&
                            <small className= "text-danger" >{this.state.errors['email']}</small>

                        }

                        </div>
                        <div className="form-group">
                            <input type="password" name="password" onChange={this.userinputchange}
                                   className="form-control" placeholder="Password"/>
                            {
                                this.state.errors['password'] &&
                                <small className= "text-danger" >{this.state.errors['password']}</small>

                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password_confirmation" onChange={this.userinputchange}
                                   className="form-control" placeholder="Password (confirm)"/>

                        </div>
                        <br/>
                        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
                    </form>
                    <hr className="w-30"/>
                    <p className="text-center text-muted fs-13 mt-20">Already have an account?
                        <Link className="nav-link" to="/login">Sign in</Link>
                    </p>
                </div>
            </div>

        )
    }

}

export default Register;