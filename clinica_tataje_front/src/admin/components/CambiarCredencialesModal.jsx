import { useState } from "react";
import { Modal, Button, Form, Alert, Spinner, InputGroup } from "react-bootstrap";
import { actualizarCredenciales } from "../../services/pacientes";

const CambiarCredencialesModal = ({ show, onHide }) => {
    const [passwordActual, setPasswordActual] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [showPasswordActual, setShowPasswordActual] = useState(false);
    const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);
    const [showConfirmarContrasena, setShowConfirmarContrasena] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (nuevaContrasena !== confirmarContrasena) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            await actualizarCredenciales({ passwordActual, nuevaContrasena });
            setSuccess("Contraseña actualizada correctamente.");
            setPasswordActual("");
            setNuevaContrasena("");
            setConfirmarContrasena("");
        } catch (err) {
            console.error(err);
            setError("Error al actualizar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        setSuccess(null);
        setPasswordActual("");
        setNuevaContrasena("");
        setConfirmarContrasena("");
        onHide();
    };

    const renderPasswordInput = (label, value, onChange, show, toggleShow, disabled) => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <Form.Control
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    disabled={disabled}
                />
                <Button
                    variant="outline-secondary"
                    onClick={toggleShow}
                    disabled={disabled}
                >
                    {show ? "🙈" : "👁️"}
                </Button>
            </InputGroup>
        </Form.Group>
    );

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            centered
            className="paciente-home-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>🔒 Cambiar Credenciales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {renderPasswordInput(
                        "Contraseña Actual",
                        passwordActual,
                        setPasswordActual,
                        showPasswordActual,
                        () => setShowPasswordActual(!showPasswordActual),
                        loading
                    )}

                    {renderPasswordInput(
                        "Nueva Contraseña",
                        nuevaContrasena,
                        setNuevaContrasena,
                        showNuevaContrasena,
                        () => setShowNuevaContrasena(!showNuevaContrasena),
                        loading
                    )}

                    {renderPasswordInput(
                        "Confirmar Nueva Contraseña",
                        confirmarContrasena,
                        setConfirmarContrasena,
                        showConfirmarContrasena,
                        () => setShowConfirmarContrasena(!showConfirmarContrasena),
                        loading
                    )}

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="ms-2"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" animation="border" /> : "Guardar"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CambiarCredencialesModal;
