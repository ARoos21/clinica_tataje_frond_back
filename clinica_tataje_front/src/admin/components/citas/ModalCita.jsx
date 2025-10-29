import { useState } from "react";

export default function ModalCita({ cita, onClose, onSave }) {
  const [nuevaFecha, setNuevaFecha] = useState(cita.fecha);
  const [nuevaHora, setNuevaHora] = useState(cita.hora);

  const handleGuardar = () => {
    onSave(cita.id_cita, nuevaFecha, nuevaHora);
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reprogramar Cita</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nueva Fecha</label>
              <input
                type="date"
                className="form-control"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nueva Hora (6:00 am  a  22:30 pm) </label>
              <input
                type="time"
                className="form-control"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleGuardar}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
