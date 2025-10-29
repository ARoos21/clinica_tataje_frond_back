import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPersonalClinico } from "../services/authService";
import { Eye, EyeOff } from "lucide-react";

function LoginAdm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginPersonalClinico({ email, password });
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      navigate("/admin/inicio");
    } catch (err) {
      console.error("Error de inicio", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/images/fondo_login.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(30, 30, 30, 0.85)",
        }}
      >
        <h3 className="mb-4 text-center text-white">Login para administradores</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-white">Correo electrónico</label>
            <input
              type="email"
              className="form-control text-white bg-transparent border-secondary rounded"
              style={{
                colorScheme: "dark",
                borderColor: "#ffffff88",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingrese su correo"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Contraseña</label>
            <div className="input-group">
              <input
                type={mostrarPassword ? "text" : "password"}
                className="form-control text-white bg-transparent border-secondary rounded-start"
                style={{
                  colorScheme: "dark",
                  borderColor: "#ffffff88",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese su contraseña"
              />
              <span
                className="input-group-text bg-transparent border-secondary rounded-end text-white"
                style={{ cursor: "pointer", borderColor: "#ffffff88" }}
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{ backgroundColor: "#ff7f00", color: "white", fontWeight: "bold" }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdm;
