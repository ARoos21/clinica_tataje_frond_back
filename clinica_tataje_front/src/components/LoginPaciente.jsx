import { useState } from "react";
import { loginPaciente } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPaciente.css";

function LoginPaciente() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
  const resp = await loginPaciente({ dni, password }); // resp YA ES data
  const token = resp.access_token;
  const expiration = resp.token_expiration;

  localStorage.setItem("token", token);
  localStorage.setItem("token_expiration", expiration);
  navigate("/paciente-inicio");
} catch (err) {
  console.error("Error al iniciar sesión:", err?.response?.data || err.message);
  const msg = err?.response?.data?.message ?? "DNI o contraseña incorrectos";
  setError(Array.isArray(msg) ? msg[0] : msg);
}

  };

  const handleRegister = () => {
    navigate("/registro-paciente");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid login-paciente-container">
      <div className="row min-vh-100">
        {/* Imagen en pantallas grandes */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
          <img
            src="/images/CLinicaTTLO.png"
            alt="Clínica"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Formulario */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Iniciar Sesión</h3>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={goHome}
                title="Volver a inicio"
              >
                <FaArrowLeft />
              </button>
            </div>
            <p className="text-muted">
              Ingresa tus credenciales para acceder a tu cuenta.
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  maxLength={8}
                  className="form-control"
                  placeholder="Ingresa tu DNI"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="btn btn-outline-primary"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPaciente;
