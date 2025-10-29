import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getPacientes } from "../../../services/pacientes";
import { obtenerMedicos } from "../../../services/medicoService";
import { crearCitaPersonal } from "../../../services/citasServices";

export default function ModalCrearCita({ onClose, onSuccess }) {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({
    dni: "",
    paciente: null,
    especialidad: "",
    medico: "",
    fecha: "",
    hora: "",
    motivo: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getPacientes().then((res) => setPacientes(res.data));
    obtenerMedicos().then((res) => setMedicos(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === "especialidad" ? { medico: "" } : {}),
    }));
  };

  const buscarPacientePorDni = () => {
    const paciente = pacientes.find((p) => p.dni === form.dni);
    if (paciente) {
      setForm((f) => ({ ...f, paciente }));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Paciente no encontrado",
        text: "Verifica que el DNI sea correcto",
      });
      setForm((f) => ({ ...f, paciente: null }));
    }
  };

  const handleCrear = async () => {
    const { paciente, medico, fecha, hora, motivo } = form;
    if (!paciente || !medico || !fecha || !hora || !motivo) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios",
        confirmButtonColor: "#1e3144"
      });
      return;
    }

    try {
      await crearCitaPersonal({
        id_paciente: paciente.id_paciente,
        id_medico: parseInt(medico),
        fecha,
        hora,
        motivo,
      });

      Swal.fire({
        icon: "success",
        title: "Cita creada",
        text: "La cita fue registrada correctamente",
        confirmButtonColor: "#1e3144"
      });

      onSuccess();
      onClose();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al crear la cita",
        text: "Ocurrió un problema al registrar la cita",
      });
    }
  };

  const especialidades = [
    ...new Map(medicos.map((m) => [m.especialidad.id_especialidad, m.especialidad])).values(),
  ];
  const medicosFiltrados = medicos.filter(
    (m) => m.especialidad.id_especialidad == form.especialidad
  );

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Nueva Cita</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>DNI del paciente</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-secondary" onClick={buscarPacientePorDni}>
                  Buscar
                </button>
              </div>
            </div>
            {form.paciente && (
              <div className="alert alert-info">
                <strong>Paciente:</strong> {form.paciente.nombres} {form.paciente.apellido_paterno}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Especialidad y Médico</label>
              <div className="row">
                <div className="col-md-6 mb-2 mb-md-0">
                  <select
                    className="form-select"
                    name="especialidad"
                    value={form.especialidad}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione especialidad</option>
                    {especialidades.map((esp) => (
                      <option key={esp.id_especialidad} value={esp.id_especialidad}>
                        {esp.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="medico"
                    value={form.medico}
                    onChange={handleChange}
                    disabled={!form.especialidad}
                  >
                    <option value="">Seleccione un médico</option>
                    {medicosFiltrados.map((m) => (
                      <option key={m.id_medico} value={m.id_medico}>
                        {m.personal_clinico.nombres} {m.personal_clinico.apellido_paterno}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label>Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                min={today}
                value={form.fecha}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Hora (6:00 am - 22:00 pm)</label>
              <input
                type="time"
                className="form-control"
                name="hora"
                min="06:00"
                max="22:00"
                step="900"
                value={form.hora}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Motivo</label>
              <textarea
                className="form-control"
                name="motivo"
                rows="2"
                value={form.motivo}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleCrear}>
              Crear Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
