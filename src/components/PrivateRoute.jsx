import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
    const token = Cookies.get('jwt');

    return token ? children : <Navigate to="/Login" />;
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};
