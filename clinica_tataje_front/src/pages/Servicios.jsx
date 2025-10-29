import Header from '../components/Header';
import Footer from '../components/Footer';
import { Carousel } from 'react-bootstrap';
import '../styles/Servicios.css'; // Estilos personalizados para este diseño innovador

function Servicios() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Sección de Introducción */}
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>Nuestros Servicios Médicos</h2>
        <p className="text-center mb-4" style={{ fontSize: '18px', color: '#555' }}>
          En Clínica Tataje, nos dedicamos a ofrecerte la mejor atención médica. Descubre los servicios innovadores que tenemos para ti.
        </p>

        {/* Carrusel de Servicios */}
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src="https://i.pinimg.com/736x/58/81/63/5881630d233f1d1af39c5760466f5375.jpg" alt="Consultas Médicas" style={{ height: '400px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <h3>Consultas Médicas</h3>
              <p>Atención médica personalizada en diversas especialidades.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://i.pinimg.com/1200x/bb/97/6f/bb976f0e31ef90f95b465b0c6a0c1491.jpg" alt="Exámenes Médicos" style={{ height: '400px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <h3>Exámenes Médicos</h3>
              <p>Realizamos exámenes completos para un diagnóstico preciso.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://i.pinimg.com/736x/ad/61/73/ad617397a9d4f5946271ad7faab79fa5.jpg" alt="Cirugía General" style={{ height: '400px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <h3>Cirugía General</h3>
              <p>Contamos con un equipo especializado para procedimientos quirúrgicos.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://i.pinimg.com/736x/b0/11/51/b011511b846bd20e95f05bca782210e5.jpg" alt="Rehabilitación" style={{ height: '400px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <h3>Rehabilitación</h3>
              <p>Brindamos servicios de rehabilitación física y terapia.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Sección de Beneficios */}
      <div className="container py-5">
        <h3 className="text-center mb-4" style={{ color: '#ff7f00' }}>¿Por qué elegirnos?</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="benefit-card">
              <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#ff7f00' }}></i>
              <h5>Atención Personalizada</h5>
              <p>Cada paciente es tratado de manera única, con un enfoque personalizado según sus necesidades.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="benefit-card">
              <i className="bi bi-gear" style={{ fontSize: '3rem', color: '#ff7f00' }}></i>
              <h5>Tecnología Avanzada</h5>
              <p>Contamos con equipos médicos de última generación para garantizar diagnósticos precisos y rápidos.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="benefit-card">
              <i className="bi bi-heart" style={{ fontSize: '3rem', color: '#ff7f00' }}></i>
              <h5>Compromiso con tu Salud</h5>
              <p>Nos aseguramos de que cada paso en tu atención sea de la más alta calidad, cuidando cada detalle de tu salud.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="container py-5">
        <h3 className="text-center mb-4" style={{ color: '#ff7f00' }}>Testimonios de Nuestros Pacientes</h3>
        <div className="row g-4">
          {[ 
            { name: "Ana R.", text: "Excelente atención, rápida y profesional." },
            { name: "Carlos M.", text: "Los doctores son muy empáticos y me ayudaron bastante." },
            { name: "Lucía G.", text: "Recomiendo la clínica, muy moderna y eficiente." },
          ].map((test, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="border p-4 rounded shadow-sm h-100">
                <p className="fst-italic">"{test.text}"</p>
                <h6 className="mt-3 text-end">- {test.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Preguntas Frecuentes */}
      <div className="container py-5">
        <h3 className="text-center mb-4" style={{ color: '#ff7f00' }}>Preguntas Frecuentes</h3>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                ¿Qué servicios médicos ofrecen?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Ofrecemos consultas médicas, exámenes diagnósticos, cirugía general, rehabilitación física, entre otros servicios especializados.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                ¿Cómo puedo reservar una cita?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Puedes reservar una cita directamente en nuestra página web, a través de la sección "Reserva una cita", o llamando a nuestra línea de atención.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Mapa de Ubicación */}
      <div className="container py-5">
        <h3 className="text-center mb-4" style={{ color: '#ff7f00' }}>Ubicación</h3>
        <div className="text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.280551135429!2d-75.7271395!3d-14.0733729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e29ac9ca39d7%3A0x1c7ca466b1cd126!2sCl%C3%ADnica%20Tataje!5e0!3m2!1ses!2spe!4v1635331454570!5m2!1ses!2spe"
            width="100%"
            height="450"
            style={{ border: '0', borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Llamada a la acción (CTA) */}
      <div className="cta-section text-center py-5">
        <h3 className="text-white">¿Listo para cuidar tu salud?</h3>
        <a href="/contacto" className="btn btn-dark mt-3">Contáctanos para más información</a>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Servicios;
