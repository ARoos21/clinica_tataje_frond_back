import { useEffect, useState } from "react";
import { getCitasPaciente } from "../services/citasServices";
import { Table, Spinner, Alert, Badge, Button, Form, Row, Col, Card } from "react-bootstrap";

const VerCitasPaciente = ({ onClose }) => {
    const [citas, setCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filtros, setFiltros] = useState({
        fechaDesde: "",
        fechaHasta: "",
        especialidad: "",
        estado: "PROGRAMADA",
    });

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const res = await getCitasPaciente();
                setCitas(res.data);
                setFilteredCitas(res.data.filter(c => c.estado === "PROGRAMADA"));

                // Extraer especialidades únicas
                const uniqueEspecialidades = [
                    ...new Set(
                        res.data.map(c => c.id_medico.id_especialidad.nombre)
                    )
                ];
                setEspecialidades(uniqueEspecialidades);

            } catch (err) {
                console.error(err);
                setError("No se pudieron obtener las citas.");
            } finally {
                setLoading(false);
            }
        };
        fetchCitas();
    }, []);

    const renderEstadoBadge = (estado) => {
        const colors = {
            PROGRAMADA: "primary",
            REALIZADA: "success",
            CANCELADA: "danger",
        };
        return <Badge bg={colors[estado] || "secondary"}>{estado}</Badge>;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const handleFiltrar = () => {
        const { fechaDesde, fechaHasta, especialidad, estado } = filtros;
        let filtradas = citas;

        if (fechaDesde) filtradas = filtradas.filter(c => c.fecha >= fechaDesde);
        if (fechaHasta) filtradas = filtradas.filter(c => c.fecha <= fechaHasta);
        if (especialidad)
            filtradas = filtradas.filter(c =>
                c.id_medico.id_especialidad.nombre === especialidad
            );
        if (estado !== "TODAS") filtradas = filtradas.filter(c => c.estado === estado);

        setFilteredCitas(filtradas);
    };

    const handleLimpiar = () => {
        setFiltros({ fechaDesde: "", fechaHasta: "", especialidad: "", estado: "PROGRAMADA" });
        setFilteredCitas(citas.filter(c => c.estado === "PROGRAMADA"));
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando citas...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center">{error}</Alert>;
    }

    if (citas.length === 0) {
        return <Alert variant="info" className="text-center">No tienes citas registradas.</Alert>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Form className="mb-3">
                    <Row className="gy-2 gx-3 align-items-end">
                        <Col xs={6} md={2}>
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleChange}
                            >
                                {["PROGRAMADA", "REALIZADA", "CANCELADA", "TODAS"].map(op => (
                                    <option key={op} value={op}>{op.charAt(0) + op.slice(1).toLowerCase()}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col xs={6} md={2}>
                            <Form.Label>Desde</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaDesde"
                                value={filtros.fechaDesde}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={6} md={2}>
                            <Form.Label>Hasta</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaHasta"
                                value={filtros.fechaHasta}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Select
                                name="especialidad"
                                value={filtros.especialidad}
                                onChange={handleChange}
                            >
                                <option value="">Todas</option>
                                {especialidades.map(esp => (
                                    <option key={esp} value={esp}>{esp}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col xs={12} md={3} className="d-flex gap-2">
                            <Button size="sm" variant="primary" onClick={handleFiltrar}>Filtrar</Button>
                            <Button size="sm" variant="outline-secondary" onClick={handleLimpiar}>Limpiar</Button>
                        </Col>
                    </Row>
                </Form>

                <Table bordered hover responsive size="sm" className="align-middle text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCitas.map((cita, index) => (
                            <tr key={cita.id_cita}>
                                <td>{index + 1}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.motivo}</td>
                                <td>{renderEstadoBadge(cita.estado)}</td>
                                <td>{`${cita.id_medico.id_personal.nombres} ${cita.id_medico.id_personal.apellido_paterno}`}</td>
                                <td>{cita.id_medico.id_especialidad.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default VerCitasPaciente;
