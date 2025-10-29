import { useState } from "react";
import { crearConsultaMedica } from "../../../services/consultasMedicasService";

export default function ModalRegistrarConsulta({ cita, onClose, onSuccess }) {
    const [diagnostico, setDiagnostico] = useState("");
    const [tratamiento, setTratamiento] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setError(null);

        try {
            await crearConsultaMedica({
                citaId: cita.id_cita,
                diagnostico,
                tratamiento,
                observaciones,
            });
            onSuccess(); // Recarga citas
            onClose();   // Cierra modal
        } catch (err) {
            setError(err.message || "Error al registrar la consulta.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Registrar Consulta Médica</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <label className="form-label fw-bold">Diagnóstico</label>
                                <textarea
                                    className="form-control"
                                    required
                                    value={diagnostico}
                                    onChange={(e) => setDiagnostico(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Tratamiento</label>
                                <textarea
                                    className="form-control"
                                    required
                                    value={tratamiento}
                                    onChange={(e) => setTratamiento(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Observaciones (opcional)</label>
                                <textarea
                                    className="form-control"
                                    value={observaciones}
                                    onChange={(e) => setObservaciones(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={enviando}>
                                {enviando ? "Registrando..." : "Registrar Consulta"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
