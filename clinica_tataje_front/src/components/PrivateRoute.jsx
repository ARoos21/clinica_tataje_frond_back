import { Navigate, Outlet } from 'react-router-dom';
import { getDecodedToken } from '../utils/tokenUtils';

const PrivateRoute = ({ allowedRoles }) => {
  const user = getDecodedToken();

  if (!user) {
    // si no hay usuario autenticado, redirige a login según el rol esperado
    if (allowedRoles.includes('paciente')) {
      return <Navigate to="/login-paciente" replace />;
    } else {
      return <Navigate to="/admin" replace />;
    }
  }

  if (!allowedRoles.includes(user.rol)) {
    // si está logueado pero no tiene permisos
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
