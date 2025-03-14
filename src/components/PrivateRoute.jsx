import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const token = Cookies.get('jwt');

    return token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
