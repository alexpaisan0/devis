import React, { useState } from 'react';

// Tipo de datos para el PDF
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

// Valor por defecto en caso de que no haya datos
const defaultPDFData: PDFData = {
  buissnessName: '',
  buissnessStreet: '',
  buissnessCity: '',
  buissnessPostal: '',
  buissnessPhone: '',
  clientName: '',
  clientStreet: '',
  clientCity: '',
  clientPostal: '',
  clientPhone: '',
  clientEmail: '',
  date: ''
};

const MyComponent = () => {
  // Asegúrate de que pdfData siempre tenga un valor válido
  const [pdfData, setPdfData] = useState<PDFData>(defaultPDFData);

  // Función para generar el PDF
  const generatePDF = async () => {
    try {
      // Pasa pdfData al componente PDFDocument
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
