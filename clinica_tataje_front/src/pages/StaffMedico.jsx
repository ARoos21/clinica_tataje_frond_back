import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/StaffMedico.css'

function StaffMedico() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Sección de Introducción */}
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: '#ff7f00' }}>Conoce a nuestros especialistas</h2>
        <p className="text-center mb-4" style={{ fontSize: '18px', color: '#555' }}>
          En Clínica Tataje contamos con un equipo médico altamente calificado para brindarte la mejor atención. Conoce a nuestros especialistas y los servicios que ofrecemos para tu salud.
        </p>
        <div className="row g-4">
          {[ 
            { name: "Dr. Ana María Pérez", specialty: "Cardiología", description: "Especialista en enfermedades del corazón, con más de 15 años de experiencia.", img: "https://media.istockphoto.com/id/479378798/es/foto/retrato-de-mujer-m%C3%A9dico.jpg?s=612x612&w=0&k=20&c=Q-_ggCdXeHOUqTj8CaUseV1MmmyYk8OdV7YbeOoWhD4=" },
            { name: "Dr. Juan García", specialty: "Pediatría", description: "Pediatra con una amplia trayectoria en el cuidado de niños y adolescentes.", img: "https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png" },
            { name: "Dra. Laura Mendoza", specialty: "Dermatología", description: "Experta en tratamientos dermatológicos avanzados y cuidados de la piel.", img: "https://img.freepik.com/foto-gratis/cerrar-doctor-preparandose-trabajo_23-2149152499.jpg?semt=ais_hybrid&w=740" },
            { name: "Dr. Carlos Ruiz", specialty: "Ortopedia", description: "Ortopedista especializado en lesiones musculoesqueléticas y cirugía reconstructiva.", img: "https://i.pinimg.com/736x/2b/67/ea/2b67eab2f47654a38614999133170c4c.jpg" },
          ].map((doctor, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <img src={doctor.img} alt={doctor.name} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: '#ff7f00' }}>{doctor.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{doctor.specialty}</h6>
                  <p className="card-text" style={{ fontSize: '14px', color: '#777' }}>{doctor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default StaffMedico;
