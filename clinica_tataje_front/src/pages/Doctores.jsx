import React, { useEffect, useState } from "react";
import { obtenerMedicos } from "../services/medicoService";

function Doctores() {
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const res = await obtenerMedicos();
        setDoctores(res.data.data);
      } catch (err) {
        console.error("Error al obtener doctores:", err);
      }
    };

    fetchDoctores();
  }, []);

  const getImageByGenero = (genero) => {
    if (!genero) return "/images/medico-hombre.jpeg";
    return genero.toLowerCase() === "femenino"
      ? "/images/medico-mujer.png"
      : "/images/medico-hombre.jpeg";
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-5">👩‍⚕️ Nuestros Doctores 👨‍⚕️</h2>

      <div className="row g-4">
        {doctores.map((doc) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn"
            key={doc.id_medico}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={getImageByGenero(doc.personal_clinico.genero)}
                className="card-img-top img-fluid rounded-top"
                alt="Doctor"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">
                  {`${doc.personal_clinico.nombres} ${doc.personal_clinico.apellido_paterno} ${doc.personal_clinico.apellido_materno}`}
                </h5>
                <p className="card-text mb-1">
                  <strong>Especialidad:</strong> {doc.especialidad.nombre}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {doc.personal_clinico.email}
                </p>
                <div>
                  <span
                    className={`badge rounded-pill ${
                      doc.personal_clinico.genero?.toLowerCase() === "femenino"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    <i
                      className={`bi ${
                        doc.personal_clinico.genero?.toLowerCase() === "femenino"
                          ? "bi-gender-female"
                          : "bi-gender-male"
                      }`}
                    ></i>{" "}
                    {doc.personal_clinico.genero}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {doctores.length === 0 && (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctores;
