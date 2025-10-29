import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/admin/OffcanvasCustom.css';
import '../styles/admin/CarouselCustom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Componente de íconos flotantes compartidos
function FloatingIcons() {
  const iconos = [
    { className: 'bi-heart-pulse', style: { top: '10%', left: '5%' } },
    { className: 'bi-thermometer-half', style: { top: '30%', right: '10%' } },
    { className: 'bi-hospital', style: { top: '50%', left: '10%' } },
    { className: 'bi-stethoscope', style: { top: '25%', right: '20%' } },
    { className: 'bi-capsule', style: { top: '60%', left: '30%' } },
    { className: 'bi-clipboard2-pulse', style: { top: '75%', right: '15%' } }
  ];

  return (
    <>
      {iconos.map((icon, idx) => (
        <i
          key={idx}
          className={`bi ${icon.className} icono-animado position-absolute`}
          style={icon.style}
        ></i>
      ))}
    </>
  );
}

function Home() {
  const [modalInfo, setModalInfo] = useState(null);
  const valores = [
    {
      icon: "emoji-smile",
      title: "Calidez Humana",
      description: "Trato amable, empático y humano hacia nuestros pacientes.",
      image: "/images/calidez.jpeg"
    },
    {
      icon: "cpu",
      title: "Tecnología Moderna",
      description: "Contamos con equipos de última generación para un diagnóstico preciso.",
      image: "/images/tecnologia.jpeg"
    },
    {
      icon: "people-fill",
      title: "Profesionales Expertos",
      description: "Médicos altamente capacitados y con amplia experiencia.",
      image: "/images/expertos.jpeg"
    },
    {
      icon: "stopwatch",
      title: "Atención Rápida",
      description: "Procesos ágiles que reducen tiempos de espera.",
      image: "/images/rapida.jpeg"
    }
  ];

  return (
    <div>
      <Header/>

      {/* CAROUSEL */}
      <Carousel controls={false} indicators={true}>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner1.jpg" alt="Banner 1" style={{ height: '500px', objectFit: 'cover' }} />
          <Carousel.Caption>
            <h2 className="text-light">Miércoles de Bienestar</h2>
            <p>Cuidamos tu salud con los mejores especialistas</p>
            <Link to="/contacto" className="btn btn-dark">Contáctanos</Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner2.jpg" alt="Banner 2" style={{ height: '500px', objectFit: 'cover' }} />
          <Carousel.Caption>
            <h2 className="text-light">Agenda tu cita ahora</h2>
            <p>Fácil, rápido y sin complicaciones</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* SERVICIOS */}
      <div className="container position-relative overflow-hidden"  style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <FloatingIcons/>
        <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>¿En qué podemos ayudarte?</h2>
        <div className="row g-4">
          {[
            { icon: "calendar3", title: "Reserva una cita", desc: "Agenda desde casa", link: "/reservar", label: "Reservar" },
            { icon: "person-vcard", title: "Staff Médico", desc: "Conoce a nuestros especialistas", link: "/staffMedico", label: "Conoce al Staff" },
            { icon: "journal-medical", title: "Servicios", desc: "Consulta nuestros servicios", link: "/servicios", label: "Conoce más" },
            { icon: "people", title: "Programa de previcion", desc: "Atención integral para ti", link: "/programas", label: "Ver más" },
          ].map((item, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="servicio-card text-center h-100">
                <i className={`bi bi-${item.icon} display-4 mb-3`} style={{ color: '#ff7f00' }}></i>
                <h5>{item.title}</h5>
                <p className="servicio-desc">{item.desc}</p>
                <Link to={item.link} className="btn btn-dark">{item.label}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VALORES */}
      <div className="position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <FloatingIcons/>
        <div className="container text-center">
          <h2 className="text-center mb-5" style={{ color: '#ff7f00' }}>Nuestros valores nos definen</h2>
          <div className="row g-4">
            {valores.map((item, idx) => (
              <div className="col-md-3" key={idx}>
                <div
                  className="valor-card bg-white border rounded shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center hover-effect"
                  onClick={() => setModalInfo(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi bi-${item.icon} display-4 mb-3`} style={{ color: '#ff7f00' }}></i>
                  <h5 className="fw-bold">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalInfo && (
        <Modal show onHide={() => setModalInfo(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column flex-md-row align-items-center gap-3">
            <img
              src={modalInfo.image}
              alt={modalInfo.title}
              style={{ width: "100%", maxWidth: "250px", borderRadius: "8px" }}
            />
            <p className="mb-0">{modalInfo.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalInfo(null)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* TESTIMONIOS */}
      <div className="container-fluid position-relative" style={{ overflow: 'visible', paddingTop: '6rem', paddingBottom: '6rem'  }}>
      <FloatingIcons />
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: '#ff7f00' }}>Testimonios de nuestros pacientes</h2>
        <Carousel controls={true} indicators={false} interval={null} className="testimonios-carousel">
          {[
            [
              { name: "Ana R.", text: "Excelente atención, rápida y profesional." },
              { name: "Carlos M.", text: "Los doctores son muy empáticos y me ayudaron bastante." },
              { name: "Lucía G.", text: "Recomiendo la clínica, muy moderna y eficiente." },
              { name: "Pedro S.", text: "Buena atención y seguimiento post consulta." }
            ],
            [
              { name: "Marta C.", text: "Muy puntuales y atentos." },
              { name: "Luis T.", text: "Me ayudaron con mi tratamiento a tiempo." },
              { name: "Raquel Z.", text: "Ambiente limpio y seguro." },
              { name: "Andrés Q.", text: "Todo muy profesional y ordenado." }
            ]
          ].map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="row g-4">
                {group.map((test, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="border p-4 rounded shadow-sm h-100">
                      <p className="fst-italic">"{test.text}"</p>
                      <h6 className="mt-3 text-end">- {test.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>


      {/* CTA */}
      <div className="py-4 text-center" style={{ backgroundColor: '#ff7f00', color: '#fff' }}>
        <h4>¿Listo para cuidar tu salud?</h4>
        <Link to="/reservar" className="btn btn-dark mt-2">Reserva tu cita ahora</Link>
      </div>

      <Footer/>
    </div>
  );
}

export default Home;