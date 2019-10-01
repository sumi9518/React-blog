import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import Welcome from "./components/Welcome/Index";
import * as serviceWorker from './serviceWorker';
import Navbar from "./components/Navbar/Index";
import Footer from "./components/Footer/Index";

const Home = ()=>{
   return  <p>This is Home</p>
}

const About = ()=>{
    return <p>This is About</p>
}

ReactDOM.render(
    <BrowserRouter>
        <div>
        <Navbar/>
        <Route exact path="/" component={Welcome}/>
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Footer/>
        </div>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
