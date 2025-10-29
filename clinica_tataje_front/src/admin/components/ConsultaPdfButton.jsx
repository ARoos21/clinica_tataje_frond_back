import React from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Button } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';

// logo en base64
const logoBase64 = "../../../public/images/logo.jpg";

function ConsultaPdfButton({ consulta, paciente }) {
  const generarPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margen = 15;
    let y = margen;

    const colorPrincipal = '#003366';

    // Encabezado con logo y datos
    doc.addImage(logoBase64, 'JPEG', margen, y, 30, 30);
    doc.setFontSize(18);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text("CLÍNICA TATAJE", pageWidth / 2, y + 10, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000');
    doc.text("Av. Conde de Nieva 355, Ica - Perú", pageWidth / 2, y + 18, { align: 'center' });
    doc.text("Tel: +51 994 257 416   |   Email: contacto@clinicatataje.pe", pageWidth / 2, y + 24, { align: 'center' });

    y += 35;

    doc.setLineWidth(0.5);
    doc.setDrawColor(colorPrincipal);
    doc.line(margen, y, pageWidth - margen, y);
    y += 5;

    // Fecha de emisión
    const now = new Date();
    const fechaEmision = now.toLocaleDateString('es-PE');
    const horaEmision = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(10);
    doc.setTextColor('#555');
    doc.text(`Emitido: ${fechaEmision} ${horaEmision}`, pageWidth - margen, y, { align: 'right' });
    y += 7;

    // DATOS DEL PACIENTE
    doc.setFontSize(12);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text("Datos del Paciente", margen, y);
    y += 6;

    doc.setLineWidth(0.2);
    doc.setDrawColor('#aaa');
    doc.line(margen, y, pageWidth - margen, y);
    y += 5;

    doc.setFontSize(11);
    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');

    const datosPaciente = [
      `Nombre: ${paciente.nombres} ${paciente.apellido_paterno} ${paciente.apellido_materno}`,
      `DNI: ${paciente.dni}`,
      `Fecha de nacimiento: ${paciente.fecha_nacimiento}`,
      `Género: ${paciente.genero}`,
      `Ubigeo: ${paciente.ubigeo}`,
      `Teléfono: ${paciente.telefono || 'No registrado'}`
    ];
    datosPaciente.forEach(dato => {
      doc.text(dato, margen, y);
      y += 6;
    });

    y += 3;

    // CONSULTA
    doc.setFontSize(12);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text("Detalle de la Consulta", margen, y);
    y += 6;

    doc.setDrawColor('#aaa');
    doc.line(margen, y, pageWidth - margen, y);
    y += 5;

    doc.setFontSize(11);
    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');

    const datosConsulta = [
      `Consulta N°: ${consulta.id_consulta}`,
      `Fecha: ${consulta.cita.fecha}    Hora: ${consulta.cita.hora}`,
      consulta.cita.motivo ? `Motivo de consulta: ${consulta.cita.motivo}` : null,
      consulta.diagnostico ? `Diagnóstico: ${consulta.diagnostico}` : null,
      consulta.tratamiento ? `Tratamiento: ${consulta.tratamiento}` : null,
      consulta.receta ? `Receta: ${consulta.receta}` : null,
      consulta.recomendaciones ? `Recomendaciones: ${consulta.recomendaciones}` : null,
    ].filter(Boolean);

    datosConsulta.forEach(linea => {
      const wrappedText = doc.splitTextToSize(linea, pageWidth - 2 * margen);
      doc.text(wrappedText, margen, y);
      y += wrappedText.length * 6;
    });

    if (consulta.observaciones) {
      const obsText = `Observaciones: ${consulta.observaciones}`;
      const obsLines = doc.splitTextToSize(obsText, pageWidth - 2 * margen);
      doc.text(obsLines, margen, y);
      y += obsLines.length * 6;
    }

    y += 3;

    // MÉDICO
    doc.setFontSize(12);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text("Médico Tratante", margen, y);
    y += 6;

    doc.setDrawColor('#aaa');
    doc.line(margen, y, pageWidth - margen, y);
    y += 5;

    doc.setFontSize(11);
    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');
    doc.text(`Médico: ${consulta.cita.medico.nombres} ${consulta.cita.medico.apellido_paterno}`, margen, y);
    y += 6;
    doc.text(`Especialidad: ${consulta.cita.medico.especialidad}`, margen, y);
    y += 10;

    // QR code
    const qrData = `Consulta #${consulta.id_consulta} - ${paciente.nombres} ${paciente.apellido_paterno}`;
    const qrImageUrl = await QRCode.toDataURL(qrData);

    doc.addImage(qrImageUrl, 'PNG', pageWidth - margen - 35, y, 35, 35);
    y += 45;

    // Firma
    doc.line(margen, y, margen + 60, y);
    doc.setFontSize(10);
    doc.text("Firma y Sello del Médico", margen, y + 5);

    // Guardar
    const nombreArchivo = `${paciente.nombres}_${paciente.apellido_paterno}_Consulta_${consulta.id_consulta}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <Button variant="outline-danger" size="sm" onClick={generarPDF}>
      <FaFilePdf className="me-1" />
      Generar PDF
    </Button>
  );
}

export default ConsultaPdfButton;
