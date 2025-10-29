import { useState } from "react";
import { getPacientes } from "../services/pacientes";
import { buscarCitasPorPaciente } from "../services/citasServices";

function BuscarCitasPorDni() {
    const [dni, setDni] = useState("");
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pacienteNombre, setPacienteNombre] = useState("");

    const buscar = async () => {
        setError(null);
        setCitas([]);
        setPacienteNombre("");
        setLoading(true);

        try {
            const resPacientes = await getPacientes();
            const paciente = resPacientes.data.find((p) => p.dni === dni.trim());

            if (!paciente) {
                setError("Paciente no encontrado con ese DNI.");
                setLoading(false);
                return;
            }

            const resCitas = await buscarCitasPorPaciente({
                id_paciente: paciente.id_paciente,
            });

            setPacienteNombre(`${paciente.nombres} ${paciente.apellido_paterno}`);
            setCitas(resCitas.data); // Asegúrate de acceder a .data según la estructura
        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al buscar citas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title">Buscar Citas por DNI</h5>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={buscar}>
                        Buscar
                    </button>
                </div>

                {loading && <p>Cargando...</p>}
                {error && <div className="alert alert-danger">{error}</div>}

                {pacienteNombre && (
                    <div className="alert alert-info">
                        Mostrando citas para: <strong>{pacienteNombre}</strong>
                    </div>
                )}

                {citas.length > 0 && (
                    <table className="table table-bordered table-hover text-center">
                        <thead className="table-light">
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.motivo}</td>
                                    <td>
                                        <span className={`badge bg-${getEstadoColor(cita.estado)}`}>
                                            {cita.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && citas.length === 0 && pacienteNombre && (
                    <div className="alert alert-warning text-center">
                        No se encontraron citas para este paciente.
                    </div>
                )}
            </div>
        </div>
    );
}

function getEstadoColor(estado) {
    switch (estado) {
        case "PROGRAMADA":
            return "primary";
        case "REALIZADA":
            return "success";
        case "CANCELADA":
            return "danger";
        default:
            return "secondary";
    }
}

export default BuscarCitasPorDni;
