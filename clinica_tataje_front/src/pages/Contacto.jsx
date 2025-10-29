import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contacto.css'; // Nuevos estilos

function Contacto() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Sección de Introducción con Fondo de Imagen */}
      <div className="hero-section">
        <div className="container text-center py-5">
          <h2 className="text-white mb-4">Contáctanos</h2>
          <p className="text-white mb-4 lead">
            Si tienes alguna pregunta o deseas más información, no dudes en ponerte en contacto con nosotros.
          </p>
        </div>
      </div>

      {/* Sección de Información de Contacto */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="contact-info">
              <h4 className="text-warning">Información de Contacto</h4>
              <ul className="contact-list">
                <li><strong>Dirección:</strong> Av Conde de Nieva 355, Ica </li>
                <li><strong>Teléfono:</strong> (+51) 953 362 254</li>
                <li><strong>Correo Electrónico:</strong> contacto@clinicatataje.com</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-image">
              <img src="https://i.pinimg.com/736x/54/0b/53/540b53daecb46d3136a49e964d477395.jpg" alt="Clínica Tataje" className="img-fluid rounded shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Formulario de Contacto */}
      <div className="container py-5">
        <h4 className="text-center text-warning mb-4">Formulario de Contacto</h4>
        <form className="contact-form">
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control rounded-pill" placeholder="Tu Nombre" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="email" className="form-control rounded-pill" placeholder="Tu Correo" required />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-12">
              <textarea className="form-control rounded-3" rows="4" placeholder="Tu Mensaje" required></textarea>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-warning btn-lg rounded-pill">Enviar Mensaje</button>
          </div>
        </form>
      </div>

      {/* Sección de Ubicación con Mapa Estático */}
      <div className="container py-5">
        <h4 className="text-center text-warning mb-4">Ubicación</h4>
        <div className="row">
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.280551135429!2d-75.7271395!3d-14.0733729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e29ac9ca39d7%3A0x1c7ca466b1cd126!2sCl%C3%ADnica%20Tataje!5e0!3m2!1ses!2spe!4v1635331454570!5m2!1ses!2spe"
              width="100%"
              height="300"
              style={{ border: '0', borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-md-6">
            <img src="https://i.pinimg.com/736x/a0/11/0a/a0110a70f9f1ebc46bf9724acc3e6fe7.jpg" alt="Clínica Tataje" className="img-fluid rounded shadow-lg" />
          </div>
        </div>
      </div>

      {/* Sección de Llamada a la Acción (CTA) */}
      <div className="cta-section text-center py-5" style={{ backgroundColor: '#ff7f00' }}>
        <h3 className="text-white mb-4">¡Estamos aquí para ayudarte!</h3>
        <a href="/reservar" className="btn btn-dark btn-lg rounded-pill">Reserva tu cita ahora</a>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contacto;
