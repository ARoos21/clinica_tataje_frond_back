import { useState, useEffect } from "react";
import { obtenerPersonalClinico } from "../services/personalClinico";
import CrearPersonalModal from "./components/CrearPersonalModal";

function PersonalClinico() {
  const [personales, setPersonales] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarPersonal = () => {
    obtenerPersonalClinico()
      .then((data) => setPersonales(data.data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    cargarPersonal();
  }, []);

  return (
    <div className="container py-4">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ backgroundColor: "#fdfdfd" }}
      >
        <div className="card-body px-4 py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <h3 className="fw-bold m-0 text-dark" style={{ color: "#1e3144" }}>
              <i className="bi bi-people-fill me-2"></i>
              Personal Registrado
            </h3>
            <button
              className="btn"
              onClick={() => setMostrarModal(true)}
              style={{
                backgroundColor: "#1e3144",
                color: "#fff",
                fontWeight: "bold",
                padding: "0.5rem 1.2rem",
                borderRadius: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <i className="bi bi-person-plus-fill me-1"></i> Registrar Personal
            </button>
          </div>

          <div
            className="table-responsive rounded-3 overflow-auto"
            style={{ maxHeight: "450px" }}
          >
            <table className="table table-hover align-middle text-center mb-0">
              <thead
                className="text-white"
                style={{
                  backgroundColor: "#1e3144",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  <th>#</th>
                  <th>DNI</th>
                  <th className="text-start">Nombres</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th className="text-start">Dirección</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {personales.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted fst-italic">
                      No hay personal registrado.
                    </td>
                  </tr>
                ) : (
                  personales.map((personal, i) => (
                    <tr key={personal.id_personal}>
                      <td>{i + 1}</td>
                      <td>{personal.dni}</td>
                      <td className="text-start">{personal.nombres}</td>
                      <td>{personal.apellido_paterno}</td>
                      <td>{personal.apellido_materno}</td>
                      <td className="text-start">{personal.direccion}</td>
                      <td>{personal.email}</td>
                      <td>{personal.rol}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <CrearPersonalModal
          onClose={() => setMostrarModal(false)}
          onSuccess={cargarPersonal}
        />
      )}
    </div>
  );
}

export default PersonalClinico;
