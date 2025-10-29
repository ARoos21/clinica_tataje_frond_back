import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Reservar() {
  return (
    <div style={styles.reservarContainer}>
      <Header />
      <div style={styles.reservarContent}>
        <h3 style={styles.title}>¡Accede a tu cuenta para continuar con la reserva!</h3>
        <p style={styles.message}>Para poder agendar tu cita, es necesario que inicies sesión. Si ya tienes una cuenta, accede a ella ahora. Si no, regístrate rápidamente.</p>
        <Link to="/login-paciente" style={styles.btnLogin}>Iniciar Sesión</Link>
        <p style={styles.registerInfo}>¿No tienes cuenta? <Link to="/registro-paciente" style={styles.linkRegister}>Regístrate aquí</Link></p>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  reservarContainer: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  reservarContent: {
    padding: '50px',
    backgroundColor: '#fff',
    margin: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#ff7f00',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 300,
  },
  btnLogin: {
    backgroundColor: '#ff7f00',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  registerInfo: {
    marginTop: '20px',
  },
  linkRegister: {
    color: '#ff7f00',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Reservar;
