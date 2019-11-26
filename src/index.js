import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import Welcome from "./components/Welcome/Index";
import * as serviceWorker from './serviceWorker';
import Navbar from "./components/Navbar/Index";
import Footer from "./components/Footer/Index";
import CreateArticle from "./components/CreateArticle";
import Login from "./Login";
import SingleArticle from "./components/SingleArticle";
import Register from "./Signup";
import AuthService from "./services/auth";
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        const User = localStorage.getItem('user')
        if (User) {
            this.setState({
                authUser: JSON.parse(User)

            });

        }
    }

    setauthUser = (authUser) => {

        this.setState({
            authUser
        },()=>{
            localStorage.setItem('user',JSON.stringify(authUser))
            this.props.history.push('/');

        })

    }

    render() {
        const {location} = this.props;

        return (
            <div>
                {
                    location.pathname !== "/login" && location.pathname !== "/signup" &&

                    <Navbar authUser={this.state.authUser}/>
                }
                <Route exact path="/" component={Welcome}/>
                <Route path="/signup" render={
                    (props) => <Register
                            {...props}
                             registeredUser={this.props.authService.registeredUser}
                             setauthUser={this.setauthUser}
                />
                }
                />
                <Route path="/login"
                       render={
                           (props) => <Login
                                   {...props}
                                   loginUser = {this.props.authService.loginUser}
                                   setauthUser = {this.setauthUser}
                           />
                       }
                       />
                <Route path="/article/:slug" component={SingleArticle}/>
                <Route path="/articles/create" component={CreateArticle}/>
                {
                    location.pathname !== "/login" && location.pathname !== "/signup" &&

                    <Footer/>

                }
            </div>
        );
    }

}

App.propTypes ={
    location: PropTypes.shape({
        pathname:PropTypes.string.isRequired,
    }).isRequired,
    history:PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    AuthService : PropTypes.objectOf(PropTypes.func).isRequired,
};


const Main = withRouter((props) => {
    /*using fat arrow function actually means you are passing component to it*/
    return (
        <App authService={new AuthService} {...props} />
    )
})

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
