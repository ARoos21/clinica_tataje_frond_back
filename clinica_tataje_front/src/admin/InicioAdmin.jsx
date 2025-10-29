import {
  FaClinicMedical,
  FaCalendarAlt,
  FaClipboardList,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaUserMd,
  FaFileMedicalAlt,
  FaChartPie,
} from 'react-icons/fa';

const InicioAdmin = () => {
  return (
    <div style={styles.pageWrapper}>
      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.title}>Bienvenido al Sistema de la Clínica</h1>
          <p style={styles.subtitle}>
            Accede rápidamente a las principales funciones del sistema
          </p>
        </header>

        {/* Tarjetas funcionales */}
        <section style={styles.cardsContainer}>
          <Card
            icon={<FaClinicMedical style={styles.icon} />}
            title="Gestión de Pacientes"
            text="Visualiza, edita y organiza los datos personales y médicos de tus pacientes. Lleva un historial detallado y actualizado."
            link="/admin/pacientes"
          />
          <Card
            icon={<FaCalendarAlt style={styles.icon} />}
            title="Gestión de Citas"
            text="Agenda, reprograma o cancela citas médicas con facilidad. Mantén organizada la agenda del personal médico."
            link="/admin/citas"
          />
          <Card
            icon={<FaClipboardList style={styles.icon} />}
            title="Reserva de Citas"
            text="Revisa y aprueba las citas médicas solicitadas en línea por los pacientes a través del portal web."
            link="/admin/citas"
          />
        </section>

        {/* Actividades recientes */}
        <section style={styles.extraSection}>
          <h2 style={styles.sectionTitle}>Actividades Recientes</h2>
          <ul style={styles.activityList}>
            <li>✔ Se registró un nuevo paciente: <strong>Juan Pérez</strong></li>
            <li>✔ La Dra. Ana Torres atendió 5 citas hoy.</li>
            <li>✔ Se actualizó el historial médico de <strong>María Gómez</strong>.</li>
          </ul>
        </section>

        {/* Estadísticas */}
        <section style={styles.extraSection}>
          <h2 style={styles.sectionTitle}>Estadísticas del Sistema</h2>
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <FaUserMd style={styles.statIcon} />
              <p style={styles.statNumber}>12</p>
              <p>Médicos activos</p>
            </div>
            <div style={styles.statCard}>
              <FaFileMedicalAlt style={styles.statIcon} />
              <p style={styles.statNumber}>1,350</p>
              <p>Pacientes registrados</p>
            </div>
            <div style={styles.statCard}>
              <FaChartPie style={styles.statIcon} />
              <p style={styles.statNumber}>93%</p>
              <p>Citas completadas</p>
            </div>
          </div>
        </section>

        {/* Noticias */}
        <section style={styles.extraSection}>
          <h2 style={styles.sectionTitle}>Noticias y Comunicados</h2>
          <div style={styles.newsContainer}>
            <div style={styles.newsItem}>
              <h4 style={styles.newsTitle}>Nuevo horario de atención desde agosto</h4>
              <p style={styles.newsText}>
                A partir del 5 de agosto, el horario de atención será de lunes a sábado de 8:00 a.m. a 8:00 p.m.
              </p>
            </div>
            <div style={styles.newsItem}>
              <h4 style={styles.newsTitle}>Capacitación sobre emergencias</h4>
              <p style={styles.newsText}>
                El 20 de julio se realizará una capacitación obligatoria para todo el personal sobre manejo de emergencias.
              </p>
            </div>
          </div>
        </section>

        {/* Eventos próximos */}
        <section style={styles.extraSection}>
          <h2 style={styles.sectionTitle}>Eventos Próximos</h2>
          <ul style={styles.eventList}>
            <li><strong>22 de julio:</strong> Reunión de médicos generales - 3:00 p.m.</li>
            <li><strong>24 de julio:</strong> Auditoría interna del sistema</li>
            <li><strong>30 de julio:</strong> Jornada de salud gratuita en la plaza central</li>
          </ul>
        </section>

        {/* Enlaces rápidos */}
        <section style={styles.extraSection}>
          <h2 style={styles.sectionTitle}>Enlaces Rápidos</h2>
          <div style={styles.quickLinks}>
            <a href="/admin/pacientes" style={styles.quickLink}>📋 Ver pacientes</a>
            <a href="/admin/citas" style={styles.quickLink}>📅 Ver citas</a>
            <a href="/admin/reportes" style={styles.quickLink}>📈 Reportes</a>
            <a href="/admin/configuracion" style={styles.quickLink}>⚙️ Configuración</a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Sobre Clínica Tataje</h4>
            <p>Ofrecemos atención médica profesional y accesible para ti y tu familia.</p>
            <p>&copy; 2025 Clínica Tataje. Todos los derechos reservados.</p>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Contacto</h4>
            <p>Av Conde de Nieva 355, Ica</p>
            <p>Teléfono: (+51) 953 362 254</p>
            <p>Email: contacto@clinicatataje.com</p>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Síguenos</h4>
            <div style={styles.socialIcons}>
              <a href="https://www.facebook.com/profile.php?id=61553965242463" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/clinicatataje/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/clinicatataje" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ icon, title, text, link }) => (
  <div style={styles.card}>
    <div style={styles.cardIcon}>{icon}</div>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardText}>{text}</p>
    {link && <a href={link} style={styles.cardButton}>Ver más</a>}
  </div>
);

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e9f1f7, #f6fbff)',
  },
  mainContent: {
    flex: 1,
    padding: '3rem 2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.8rem',
    color: '#1e3144',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#444',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '3rem',
    color: '#1e3144',
    marginBottom: '1rem',
  },
  cardIcon: {
    fontSize: '3rem',
    color: '#1e3144',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1e3144',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#555',
  },
  cardButton: {
    marginTop: '1rem',
    display: 'inline-block',
    backgroundColor: '#f68b1e',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  extraSection: {
    marginTop: '3rem',
    padding: '1rem 2rem',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#1e3144',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  activityList: {
    listStyleType: 'none',
    paddingLeft: 0,
    fontSize: '1rem',
    color: '#444',
    lineHeight: '1.8',
    maxWidth: '600px',
    margin: '0 auto',
  },
  statsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '220px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  statIcon: {
    fontSize: '2.5rem',
    color: '#1e3144',
    marginBottom: '0.5rem',
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e3144',
  },
  newsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  newsItem: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  newsTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e3144',
    marginBottom: '0.5rem',
  },
  newsText: {
    fontSize: '1rem',
    color: '#555',
  },
  eventList: {
    listStyleType: 'square',
    fontSize: '1rem',
    color: '#444',
    paddingLeft: '1.5rem',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  quickLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
  quickLink: {
    backgroundColor: '#1e3144',
    color: '#fff',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  footerColumn: {
    flex: '1',
    minWidth: '250px',
  },
  footerHeading: {
    color: '#7d7d83ff',
    marginBottom: '1rem',
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
    fontSize: '1.5rem',
    color: '#00ffaaff',
  },
};

export default InicioAdmin;
