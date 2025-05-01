'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { z } from 'zod';

// Definición del esquema
const formSchema = z.object({
  buissnessName: z.string().min(1, "Business name is required"),
  buissnessStreet: z.string().min(1, "Street is required"),
  buissnessCity: z.string().min(1, "City is required"),
  buissnessPostal: z.string().min(1, "Postal code is required"),
  buissnessPhone: z.string().min(1, "Phone number is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientStreet: z.string().min(1, "Client street is required"),
  clientCity: z.string().min(1, "Client city is required"),
  clientPostal: z.string().min(1, "Client postal code is required"),
  description: z.string().min(1, "Description is required"),
  job: z.string().min(1, "Job title is required"),
  price: z.string().min(1, "Price is required"),
  note: z.string().optional(),
  conditions: z.string().optional(),
  signature: z.string().optional(),
  date: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const PDFDocument = ({ data }: { data: FormData }) => {
  // Aquí va la lógica para renderizar el PDF con los datos proporcionados
  return (
    <div>
      {/* El contenido del PDF debe usar `data` */}
      <h1>{data.buissnessName}</h1>
      {/* Resto del contenido basado en los datos */}
    </div>
  );
};

const App = () => {
  const [pdfData, setPdfData] = useState<FormData>({
    buissnessName: '',
    buissnessStreet: '',
    buissnessCity: '',
    buissnessPostal: '',
    buissnessPhone: '',
    clientName: '',
    clientStreet: '',
    clientCity: '',
    clientPostal: '',
    description: '',
    job: '',
    price: '',
    note: '',
    conditions: '',
    signature: '',
    date: '',
  });

  const handleGenerate = async () => {
    // Validar que pdfData no sea null ni undefined
    if (pdfData) {
      const blob = await pdf(<PDFDocument data={pdfData} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } else {
      console.error('No data available for PDF generation');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar que los datos sean correctos según el esquema de zod
    const result = formSchema.safeParse(pdfData);
    if (result.success) {
      handleGenerate();
    } else {
      // Aquí puedes manejar los errores de validación
      console.error(result.error.format());
    }
  };

  return (
    <div>
      <h1>Formulario para Generar PDF</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí tus campos de formulario */}
        <input
          type="text"
          placeholder="Business Name"
          value={pdfData.buissnessName}
          onChange={(e) => setPdfData({ ...pdfData, buissnessName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Business Street"
          value={pdfData.buissnessStreet}
          onChange={(e) => setPdfData({ ...pdfData, buissnessStreet: e.target.value })}
        />
        {/* Continúa con los demás campos de formulario */}
        
        <button type="submit">Generar PDF</button>
      </form>
    </div>
  );
};

export default App;
