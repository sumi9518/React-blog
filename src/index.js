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
import ArticleServices from "./services/articles";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({
                authUser: JSON.parse(user)
            });
        }
    }

    setAuthUser = (authUser) => {
        this.setState({
            authUser
        }, () => {
            localStorage.setItem('user', JSON.stringify(authUser));
            this.props.history.push('/');
        });
    };

    render() {
        const {location} = this.props;
        console.log(this.state.authUser);

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
                        setAuthUser={this.setAuthUser}
                    />
                }
                />
                <Route path="/login"
                       render={
                           (props) => (<Login
                               {...props}
                               setAuthUser={this.setAuthUser}
                               loginUser={this.props.authService.loginUser}
                           />)
                       }
                />
                <Route path="/articles/:slug" component={SingleArticle}/>


                <Route path="articles/create"
                       render={
                           props => (
                               <CreateArticle  /*step 6 */
                                   {...props}
                                   /*step 5 */
                                   getArticleCategories={this.props.articleServices.getArticleCategories}  /*step 2 */
                               />
                           )
                       }
                />

                {
                    location.pathname !== "/login" && location.pathname !== "/signup" &&

                    <Footer/>

                }
            </div>
        );
    }

}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    AuthService: PropTypes.objectOf(PropTypes.func).isRequired,
    ArticleServices: PropTypes.objectOf(PropTypes.func).isRequired,

};


const Main = withRouter((props) => {
    /*using fat arrow function actually means you are passing component to it*/
    return (
        <App
            {...props}
            authService={new AuthService()}
            articleServices={new ArticleServices()} //step 1
        />
    )
});

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
