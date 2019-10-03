import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import Welcome from "./components/Welcome/Index";
import * as serviceWorker from './serviceWorker';
import Navbar from "./components/Navbar/Index";
import Footer from "./components/Footer/Index";
import CreateArticle from "./components/CreateArticle";
import Login from "./Login";
import SingleArticle from "./components/SingleArticle";

ReactDOM.render(
    <BrowserRouter>
        <Navbar/>
        <Route exact path="/" component={Welcome}/>
        <Route path="/login" component={Login}/>
        <Route path="/article/:slug" component={SingleArticle}/>
        <Route path="/articles/create" component={CreateArticle}/>

        <Footer/>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
