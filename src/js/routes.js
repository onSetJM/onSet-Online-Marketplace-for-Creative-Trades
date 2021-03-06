/*global localStorage */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

import AuthService from './utils/AuthService';

var App = require("./components/App");
var Home = require("./components/Home");
var Createprofile = require("./components/Createprofile");
var Profile = require("./components/Profile");
var Login = require("./components/Login");
var Logout = require("./components/Logout");
var FAQ = require("./components/FAQ");
var ContactUs = require("./components/ContactUs");
var Careers = require("./components/Careers");

var SearchBar = require("./components/SearchBar");
var SearchResults = require("./components/SearchResults");
var Editprofile = require("./components/Editprofile");
var AboutUs = require("./components/AboutUs");

var Createreviewmodal = require("./components/Createreviewmodal");
var Gallery = require("./components/Gallery");
var PleaseLogIn = require("./components/PleaseLogIn");

var auth = new AuthService('pQZynj9aeB6FgPoKihk7HluGGlLYwqWR', 'onset.auth0.com');

var requireAuth = function(nextState, replace, next) {
    if (!auth.loggedIn()) {
        localStorage.setItem('last_url', window.location.pathname);
        replace({ pathname: '/pleaselogin' + window.location.hash})
    }
    
    next();
}


var routes = (
    <Router history={ReactRouter.browserHistory}> 
        <Route path="/" component={App} auth={auth}>
            
            <IndexRoute component={Home}/>
            <Route path="pleaselogin" component={PleaseLogIn}></Route>
            <Route path="aboutus" component={AboutUs}></Route>

            <Route path="createprofile" component={Createprofile} onEnter={requireAuth}></Route>
            <Route path="editprofile/:username" component={Editprofile} onEnter={requireAuth}></Route>
            
            <Route path="search/(:category)/(:city)/(:filter)" component={SearchResults}>
            </Route>
            
            <Route path="profile/:username" component={Profile} />
            <Route path="profile/:username/reviews" component={Createreviewmodal} onEnter={requireAuth} /> 

            
            <Route path="faq" component={FAQ} />
            <Route path="contactus" component={ContactUs}></Route>
            <Route path="careers" component={Careers}></Route>
        </Route>
    </Router>
);

module.exports = routes;