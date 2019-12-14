import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../Login';
// eslint-disable-next-line import/no-unresolved
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import Footer from '../Footer';
import CreateArticle from '../CreateArticle/index';
import SingleArticle from '../SingleArticle';
import Signup from '../Signup';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser));
      this.props.history.push('/');
    });
  };

  render() {
    const { location } = this.props;

    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/signup'
          && <Navbar authUser={this.state.authUser} />
        }
        <Route exact path="/"
               render={
                 props => (
                   <Welcome
                     {...props}
                     getArticles={this.props.articleService.getArticles}
                   />
                 )

               }
        />

        <Route
          path="/signup"
          render={
            (props) => (
              <Signup
                {...props}
                registerUser={this.props.authService.registerUser}
                setAuthUser={this.setAuthUser}
              />
            )
          }
        />
        <Route
          path="/login"
          render={
            (props) => (
              <Login
                {...props}
                setAuthUser={this.setAuthUser}
                loginUser={this.props.authService.loginUser}
              />
            )
          }
        />
        <Route
          path="/article/:slug"
               render={
                 props => (
                   <SingleArticle
                     {...props}
                     getArticle={this.props.articleService.getArticle} //bcoz of entry point , services called to fetch data & then passed as props
                   />
                 )
               }
        />


        <Route
          path="/articles/create"
          render={
            (props) => (
              <CreateArticle
                {...props}
                getArticleCategories={this.props.articleService.getArticleCategories}
                CreateArticle={this.props.articleService.CreateArticle}
                token={this.state.authUser.token}
              />
            )
          }
        />


        {
          location.pathname !== '/login' && location.pathname !== '/signup'

          && <Footer />

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
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
  articleService: PropTypes.objectOf(PropTypes.func).isRequired,

};

export default App;
