/* eslint-disable */
import React from 'react';
import { Redirect , Route } from 'react-router-dom';
import PropTypes from "prop-types";

const Auth = ({ path, props, component: Component, isAuthenticated }) =>  //one component is passed prop other Camel one is actual component
  (<Route       // Use to authenticate user and redirect based in result
    path={path}
    render={
      routerProps => {
        if (isAuthenticated) {
          return <Component {...props} {...routerProps} />
        }
        return <Redirect to="/login" />
      }
    }
  />
);
Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.instanceOf(React.Component).isRequired,
  props: PropTypes.objectOf(PropTypes.any),
  path: PropTypes.string.isRequired,
}

Auth.defaultProps = {
  props: {},
};
export default Auth;