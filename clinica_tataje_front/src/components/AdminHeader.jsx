import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/admin/AdminHeader.css';
import { getDecodedToken } from '../utils/tokenUtils';

const AdminHeader = () => {
  const navigate = useNavigate();
  const user = getDecodedToken();
  const role = user?.rol;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand">Clínica Admin</span>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminOffcanvas"
          aria-controls="adminOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/admin/inicio">Inicio</NavLink></li>
            {(role === 'superadministrador' || role === 'administrador') && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/personal">Personal</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/especialidades">Especialidades</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/medicos">Médicos</NavLink></li>
              </>
            )}
            <li className="nav-item"><NavLink className="nav-link" to="/admin/pacientes">Pacientes</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/admin/citas">Citas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/admin/historial">Historial Clínico</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/admin/cuenta">Mi Cuenta</NavLink></li>
          </ul>
          <button className="btn btn-outline-light ms-3" onClick={handleLogout}>Salir</button>
        </div>

        <div
          className="offcanvas offcanvas-end text-bg-dark d-lg-none"
          tabIndex="-1"
          id="adminOffcanvas"
          aria-labelledby="adminOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="adminOffcanvasLabel">Menú</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column justify-content-between">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/admin/inicio">Inicio</NavLink></li>
              {(role === 'superadministrador' || role === 'administrador') && (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/admin/personal">Personal</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/admin/especialidades">Especialidades</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/admin/medicos">Médicos</NavLink></li>
                </>
              )}
              <li className="nav-item"><NavLink className="nav-link" to="/admin/pacientes">Pacientes</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin/citas">Citas</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin/historial">Historial Clínico</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin/cuenta">Mi Cuenta</NavLink></li>
            </ul>
            <button className="btn btn-outline-light mt-3 w-100" onClick={handleLogout}>Salir</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
