import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { cambiarCredenciales } from '../../services/personalClinico';

function ModalCambiarCredenciales({ show, handleClose, emailActual }) {
  const [form, setForm] = useState({
    emailActual: emailActual || '',
    passwordActual: '',
    emailNuevo: emailActual || '',
    passwordNuevo: '',
    confirmarPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.passwordNuevo !== form.confirmarPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
        text: 'Por favor, verifica la contraseña nueva.'
      });
      return;
    }

    setLoading(true);
    try {
      await cambiarCredenciales({
        emailActual: form.emailActual,
        passwordActual: form.passwordActual,
        emailNuevo: form.emailNuevo,
        passwordNuevo: form.passwordNuevo
      });

      Swal.fire({
        icon: 'success',
        title: 'Credenciales actualizadas',
        text: 'Tus credenciales se cambiaron correctamente.'
      });
      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar las credenciales.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Credenciales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Correo Actual</Form.Label>
            <Form.Control
              type="email"
              name="emailActual"
              value={form.emailActual}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              name="passwordActual"
              value={form.passwordActual}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Nuevo</Form.Label>
            <Form.Control
              type="email"
              name="emailNuevo"
              value={form.emailNuevo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña Nueva</Form.Label>
            <Form.Control
              type="password"
              name="passwordNuevo"
              value={form.passwordNuevo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña Nueva</Form.Label>
            <Form.Control
              type="password"
              name="confirmarPassword"
              value={form.confirmarPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Actualizando...
              </>
            ) : (
              'Actualizar Credenciales'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalCambiarCredenciales;
