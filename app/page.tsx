import React, { useState } from 'react';

// Tipo de datos para el PDF (sin nulls)
type PDFData = {
  buissnessName: string;
  buissnessStreet: string;
  buissnessCity: string;
  buissnessPostal: string;
  buissnessPhone: string;
  clientName: string;
  clientStreet: string;
  clientCity: string;
  clientPostal: string;
  clientPhone: string;
  clientEmail: string;
  date?: string;
};

// Valor predeterminado sin valores null
const defaultPDFData: PDFData = {
  buissnessName: 'Empresa Ejemplo',
  buissnessStreet: 'Calle Ficticia 123',
  buissnessCity: 'Ciudad Ejemplo',
  buissnessPostal: '12345',
  buissnessPhone: '123-456-7890',
  clientName: 'Cliente Ejemplo',
  clientStreet: 'Avenida Ficticia 456',
  clientCity: 'Ciudad Ejemplo',
  clientPostal: '67890',
  clientPhone: '098-765-4321',
  clientEmail: 'cliente@ejemplo.com',
  date: '2025-05-01',
};

const MyComponent = () => {
  // Aquí estamos inicializando con datos predeterminados
  const [pdfData, setPdfData] = useState<PDFData>(defaultPDFData);

  // Función para generar el PDF
  const generatePDF = async () => {
    try {
      const blob = await pdf(<PDFDocument data={pdfData} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generando el PDF:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-full"
        onClick={generatePDF}
      >
        Generar PDF
      </button>
    </div>
  );
};

// Componente PDFDocument
const PDFDocument: React.FC<{ data: PDFData }> = ({ data }) => {
  return (
    <div>
      <h1>{data.buissnessName}</h1>
      <p>{data.buissnessStreet}, {data.buissnessCity} {data.buissnessPostal}</p>
      <p>{data.buissnessPhone}</p>
      <h2>Cliente: {data.clientName}</h2>
      <p>{data.clientStreet}, {data.clientCity} {data.clientPostal}</p>
      <p>{data.clientPhone}</p>
      <p>{data.clientEmail}</p>
      {data.date && <p>Fecha: {data.date}</p>}
    </div>
  );
};

export default MyComponent;
