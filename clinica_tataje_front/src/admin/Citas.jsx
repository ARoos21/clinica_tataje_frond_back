import { useEffect, useState } from "react";
import {
  getCitasPersonal,
  cambiarEstadoCita,
  reprogramarCita,
} from "../services/citasServices";
import { getPacientes } from "../services/pacientes";
import ModalCita from "./components/citas/ModalCita";
import ModalCrearCita from "./components/citas/ModalCrearCita";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import ModalRegistrarConsulta from "./components/citas/ModalRegistrarConsulta";
import Swal from "sweetalert2";

const BADGE_CLASSES = {
  REALIZADA: "bg-success",
  PROGRAMADA: "bg-primary",
  CANCELADA: "bg-danger",
};

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("PROGRAMADA");
  const [modalCita, setModalCita] = useState(null);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [dni, setDni] = useState("");
  const [filtradasDni, setFiltradasDni] = useState(null);
  const [errorDni, setErrorDni] = useState(null);
  const [buscandoDni, setBuscandoDni] = useState(false);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [modalConsulta, setModalConsulta] = useState(null);

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    setLoading(true);
    try {
      const res = await getCitasPersonal();
      setCitas(res.data);
      limpiarBusqueda();
    } catch (err) {
      setError(err?.response?.data?.message || "Error al cargar las citas.");
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setFiltradasDni(null);
    setDni("");
    setErrorDni(null);
  };

  const buscarPorDni = async () => {
    if (dni.length !== 8) return;
    setBuscandoDni(true);
    setErrorDni(null);
    try {
      const res = await getPacientes();
      const paciente = res.data.find((p) => p.dni === dni);
      if (!paciente) return setErrorDni("Paciente no encontrado.");
      const filtradas = citas.filter((c) => c.id_paciente.id_paciente === paciente.id_paciente);
      setFiltradasDni(filtradas);
    } catch {
      setErrorDni("Error al buscar por DNI.");
    } finally {
      setBuscandoDni(false);
    }
  };

  const actualizarCitaLocal = (id, cambios) => {
    const update = (lista) => lista.map((c) => (c.id_cita === id ? { ...c, ...cambios } : c));
    setCitas((prev) => update(prev));
    if (filtradasDni) setFiltradasDni((prev) => update(prev));
  };

  const cancelarCita = async (id) => {
    const result = await Swal.fire({
      title: "¿Cancelar esta cita?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, volver",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;

    try {
      await cambiarEstadoCita(id, "CANCELADA");
      actualizarCitaLocal(id, { estado: "CANCELADA" });

      Swal.fire({
        title: "Cita cancelada",
        text: "La cita ha sido cancelada correctamente.",
        icon: "success",
        confirmButtonColor: "#1e3144",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo cancelar la cita.",
        icon: "error",
      });
    }
  };

  const reprogramar = async (id, fecha, hora) => {
    try {
      await reprogramarCita(id, { fecha, hora });
      actualizarCitaLocal(id, { fecha, hora });
      setModalCita(null);
    } catch {
      alert("Error al reprogramar.");
    }
  };

  const citasParaMostrar = (filtradasDni ?? citas)
    .filter((c) => filtro === "TODAS" || c.estado === filtro)
    .filter((c) => (!fechaDesde || c.fecha >= fechaDesde) && (!fechaHasta || c.fecha <= fechaHasta));

  return (
    <div className="container-fluid py-4 px-3">
      <div className="card shadow rounded">
        <div
          className="card-header d-flex justify-content-between align-items-center text-white"
          style={{ backgroundColor: "#1e3144", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
        >
          <h4 className="mb-0 fw-semibold">Gestión de Citas</h4>
          <button
            className="btn btn-light fw-semibold px-4 py-2 rounded-pill shadow-sm"
            disabled={!!filtradasDni}
            onClick={() => setMostrarModalCrear(true)}
          >
            + Nueva Cita
          </button>
        </div>

        <div className="card-body bg-light rounded-bottom p-4">
          {/* Filtros */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Buscar por DNI</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="8 dígitos"
                  value={dni}
                  maxLength={8}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                />
                <button
                  className="btn btn-primary"
                  onClick={buscarPorDni}
                  disabled={dni.length !== 8 || buscandoDni}
                >
                  {buscandoDni ? "Buscando..." : "Buscar"}
                </button>
                {filtradasDni && (
                  <button className="btn btn-secondary" onClick={limpiarBusqueda}>
                    Limpiar
                  </button>
                )}
              </div>
              {errorDni && <small className="text-danger">{errorDni}</small>}
            </div>

            <div className="col-md-2">
              <label className="form-label fw-bold">Estado</label>
              <select
                className="form-select"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="PROGRAMADA">Programadas</option>
                <option value="REALIZADA">Realizadas</option>
                <option value="CANCELADA">Canceladas</option>
                <option value="TODAS">Todas</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">Desde</label>
              <input
                type="date"
                className="form-control"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">Hasta</label>
              <input
                type="date"
                className="form-control"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
          </div>

          {(fechaDesde || fechaHasta) && (
            <div className="mb-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setFechaDesde("");
                  setFechaHasta("");
                }}
              >
                Limpiar rango de fechas
              </button>
            </div>
          )}

          {/* Tabla de citas */}
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : citasParaMostrar.length === 0 ? (
            <div className="alert alert-info text-center">No hay citas encontradas.</div>
          ) : (
            <div className="table-responsive" style={{ border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead
                  className="text-white"
                  style={{ backgroundColor: "#1e3144", position: "sticky", top: 0, zIndex: 1 }}
                >
                  <tr>
                    <th>N° Cita</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>DNI</th>
                    <th>Motivo</th>
                    <th>Médico</th>
                    <th>Especialidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citasParaMostrar.map((cita) => {
                    const p = cita.id_paciente;
                    const m = cita.id_medico;
                    return (
                      <tr key={cita.id_cita}>
                        <td>{cita.id_cita}</td>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                        <td>{`${p.nombres} ${p.apellido_paterno} ${p.apellido_materno}`}</td>
                        <td>{p.dni}</td>
                        <td>{cita.motivo}</td>
                        <td>{`${m.id_personal.nombres} ${m.id_personal.apellido_paterno}`}</td>
                        <td>{m.id_especialidad.nombre}</td>
                        <td>
                          <span className={`badge ${BADGE_CLASSES[cita.estado] || "bg-secondary"}`}>
                            {cita.estado}
                          </span>
                        </td>
                        <td>
                          {cita.estado === "PROGRAMADA" && (
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-sm btn-danger"
                                title="Cancelar"
                                onClick={() => cancelarCita(cita.id_cita)}
                              >
                                <FaTimes />
                              </button>
                              <button
                                className="btn btn-sm btn-warning"
                                title="Reprogramar"
                                onClick={() => setModalCita(cita)}
                              >
                                <FaCalendarAlt />
                              </button>
                              <button
                                className="btn btn-sm btn-success"
                                title="Registrar Consulta"
                                onClick={() => setModalConsulta(cita)}
                              >
                                📋
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {mostrarModalCrear && (
        <ModalCrearCita onClose={() => setMostrarModalCrear(false)} onSuccess={cargarCitas} />
      )}
      {modalCita && (
        <ModalCita cita={modalCita} onClose={() => setModalCita(null)} onSave={reprogramar} />
      )}
      {modalConsulta && (
        <ModalRegistrarConsulta
          cita={modalConsulta}
          onClose={() => setModalConsulta(null)}
          onSuccess={cargarCitas}
        />
      )}
    </div>
  );
}
