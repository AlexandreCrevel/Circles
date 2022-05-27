import { Navigate } from 'react-router-dom';

/**
 * Get the token and use it for checking if the routes are ok. If the token is not ok, we are redirect to the "/" location and replace the history
 * @param {*} param0
 * @returns
 */

export const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to='/' replace />;
};
