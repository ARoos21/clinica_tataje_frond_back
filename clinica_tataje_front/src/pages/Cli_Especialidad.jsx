import React, { useEffect, useState } from "react";
import { obtenerEspecialidades } from "../services/especialidadesServices";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Cli_Especialidad() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await obtenerEspecialidades();
        setEspecialidades(res.data);
      } catch (err) {
        console.error("Error al obtener especialidades:", err);
      }
    };

    fetchEspecialidades();
  }, []);

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold text-dark">
          Nuestras Especialidades
        </h2>
        <div className="d-flex justify-content-center mb-4">
          <div style={{ width: "60px", height: "4px", backgroundColor: "#ff7f00", borderRadius: "2px" }}></div>
        </div>

        <div className="row g-4">
          {especialidades.map((esp) => (
            <div className="col-lg-4 col-md-6" key={esp.id_especialidad}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${esp.imagen}`}
                  className="card-img-top"
                  alt={esp.nombre}
                  style={{
                    objectFit: "cover",
                    height: "220px",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">{esp.nombre}</h5>
                  <p className="card-text text-muted">{esp.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cli_Especialidad;
