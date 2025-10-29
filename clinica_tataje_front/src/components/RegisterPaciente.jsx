import { useState } from 'react';
import { crearPaciente } from '../services/pacientes';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/RegistroPaciente.css';

function RegistrarsePaciente() {
    const [nombres, setNombres] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoPaciente = {
            dni,
            nombres,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            telefono,
            password,
        };

        try {
            await crearPaciente(nuevoPaciente);
            setMensaje('Paciente registrado con éxito');
            setError('');

            // Redirige luego de 2 segundos
            setTimeout(() => {
                navigate('/login-paciente');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Error al registrar al paciente');
        }
    };

    return (
        <div className="registro-paciente-container">
            <div className="registro-paciente-imagen">
                <img src="images/registro-paciente.png" alt="Registro" />
            </div>

            <div className="registro-paciente-formulario">
                <h2>Registro de Paciente</h2>

                <form onSubmit={handleSubmit} className="registro-paciente-formulario-campos">
                    <div className="registro-paciente-campo">
                        <label>DNI:</label>
                        <input
                            type="text"
                            maxLength={8}
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Nombres:</label>
                        <input
                            type="text"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Apellido Paterno:</label>
                        <input
                            type="text"
                            value={apellidoPaterno}
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Apellido Materno:</label>
                        <input
                            type="text"
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>

                    <div className="registro-paciente-campo">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="registro-paciente-mensaje error">{error}</div>}
                    {mensaje && <div className="registro-paciente-mensaje exito">{mensaje}</div>}

                    <div className="registro-paciente-botones">
                        <button type="submit">Registrar</button>
                        <Link to="/login-paciente" className="registro-paciente-btn-link">
                            <FaArrowLeft size={16} /> <span>Ya tengo cuenta</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarsePaciente;
