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
import Auth from '../Auth';
import RedirectIfAuth from '../RedirectIfAuth';
import UserArticles from "../UserArticles";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      articles: [],
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

  setArticles = (articles) => {
    this.setState({ articles });
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
        <Route
          exact path="/"
          render={
            props => (
              <Welcome
                {...props}
                getArticles={this.props.articleService.getArticles}
                setArticles={this.setArticles}
              />
            )

          }
        />

        <RedirectIfAuth
          path="/signup"
          component={Signup}
          props={{
            setAuthUser: this.setAuthUser,
            loginUser: this.props.authService.loginUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <RedirectIfAuth
          path="/login"
          component={Login}
          props={{
            setAuthUser: this.setAuthUser,
            loginUser: this.props.authService.loginUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Route
          path="/article/:slug"
          render={
            props => (
              <SingleArticle
                {...props}
                getArticle={this.props.articleService.getArticle} //bcoz of entry point , services called to fetch data & then passed as props
                articles={this.state.articles}
              />
            )
          }
        />

        <Auth
          path="/articles/create"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articleService.getArticleCategories,
            createArticle: this.props.articleService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
        />

        <Auth
          path="/user/articles"
          component={UserArticles}
          props={{
            getUserArticles: this.props.articleService.getUserArticles,
            setArticles: this.setArticles,
            deleteArticles: this.props.articleService.deleteArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
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
