import React, { useState } from 'react';

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
  date?: string;
};

type UserData = {
  name: string;
  email: string;
};

const YourComponent = () => {
  const [pdfData, setPdfData] = useState<PDFData | undefined>(undefined); // Usa undefined en lugar de null
  const [userData, setUserData] = useState<UserData | undefined>(undefined); // Estado para los datos del usuario

  // Función para actualizar los datos del PDF y del usuario
  const updateData = (pdf: PDFData, user: UserData) => {
    setPdfData(pdf);
    setUserData(user);
  };

  // Función que maneja la generación del PDF
  const generatePDF = async () => {
    if (!pdfData || !userData) {
      console.error("Datos incompletos: es necesario tener pdfData y userData.");
      return;
    }

    try {
      // Mostrar los datos del usuario antes de generar el PDF
      console.log(`Generando PDF para el usuario: ${userData.name}, Email: ${userData.email}`);
      
      // Generación del PDF (aquí podrías integrar la librería de PDF que usas)
      const blob = await pdf(<PDFDocument data={pdfData} />).toBlob(); // Reemplazar con tu librería de PDF
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

      {/* Ejemplo de botón para actualizar los datos */}
      <button
        onClick={() =>
          updateData(
            {
              buissnessName: 'Mi Empresa',
              buissnessStreet: 'Calle Ficticia 123',
              buissnessCity: 'Ciudad Ejemplo',
              buissnessPostal: '12345',
              buissnessPhone: '555-1234',
              clientName: 'Cliente Ejemplo',
              clientStreet: 'Calle Cliente 456',
              clientCity: 'Ciudad Cliente',
              clientPostal: '67890',
              date: '2025-05-01'
            },
            { name: 'Juan Pérez', email: 'juan@example.com' }
          )
        }
      >
        Actualizar Datos
      </button>

      {/* Mostrar los datos del usuario */}
      {userData && (
        <div>
          <h3>Datos del Usuario:</h3>
          <p>Nombre: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
