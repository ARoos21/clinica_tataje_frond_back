import React, { useState } from 'react';
import { crearPaciente } from '../../services/pacientes';
import { consultarDatosPorDni } from '../../services/DNI-Service';

function CrearPacienteModal({ onClose, onSuccess }) {
    const [dni, setDni] = useState('');
    const [datosReniec, setDatosReniec] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const buscarDni = async () => {
        if (dni.length !== 8) {
            setError('El DNI debe tener 8 dígitos');
            return;
        }

        try {
            const response = await consultarDatosPorDni(dni);
            setDatosReniec(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('No se encontraron datos para el DNI ingresado');
            setDatosReniec(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!datosReniec) {
            setError('Primero debes consultar el DNI');
            return;
        }

        const nuevoPaciente = {
            ...datosReniec,
            telefono,
            password,
        };

        try {
            await crearPaciente(nuevoPaciente);
            setMensaje('Paciente registrado correctamente');
            setError('');
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Error al crear paciente');
        }
    };

    return (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Paciente</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-3 col-form-label">DNI:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dni}
                                    maxLength={8}
                                    onChange={(e) => setDni(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-3">
                                <button type="button" className="btn btn-primary" onClick={buscarDni}>Buscar</button>
                            </div>
                        </div>
                        {error && !datosReniec && <div className="alert alert-danger py-2">{error}</div>}
                        {datosReniec && (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombres</label>
                                    <input type="text" className="form-control" value={datosReniec.nombres} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido Paterno</label>
                                    <input type="text" className="form-control" value={datosReniec.apellido_paterno} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido Materno</label>
                                    <input type="text" className="form-control" value={datosReniec.apellido_materno} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de Nacimiento</label>
                                    <input type="date" className="form-control" value={datosReniec.fecha_nacimiento} readOnly />
                                </div>

                                <input type="hidden" name="estado_civil" value={datosReniec.estado_civil || ''} />
                                <input type="hidden" name="genero" value={datosReniec.genero || ''} />
                                <input type="hidden" name="ubigeo" value={datosReniec.ubigeo || ''} />
                                <input type="hidden" name="direccion" value={datosReniec.direccion || ''} />

                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Teléfono"
                                        value={telefono}
                                        minLength={9}
                                        maxLength={9}
                                        onChange={(e) => setTelefono(e.target.value.replace(/\D/, '').slice(0, 9))}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <div className="alert alert-danger py-2">{error}</div>}
                                {mensaje && <div className="alert alert-success py-2">{mensaje}</div>}

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Registrar</button>
                                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearPacienteModal;
