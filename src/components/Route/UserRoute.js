import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({
  component: Component,
  auth: { isAuthenticated,loading,user },
  ...rest
}) => {
  console.log(isAuthenticated,"ini di route")
  return (
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated == null? (
        <Component {...props} /> 
      ) : isAuthenticated && user.role == "2" ? (
        <Component {...props} /> 
      ): isAuthenticated && user.role == "1"? (
        <Redirect to={{
          pathname: '/'}}
        /> 
      ):isAuthenticated == false ?
      ( <Redirect to={{
        pathname: '/'}}
      />):null}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserRoute);