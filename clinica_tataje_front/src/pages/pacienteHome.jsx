import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Servicios
import {
  misDatos,
  actualizarCelularYEstadoCivil,
} from "../services/pacientes";
import { obtenerHistorialPaciente } from "../services/historialClinicoService";

// Componentes
import HistorialClinico from "../components/HistorialClinico";
import CrearCitaPaciente from "../components/CrearCitaPaciente";
import VerCitasPaciente from "../components/VerCitasPaciente";
import CambiarCredencialesModal from "../admin/components/CambiarCredencialesModal";

// Bootstrap
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

// Iconos
import {
  FaCalendarAlt,
  FaMars,
  FaPlus,
  FaSignOutAlt,
  FaVenus,
} from "react-icons/fa";

const PacienteHome = () => {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModalCrearCita, setShowModalCrearCita] = useState(false);
  const [showModalVerCitas, setShowModalVerCitas] = useState(false);
  const [showModalCambiarCredenciales, setShowModalCambiarCredenciales] =
    useState(false);

  const [editTelefono, setEditTelefono] = useState(false);
  const [telefonoTmp, setTelefonoTmp] = useState("");

  const [editEstadoCivil, setEditEstadoCivil] = useState(false);
  const [estadoCivilTmp, setEstadoCivilTmp] = useState("");

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = async () => {
    setLoading(true);
    try {
      const [resPaciente, resHistorial] = await Promise.all([
        misDatos(),
        obtenerHistorialPaciente(),
      ]);
      setPaciente(resPaciente.data);
      setHistorial(resHistorial.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron obtener los datos del paciente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("token_expiracion");
    localStorage.removeItem("token");
    navigate("/login-paciente");
  };

  const handleCitaCreada = () => setShowModalCrearCita(false);

  const handleEditarTelefono = () => {
    setTelefonoTmp(paciente.telefono || "");
    setEditTelefono(true);
  };

  const handleGuardarTelefono = async () => {
    try {
      await actualizarCelularYEstadoCivil({ telefono: telefonoTmp });
      setPaciente({ ...paciente, telefono: telefonoTmp });
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el teléfono.");
    } finally {
      setEditTelefono(false);
    }
  };

  const handleEditarEstadoCivil = () => {
    setEstadoCivilTmp(paciente.estado_civil || "");
    setEditEstadoCivil(true);
  };

  const handleGuardarEstadoCivil = async () => {
    try {
      await actualizarCelularYEstadoCivil({ estado_civil: estadoCivilTmp });
      setPaciente({ ...paciente, estado_civil: estadoCivilTmp });
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado civil.");
    } finally {
      setEditEstadoCivil(false);
    }
  };

  const renderGeneroIcon = (genero) =>
    genero === "Masculino" ? (
      <FaMars className="text-primary ms-2" />
    ) : (
      <FaVenus className="text-danger ms-2" />
    );

  if (loading) {
    return (
      <div className="text-center mt-5 paciente-home-loading">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-4 paciente-home-error">
        {error}
      </Alert>
    );
  }

  return (
    <Container fluid className="py-4 paciente-home-container">
      {/* Barra superior */}
      <div className="d-flex justify-content-between align-items-center mb-4 paciente-home-header">
        <h3 style={{ color: "#3f51b5", margin: 0 }}>👤 Perfil del Paciente</h3>
        <Button
          variant="outline-danger"
          onClick={handleCerrarSesion}
          className="paciente-home-cerrar-sesion"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </Button>
      </div>

      <Row className="g-3">
        {/* Columna izquierda - Datos personales */}
        <Col
          md={4}
          className="paciente-home-left"
          style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          <Card className="shadow-sm border-0 mb-4 paciente-home-card">
            <Card.Header className="bg-primary text-white text-center">
              <h5 className="mb-0">Datos Personales</h5>
            </Card.Header>

            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  {paciente.nombres} {paciente.apellido_paterno}
                </h5>
                {renderGeneroIcon(paciente.genero)}
              </div>

              <div className="mb-3">
                <Card.Subtitle className="text-muted">
                  DNI: <Badge bg="secondary">{paciente.dni}</Badge>
                </Card.Subtitle>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => setShowModalCambiarCredenciales(true)}
                  className="mt-2"
                >
                  🔒 Cambiar Credenciales
                </Button>

                <CambiarCredencialesModal
                  show={showModalCambiarCredenciales}
                  onHide={() => setShowModalCambiarCredenciales(false)}
                />
              </div>

              <hr />

              <p><strong>Apellido Materno:</strong> {paciente.apellido_materno}</p>
              <p><strong>Fecha Nacimiento:</strong> {paciente.fecha_nacimiento}</p>
              <p><strong>Ubigeo:</strong> {paciente.ubigeo}</p>
              <p><strong>Dirección:</strong> {paciente.direccion || <em>No registrada</em>}</p>

              {/* Teléfono editable */}
              <p>
                <strong>Teléfono:</strong>{" "}
                {editTelefono ? (
                  <div className="d-flex flex-wrap gap-2">
                    <Form.Control
                      size="sm"
                      value={telefonoTmp}
                      onChange={(e) => setTelefonoTmp(e.target.value)}
                      placeholder="Ingrese teléfono"
                      style={{ maxWidth: "200px" }}
                    />
                    <div className="btn-group btn-group-sm">
                      <Button variant="success" onClick={handleGuardarTelefono}>✔</Button>
                      <Button variant="secondary" onClick={() => setEditTelefono(false)}>✖</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {paciente.telefono || <em>No registrado</em>}{" "}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleEditarTelefono}
                      title="Editar teléfono"
                      className="text-primary p-0"
                    >
                      ✏️
                    </Button>
                  </>
                )}
              </p>

              {/* Estado civil editable */}
              <p>
                <strong>Estado Civil:</strong>{" "}
                {editEstadoCivil ? (
                  <div className="d-flex flex-wrap gap-2">
                    <Form.Select
                      size="sm"
                      value={estadoCivilTmp}
                      onChange={(e) => setEstadoCivilTmp(e.target.value)}
                      style={{ maxWidth: "200px" }}
                    >
                      <option value="">Seleccione</option>
                      <option value="SOLTERO">Soltero</option>
                      <option value="CASADO">Casado</option>
                      <option value="DIVORCIADO">Divorciado</option>
                      <option value="VIUDO">Viudo</option>
                    </Form.Select>
                    <div className="btn-group btn-group-sm">
                      <Button variant="success" onClick={handleGuardarEstadoCivil}>✔</Button>
                      <Button variant="secondary" onClick={() => setEditEstadoCivil(false)}>✖</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {paciente.estado_civil || <em>No registrado</em>}{" "}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleEditarEstadoCivil}
                      title="Editar estado civil"
                      className="text-primary p-0"
                    >
                      ✏️
                    </Button>
                  </>
                )}
              </p>
            </Card.Body>
          </Card>

          {/* Botones de citas */}
          <div className="d-grid gap-2">
            <Button
              variant="info"
              onClick={() => setShowModalVerCitas(true)}
              className="paciente-home-citas-btn"
            >
              <FaCalendarAlt /> Ver Citas
            </Button>
            <Button
              variant="success"
              onClick={() => setShowModalCrearCita(true)}
              className="paciente-home-citas-btn"
            >
              <FaPlus /> Crear Cita
            </Button>
          </div>
        </Col>

        {/* Columna derecha - Historial clínico */}
        <Col md={8} className="paciente-home-right">
          <HistorialClinico historial={historial} paciente={paciente} />
        </Col>
      </Row>

      {/* Modal Crear Cita */}
      <Modal
        show={showModalCrearCita}
        onHide={() => setShowModalCrearCita(false)}
        size="lg"
        centered
        className="paciente-home-modal"
      >
        <Modal.Body>
          <CrearCitaPaciente
            onCitaCreada={handleCitaCreada}
            onCancel={() => setShowModalCrearCita(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Ver Citas */}
      <Modal
        show={showModalVerCitas}
        onHide={() => setShowModalVerCitas(false)}
        size="xl"
        centered
        className="paciente-home-modal"
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">📅 Citas del Paciente</h4>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowModalVerCitas(false)}
              title="Cerrar"
            >
              ✖
            </Button>
          </div>
          <VerCitasPaciente pacienteId={paciente.id} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PacienteHome;
