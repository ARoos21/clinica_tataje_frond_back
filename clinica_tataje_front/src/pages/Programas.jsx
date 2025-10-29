import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Programas() {
  return (
    <div style={styles.pageContainer}>
      <Header />
      
      {/* Contenido Principal */}
      <div style={styles.contentContainer}>
        <h2 style={styles.title}>Nuestros Programas de Prevención</h2>
        <p style={styles.subtitle}>Promovemos la salud y bienestar a largo plazo con programas especializados para cuidar de ti y los tuyos.</p>

        <div style={styles.programList}>
          {/* Programa 1 */}
          <div style={styles.programCard}>
            <i className="bi bi-heart-fill" style={styles.icon}></i>
            <h5 style={styles.programTitle}>Prevención de Enfermedades Crónicas</h5>
            <p style={styles.programDescription}>Chequeos regulares y monitoreo para prevenir enfermedades como diabetes, hipertensión y más. Mantén tu salud bajo control a través de evaluaciones periódicas y un seguimiento personalizado por parte de nuestros especialistas.</p>
          </div>

          {/* Programa 2 */}
          <div style={styles.programCard}>
            <i className="bi bi-person-fill" style={styles.icon}></i>
            <h5 style={styles.programTitle}>Control y Manejo de Peso</h5>
            <p style={styles.programDescription}>Programas de asesoría nutricional y control de peso para evitar problemas como la obesidad. Incluye seguimiento personalizado, planes de alimentación balanceados y rutinas de ejercicio adaptadas a tus necesidades.</p>
          </div>

          {/* Programa 3 */}
          <div style={styles.programCard}>
            <i className="bi bi-heart-pulse" style={styles.icon}></i>
            <h5 style={styles.programTitle}>Prevención en Salud Mental</h5>
            <p style={styles.programDescription}>Asesoría psicológica y programas de bienestar emocional para reducir estrés y ansiedad. Nuestros programas incluyen terapia individual y grupal, y herramientas prácticas para mejorar tu bienestar mental y emocional a largo plazo.</p>
          </div>

          {/* Programa 4 */}
          <div style={styles.programCard}>
            <i className="bi bi-shield-lock" style={styles.icon}></i>
            <h5 style={styles.programTitle}>Programa de Vacunación</h5>
            <p style={styles.programDescription}>Mantén al día tu esquema de vacunación y protege tu salud y la de tu comunidad. Ofrecemos vacunas para adultos y niños, incluyendo las más importantes para prevenir enfermedades contagiosas.</p>
          </div>

            
        </div>

        {/* Botón de contacto general */}
        <Link to="/contacto" style={styles.contactButton}>Contáctanos</Link>
      </div>
      
      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    padding: '50px',
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ff7f00',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '40px',
    fontWeight: '300',
  },
  programList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    marginTop: '30px',
  },
  programCard: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '3rem',
    color: '#ff7f00',
    marginBottom: '20px',
  },
  programTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  programDescription: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
    fontWeight: '300',
  },
  programButton: {
    backgroundColor: '#ff7f00',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1rem',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  contactButton: {
    backgroundColor: '#ff7f00',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1.2rem',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '30px',
    display: 'inline-block',
    transition: 'background-color 0.3s',
  },
};

export default Programas;
