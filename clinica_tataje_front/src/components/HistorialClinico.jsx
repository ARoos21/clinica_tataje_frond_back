import { useState, useMemo, useCallback } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FaHeartbeat } from "react-icons/fa";
import ConsultaPdfButton from "../admin/components/ConsultaPdfButton";

const HistorialClinico = ({ historial = [], paciente }) => {
  const [filtros, setFiltros] = useState({ desde: "", hasta: "", especialidad: "" });

  const especialidades = useMemo(() => {
    if (!Array.isArray(historial) || historial.length === 0) return [];
    return [...new Set(historial.map(c => c.cita?.medico?.especialidad).filter(Boolean))];
  }, [historial]);

  const handleFiltroChange = useCallback((e) => {
    setFiltros(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleLimpiarFiltros = useCallback(() => {
    setFiltros({ desde: "", hasta: "", especialidad: "" });
  }, []);

  const aplicarFiltros = useCallback((consulta) => {
    const fechaConsulta = new Date(consulta.cita?.fecha);
    const desde = filtros.desde ? new Date(filtros.desde) : null;
    const hasta = filtros.hasta ? new Date(filtros.hasta) : null;

    if (desde && fechaConsulta < desde) return false;
    if (hasta && fechaConsulta > hasta) return false;

    if (filtros.especialidad && consulta.cita?.medico?.especialidad !== filtros.especialidad) {
      return false;
    }

    return true;
  }, [filtros]);

  const historialFiltrado = useMemo(() => (
    (Array.isArray(historial) ? historial : []).filter(aplicarFiltros)
  ), [historial, aplicarFiltros]);

  return (
    <Card className="shadow border-0">
      <Card.Header className="bg-success text-white text-center">
        <h5 className="mb-0 d-flex align-items-center justify-content-center">
          <FaHeartbeat />&nbsp;Historial Clínico del Paciente
        </h5>
      </Card.Header>

      <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
        {(!historial || historial.length === 0) ? (
          <p className="text-muted text-center my-4">
            Este paciente aún no cuenta con consultas médicas registradas en el sistema.
          </p>
        ) : (
          <>
            {/* Filtros - mejor distribuidos */}
            <div className="mb-3 sticky-top bg-white pt-3 pb-2 px-2 rounded shadow-sm" style={{ zIndex: 1 }}>
              <Form>
                <Row className="gy-2 gx-3">
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Label>Desde</Form.Label>
                      <Form.Control
                        type="date"
                        name="desde"
                        value={filtros.desde}
                        onChange={handleFiltroChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Label>Hasta</Form.Label>
                      <Form.Control
                        type="date"
                        name="hasta"
                        value={filtros.hasta}
                        onChange={handleFiltroChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group>
                      <Form.Label>Especialidad</Form.Label>
                      <Form.Select
                        name="especialidad"
                        value={filtros.especialidad}
                        onChange={handleFiltroChange}
                        size="sm"
                      >
                        <option value="">Todas</option>
                        {especialidades.map((esp, idx) => (
                          <option key={idx} value={esp}>{esp}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={2} className="d-flex align-items-end">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleLimpiarFiltros}
                      className="w-100"
                    >
                      Limpiar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>

            {/* Historial con scroll */}
            <div style={{ maxHeight: "400px", overflowY: "auto", paddingTop: "1rem" }}>
              {historialFiltrado.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {historialFiltrado.map((consulta, index) => (
                    <Card
                      key={consulta.id_consulta || index}
                      className="h-100 shadow-sm border border-success"
                    >
                      <Card.Header className="bg-light text-center">
                        <strong className="text-success">
                          Consulta N.º {index + 1}
                        </strong>
                      </Card.Header>
                      <Card.Body>
                        <Row className="align-items-center mb-3">
                          <Col md={8}>
                            <div className="d-flex flex-wrap gap-3 text-muted">
                              <div>
                                <strong>📅 Fecha:</strong> {consulta.cita?.fecha || "—"}
                              </div>
                              <div>
                                <strong>⏰ Hora:</strong> {consulta.cita?.hora || "—"}
                              </div>
                              <div>
                                <span className="badge bg-gradient bg-success text-white">
                                  {consulta.cita?.medico?.especialidad || "—"}
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col md={4} className="text-md-end mt-3 mt-md-0">
                            <ConsultaPdfButton consulta={consulta} paciente={paciente} />
                          </Col>
                        </Row>

                        <hr />

                        <Row className="mb-2">
                          <Col>
                            <h6 className="text-success fw-bold mb-1">🩺 Motivo de la consulta</h6>
                            <p>{consulta.cita?.motivo || <span className="text-muted">No especificado</span>}</p>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col md={6}>
                            <h6 className="text-success fw-bold mb-1">🔬 Diagnóstico</h6>
                            <p>{consulta.diagnostico || <span className="text-muted">No registrado</span>}</p>
                          </Col>
                          <Col md={6}>
                            <h6 className="text-success fw-bold mb-1">💊 Tratamiento</h6>
                            <p>{consulta.tratamiento || <span className="text-muted">No registrado</span>}</p>
                          </Col>
                        </Row>

                        {consulta.observaciones && (
                          <Row className="mb-2">
                            <Col>
                              <h6 className="text-success fw-bold mb-1">📝 Observaciones</h6>
                              <p>{consulta.observaciones}</p>
                            </Col>
                          </Row>
                        )}

                        <hr />

                        <Row>
                          <Col>
                            <div className="d-flex flex-wrap gap-3 align-items-center">
                              <div>
                                <strong>👨‍⚕️ Médico:</strong> {consulta.cita?.medico?.nombres || "—"} {consulta.cita?.medico?.apellido_paterno || ""}
                              </div>
                              <div className="text-muted">
                                <small>
                                  <strong>Especialidad:</strong> {consulta.cita?.medico?.especialidad || "—"}
                                </small>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center">
                  No se encontraron registros que coincidan con los filtros seleccionados.
                </p>
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialClinico;
