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
import  Register from "./Signup";

const Main = withRouter(({location}) => {
    /*using fat arrow function actually means you are passing component to it*/
    return (
        <div>
            {
                location.pathname !== "/login" && location.pathname !== "/signup" &&

                <Navbar/>
            }
            <Route exact path="/" component={Welcome}/>
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login}/>
            <Route path="/article/:slug" component={SingleArticle}/>
            <Route path="/articles/create" component={CreateArticle}/>
            {
                    location.pathname !== "/login" && location.pathname !== "/signup" &&

                    <Footer/>

            }
        </div>
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
