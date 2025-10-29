import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/SobreNosotros.css'; // Estilos personalizados


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


function SobreNosotros() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Sección de Introducción */}
      <div className="about-hero">
        <div className="container text-center py-5">
          <h2 className="text-white mb-4">Sobre Nosotros</h2>
          <p className="text-white mb-4 lead">
            En Clínica Tataje, nuestra misión es brindar atención médica de calidad, asegurando que cada paciente reciba el mejor tratamiento posible.
          </p>
        </div>
      </div>

      {/* Sección de Historia de la Clínica */}
      <div className="container position-relative" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <FloatingIcons/>
        <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>Nuestra Historia</h2>
        
        <div className="row">
          <div className="col-md-6">
            <p className="about-text">
              La Clínica Tataje fue fundada en el año 2010 con el propósito de brindar atención médica de calidad, personalizada y accesible. Desde sus inicios, la clínica se ha caracterizado por su enfoque humano, convirtiéndose en un centro de confianza para las familias que buscan servicios de salud seguros y profesionales. Comenzó ofreciendo consultas generales y servicios básicos, pero gracias al compromiso de su equipo y al respaldo de la comunidad, experimentó un crecimiento constante.
              <br /><br />
              A lo largo de los años, la clínica ha ampliado su infraestructura y sus especialidades médicas, incorporando áreas como pediatría, ginecología, medicina interna, odontología, cardiología, psicología, entre otras. Este desarrollo ha estado acompañado de una fuerte apuesta por la innovación tecnológica , implementando equipos de diagnóstico modernos, historia clínica digital y atención remota para asegurar un servicio eficiente y de vanguardia.
             <br /><br />
              Actualmente, la Clínica Tataje se posiciona como un referente regional en salud , con una visión orientada al crecimiento sostenible, la ampliación de especialidades y la mejora constante de sus instalaciones. Su compromiso sigue firme: ofrecer atención médica integral, humana y moderna que responda a las necesidades reales de cada paciente y contribuya al bienestar de la sociedad.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://i.pinimg.com/736x/44/fb/e3/44fbe310770447c7e7f39ad6e55aa22b.jpg"
              alt="Historia de la Clínica"
              className="img-fluid rounded shadow-lg mb-3"
              style={{ height: '300px', objectFit: 'cover', width: '100%' }}
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQViqSzuBFpZoeOMjGdHi67tbCSAVs4DGo5Pg&s"
              alt="Equipo médico"
              className="img-fluid rounded shadow-lg"
              style={{ height: '300px', objectFit: 'cover', width: '100%', marginTop: '30px' }}
            />
          </div>
        </div>
      </div>

      {/* Sección de Misión y Visión */}
      <div className="container position-relative" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <FloatingIcons/>
        <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>Misión y Visión</h2>
        <div className="d-flex justify-content-center">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h4 className="text-dark">Misión</h4>
                <p>
                  Nos comprometemos a ofrecer atención médica de calidad, con un enfoque humano y personalizado. Nuestro equipo de profesionales altamente calificados está preparado para atender las necesidades de cada paciente, asegurando un diagnóstico preciso y un tratamiento efectivo en cada especialidad.
                </p>
              </div>
              <div className="flip-card-back">
                <h4 className="text-dark">Visión</h4>
                <p>
                  Ser reconocidos como la clínica líder en la región, no solo por la excelencia en atención médica, sino también por nuestra capacidad para adaptarnos a las nuevas tendencias en salud, incorporando innovaciones tecnológicas que permitan mejorar la calidad de vida de nuestros pacientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Sección de Estadísticas y Logros */}
      <div className="container-fluid bg-dark text-white" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container position-relative">
          <FloatingIcons />
          <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>Nuestros Logros en Números</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="stat-box bg-white text-dark p-4 rounded shadow">
                <h4>10+</h4>
                <p>Médicos Especialistas</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-box bg-white text-dark p-4 rounded shadow">
                <h4>20K+</h4>
                <p>Pacientes Atendidos</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-box bg-white text-dark p-4 rounded shadow">
                <h4>10+</h4>
                <p>Años de Experiencia</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-box bg-white text-dark p-4 rounded shadow">
                <h4>5</h4>
                <p>Áreas Especializadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Sección de Ubicación */}
      <div className="container py-5 position-relative">
        <FloatingIcons/>
        <h2 className="text-center mb-5" style={{ color: '#ff7f00' }}>Ubícanos en</h2>
        <div className="map-responsive">
          <iframe
            title="Ubicación Clínica Tataje" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15608.05394390258!2d-79.83587424556565!3d-6.772188474097923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8ee310ffef7d3d%3A0x44d19aa4eb6f34b5!2sCl%C3%ADnica%20Tataje!5e0!3m2!1ses-419!2spe!4v1721242335004!5m2!1ses-419!2spe"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SobreNosotros;