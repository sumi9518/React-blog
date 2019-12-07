import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import App from './components/App';
import AuthService from './services/auth';
import ArticleService from './services/articles';

const Main = withRouter((props) => ((
  // eslint-disable-next-line react/jsx-filename-extension,react/jsx-props-no-spreading
  <App
    authService={new AuthService()}
    articleService={new ArticleService()}
    {...props} />
)));

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
