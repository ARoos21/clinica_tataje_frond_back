import '../styles/Footer.css'
function Footer() { 
  return (
    <footer className="text-light py-5 mt-5" style={{ backgroundColor: '#000000' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-warning">Sobre Clínica Tataje</h5>
            <p className="text-light">En Clínica Tataje, nos dedicamos a ofrecerte atención médica de calidad. Contamos con un equipo profesional comprometido con tu salud y bienestar.</p>
            <p className="text-light">&copy; 2025 ClínicaTataje. Todos los derechos reservados.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-warning">Contacto</h5>
            <ul className="list-unstyled">
              <li><strong>Dirección:</strong> Av Conde de Nieva 355, Ica </li>
              <li><strong>Teléfono:</strong> (+51) 953 362 254</li>
              <li><strong>Correo electrónico:</strong> contacto@clinicatataje.com</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-warning">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/sobre-nosotros" className="text-light">Sobre Nosotros</a></li>
              <li><a href="/política-privacidad" className="text-light">Política de Privacidad</a></li>
              <li><a href="/terminos-servicio" className="text-light">Términos de Servicio</a></li>
              <li><a href="/contacto" className="text-light">Contáctanos</a></li>
            </ul>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="text-center">
          <h5 className="text-warning">Síguenos</h5>
          <div>
            <a href="https://www.facebook.com/clinicatatajehttps://www.facebook.com/profile.php?id=61553965242463" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: '#ff7f00' }}></i>
            </a>
            <a href="https://www.instagram.com/clinicatataje" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="bi bi-instagram" style={{ fontSize: '1.5rem', color: '#ff7f00' }}></i>
            </a>
            <a href="https://twitter.com/clinicatataje" target="_blank" rel="noopener noreferrer" className="mx-2">
              <i className="bi bi-twitter" style={{ fontSize: '1.5rem', color: '#ff7f00' }}></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
