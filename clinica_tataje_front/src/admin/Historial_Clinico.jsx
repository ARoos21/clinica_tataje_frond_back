import React, { useState } from 'react';
import { getPacientes } from '../services/pacientes';
import { obtenerHistorialPorID } from '../services/historialClinicoService';
import {
  Container, Row, Col, Card, Form, Button, Alert, Badge, Dropdown, DropdownButton
} from 'react-bootstrap';
import { FaMars, FaVenus, FaSearch, FaTimesCircle, FaBroom } from 'react-icons/fa';
import ConsultaPdfButton from './components/ConsultaPdfButton';

function Historial_Clinico() {
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ fechaDesde: '', fechaHasta: '', medico: '', especialidad: '' });

  const buscarHistorial = async () => {
    setError('');
    setPaciente(null);
    setHistorial([]);
    setFiltros({ fechaDesde: '', fechaHasta: '', medico: '', especialidad: '' });

    try {
      const { data } = await getPacientes();
      const encontrado = data.find((p) => p.dni === dni);
      if (!encontrado) {
        setError('Paciente no encontrado');
        return;
      }
      setPaciente(encontrado);
      const response = await obtenerHistorialPorID({ id_paciente: encontrado.id_paciente });
      setHistorial(response.data);
    } catch (err) {
      setError('Ocurrió un error al buscar el historial.');
    }
  };

  const limpiarTodo = () => {
    setDni('');
    setPaciente(null);
    setHistorial([]);
    setError('');
    setFiltros({ fechaDesde: '', fechaHasta: '', medico: '', especialidad: '' });
  };

  const limpiarFiltros = () => {
    setFiltros({ fechaDesde: '', fechaHasta: '', medico: '', especialidad: '' });
  };

  const renderGeneroIcon = (genero) =>
    genero === 'Masculino' ? <FaMars className="text-primary ms-2" /> : <FaVenus className="text-danger ms-2" />;

  const handleFiltro = (tipo, valor) => {
    setFiltros({ ...filtros, [tipo]: valor });
  };

  const medicosUnicos = [...new Set(historial.map(c => `${c.cita.medico.nombres} ${c.cita.medico.apellido_paterno}`))];
  const especialidadesUnicas = [...new Set(historial.map(c => c.cita.medico.especialidad))];

  const historialFiltrado = historial.filter((consulta) => {
    const { fechaDesde, fechaHasta, medico, especialidad } = filtros;
    const consultaFecha = consulta.cita.fecha;

    const cumpleFechaDesde = !fechaDesde || consultaFecha >= fechaDesde;
    const cumpleFechaHasta = !fechaHasta || consultaFecha <= fechaHasta;
    const cumpleMedico = !medico || `${consulta.cita.medico.nombres} ${consulta.cita.medico.apellido_paterno}`.toLowerCase().includes(medico.toLowerCase());
    const cumpleEspecialidad = !especialidad || consulta.cita.medico.especialidad.toLowerCase().includes(especialidad.toLowerCase());

    return cumpleFechaDesde && cumpleFechaHasta && cumpleMedico && cumpleEspecialidad;
  });

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4 text-center" style={{ color: "#1e3144" }}>
        📋 Historial Clínico del Paciente
      </h3>

      <Form className="mb-4">
        <Row className="align-items-end g-2 justify-content-center">
          <Col md={4}>
            <Form.Group>
              <Form.Label style={{ color: "#1e3144", fontWeight: "600" }}>DNI del Paciente</Form.Label>
              <Form.Control
                type="text"
                maxLength={8}
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingrese DNI (8 dígitos)"
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <Button style={{ backgroundColor: "#1e3144", borderColor: "#1e3144" }} onClick={buscarHistorial}>
              <FaSearch /> Buscar
            </Button>
          </Col>
          {paciente && (
            <Col md="auto">
              <Button variant="outline-danger" onClick={limpiarTodo}>
                <FaTimesCircle /> Limpiar Todo
              </Button>
            </Col>
          )}
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {paciente && (
        <Row>
          {/* Panel izquierdo */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header style={{ backgroundColor: "#1e3144" }} className="text-white text-center">
                <h5 className="mb-0">Datos del Paciente</h5>
              </Card.Header>
              <Card.Body>
                <Card.Title className="d-flex align-items-center justify-content-between">
                  <span>{paciente.nombres} {paciente.apellido_paterno}</span>
                  {renderGeneroIcon(paciente.genero)}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  DNI: <Badge bg="secondary">{paciente.dni}</Badge>
                </Card.Subtitle>
                <hr />
                <p><strong>Apellido Materno:</strong> {paciente.apellido_materno}</p>
                <p><strong>F. Nacimiento:</strong> {paciente.fecha_nacimiento}</p>
                <p><strong>Ubigeo:</strong> {paciente.ubigeo}</p>
                <p><strong>Teléfono:</strong> {paciente.telefono || <em>No registrado</em>}</p>
              </Card.Body>
            </Card>

            {/* Filtros */}
            <Card className="shadow-sm border-0">
              <Card.Header style={{ backgroundColor: "#1e3144" }} className="text-white text-center">
                <h6 className="mb-0">Filtros de Búsqueda</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-2">
                  <Form.Label>Desde</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    value={filtros.fechaDesde}
                    onChange={(e) => handleFiltro('fechaDesde', e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <Form.Label>Hasta</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    value={filtros.fechaHasta}
                    onChange={(e) => handleFiltro('fechaHasta', e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <DropdownButton size="sm" variant="outline-secondary" title={filtros.medico || `Seleccionar médico`}>
                    {medicosUnicos.map(m => (
                      <Dropdown.Item key={m} onClick={() => handleFiltro('medico', m)}>
                        {m}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
                <div className="mb-2">
                  <DropdownButton size="sm" variant="outline-secondary" title={filtros.especialidad || `Seleccionar especialidad`}>
                    {especialidadesUnicas.map(e => (
                      <Dropdown.Item key={e} onClick={() => handleFiltro('especialidad', e)}>
                        {e}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
                <div className="mt-3">
                  {Object.entries(filtros).map(([k, v]) => v && (
                    <Badge bg="secondary" className="me-1" key={k}>
                      {k}: {v}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <Button variant="outline-warning" size="sm" onClick={limpiarFiltros}>
                    <FaBroom /> Limpiar filtros
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Panel derecho */}
          <Col md={8}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="text-white text-center" style={{ backgroundColor: "#1e3144" }}>
                <h5 className="mb-0">Consultas Médicas</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '600px', overflowY: 'auto', background: '#f9f9f9' }}>
                <Row xs={1} md={1} className="g-3">
                  {historialFiltrado.length > 0 ? (
                    historialFiltrado.map((consulta, index) => (
  <Col key={consulta.id_consulta}>
    <Card className="h-100 shadow-sm border border-primary">
      <Card.Header className="bg-light text-center">
        <strong className="text-primary">
          Consulta #{index + 1}
        </strong>
      </Card.Header>

                          <Card.Body>
                            <div className="d-flex justify-content-end mb-2">
                              <ConsultaPdfButton consulta={consulta} paciente={paciente} />
                            </div>
                            <Card.Subtitle className="mb-2 text-muted">
                              <small>
                                <strong>Fecha:</strong> {consulta.cita.fecha} <br />
                                <strong>Hora:</strong> {consulta.cita.hora}
                              </small>
                            </Card.Subtitle>
                            <p><strong>Motivo:</strong> {consulta.cita.motivo}</p>
                            <p><strong>Diagnóstico:</strong> {consulta.diagnostico}</p>
                            <p><strong>Tratamiento:</strong> {consulta.tratamiento}</p>
                            {consulta.observaciones && (
                              <p><strong>Observaciones:</strong> {consulta.observaciones}</p>
                            )}
                            <hr />
                            <p className="mb-0">
                              <strong>Médico:</strong> {consulta.cita.medico.nombres} {consulta.cita.medico.apellido_paterno}<br />
                              <strong>Especialidad:</strong> {consulta.cita.medico.especialidad}
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <p className="text-muted text-center">
                      No se encontraron consultas médicas para este paciente.
                    </p>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Historial_Clinico;
