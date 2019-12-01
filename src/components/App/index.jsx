import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

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

  componentDidMount() {
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
        <Route exact path="/" component={Welcome} />

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
                loginUser={this.props.authService.loginUser}
                setAuthUser={this.setAuthUser}
              />
            )
          }
        />
        <Route path="/articles/:slug" component={SingleArticle} />


        <Route
          path="articles/create"
          render={
            (props) => (
              <CreateArticle
                {...props}
                getArticleCategories={this.props.articleServices.getArticleCategories}
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
  AuthService: PropTypes.objectOf(PropTypes.func).isRequired,
  ArticleServices: PropTypes.objectOf(PropTypes.func).isRequired,

};

export default App;
