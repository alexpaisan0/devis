"use client";

import React from "react";
import { PDFDownloadLink, pdf, PDFViewer, Page, Text, View, Document, StyleSheet, Image as PDFImage } from "@react-pdf/renderer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Logo from "@/public/logo.png";  // Este es el cambio que se hace, ya no lo usamos directamente en el PDF
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Esquema de validación
const formSchema = z.object({
  businessName: z.string().nonempty(),  // Cambié buissnessName a businessName
  businessStreet: z.string().nonempty(), // Cambié buissnessStreet a businessStreet
  businessCity: z.string().nonempty(),  // Cambié buissnessCity a businessCity
  businessPostal: z.string().nonempty(),  // Cambié buissnessPostal a businessPostal
  businessPhone: z.string().nonempty(), // Cambié buissnessPhone a businessPhone

  clientName: z.string().nonempty(),
  clientStreet: z.string().nonempty(),
  clientCity: z.string().nonempty(),
  clientPostal: z.string().nonempty(),
  clientPhone: z.string().nonempty(),

  description: z.string().nonempty(),
  job: z.string().nonempty(),
  price: z.string().nonempty(),

  note: z.string().optional(),
  conditions: z.string().optional(),
  signature: z.string().optional(),
  date: z.string().optional(),
});

// Estilos del PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

// Componente PDF
function PDFDocument({ data }: { data: z.infer<typeof formSchema> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Si necesitas mostrar el logo, puedes convertirlo en base64 */}
        <PDFImage src={Logo.src} style={{ width: 100 }} />
        <Text style={styles.title}>DEVIS</Text>

        <View style={styles.row}>
          <View style={{ width: "45%" }}>
            <Text style={styles.bold}>contractant:</Text>
            <Text>{data.businessName}</Text>
            <Text>{`${data.businessStreet}, ${data.businessCity} (${data.businessPostal})`}</Text>
            <Text>{`Téléphone: ${data.businessPhone}`}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.bold}>Client:</Text>
            <Text>{data.clientName}</Text>
            <Text>{`${data.clientStreet}, ${data.clientCity} (${data.clientPostal})`}</Text>
            <Text>{`Téléphone: ${data.clientPhone}`}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Description du travail:</Text>
          <Text>{data.job}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Détails:</Text>
          <Text>{data.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Total à payer:</Text>
          <Text>{data.price} €</Text>
        </View>

        {data.note && (
          <View style={styles.section}>
            <Text style={styles.bold}>Note:</Text>
            <Text>{data.note}</Text>
          </View>
        )}

        {data.conditions && (
          <View style={styles.section}>
            <Text style={styles.bold}>Conditions:</Text>
            <Text>{data.conditions}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.bold}>Date:</Text>
          <Text>{data.date || "_________"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>Signature:</Text>
          <Text>{data.signature || "_________"}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessCity: "",
      businessName: "",
      businessPhone: "",
      businessPostal: "",
      businessStreet: "",
      clientCity: "",
      clientName: "",
      clientPhone: "",
      clientPostal: "",
      clientStreet: "",
      description: "",
      job: "",
      price: "",
      note: "",
      conditions: "",
      signature: "",
      date: "",
    },
  });

  const [pdfData, setPdfData] = React.useState<z.infer<typeof formSchema> | null>(null);

  const handleGenerate = async (values: z.infer<typeof formSchema>) => {
    const blob = await pdf(<PDFDocument data={values} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
    setPdfData(values);
  };

  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] bg-gray-100 items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div>
          <h1 className="text-6xl font-bold text-center ">DEVIS</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerate)}>
            {/* Formulario aquí */}
          </form>
        </Form>
      </div>
    </div>
  );
}
