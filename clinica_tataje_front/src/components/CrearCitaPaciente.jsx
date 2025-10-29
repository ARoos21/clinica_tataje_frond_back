import { useEffect, useState } from "react";
import { Form, Button, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { crearCitaPaciente } from "../services/citasServices";
import { obtenerMedicos } from "../services/medicoService";

const CrearCitaPaciente = ({ onCitaCreada, onCancel }) => {
  const [form, setForm] = useState({
    especialidad: "",
    medico: "",
    fecha: "",
    hora: "",
    motivo: "",
  });
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    obtenerMedicos()
      .then((res) => setMedicos(res.data.data))
      .catch(() =>
        setFeedback({
          type: "danger",
          message: "No se pudieron cargar los médicos.",
        })
      );
  }, []);

  const especialidades = [
    ...new Map(medicos.map((m) => [m.especialidad.id_especialidad, m.especialidad])).values(),
  ];

  const medicosFiltrados = medicos.filter(
    (m) => m.especialidad.id_especialidad == form.especialidad
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "especialidad" ? { medico: "" } : {}), // reset médico si cambia especialidad
    }));
  };

  const resetForm = () => {
    setForm({ especialidad: "", medico: "", fecha: "", hora: "", motivo: "" });
    setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await crearCitaPaciente({
        id_medico: form.medico,
        fecha: form.fecha,
        hora: form.hora,
        motivo: form.motivo,
      });
      setFeedback({ type: "success", message: "¡Cita creada correctamente!" });
      resetForm();
      onCitaCreada?.(); // notifica al padre
    } catch {
      setFeedback({ type: "danger", message: "Ocurrió un error al crear la cita." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.(); // notifica al padre
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="shadow-sm border-0 mt-4">
      <Card.Header className="bg-primary text-white text-center">
        <h5>📅 Crear Nueva Cita</h5>
      </Card.Header>

      <Card.Body>
        {feedback?.message && (
          <Alert variant={feedback.type}>{feedback.message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.id_especialidad} value={esp.id_especialidad}>
                    {esp.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Médico</Form.Label>
              <Form.Select
                name="medico"
                value={form.medico}
                onChange={handleChange}
                disabled={!form.especialidad}
                required
              >
                <option value="">Seleccione un médico</option>
                {medicosFiltrados.map((m) => (
                  <option key={m.id_medico} value={m.id_medico}>
                    {m.personal_clinico.nombres} {m.personal_clinico.apellido_paterno}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min={today}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                min="06:00"
                max="22:30"
                step="900" // 15 minutos
                required
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Motivo</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
              className="me-2"
            >
              Cancelar
            </Button>

            <Button type="submit" variant="success" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Creando...
                </>
              ) : (
                "Crear Cita"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CrearCitaPaciente;
