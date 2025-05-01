import React, { useState } from 'react';

// Aquí puedes definir el tipo de datos de tu PDF
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

const MyComponent = () => {
  // Inicializamos el estado permitiendo que pdfData sea null
  const [pdfData, setPdfData] = useState<PDFData | null>(null);

  // Función que genera el PDF
  const generatePDF = async () => {
    // Verificación para asegurarse de que pdfData no sea null
    if (!pdfData) {
      console.error("Error: Los datos del PDF no están completos.");
      return;
    }

    try {
      // Aquí, pdfData es seguro para usar
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

// Asegúrate de tener tu componente PDFDocument correctamente definido
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
