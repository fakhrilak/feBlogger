import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({
  component: Component,
  auth: { isAuthenticated,loading },
  ...rest
}) => {
  console.log(isAuthenticated)
  return (
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated === null || loading ? (
        <Component {...props} />
      ) : !isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )}
    />
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserRoute);