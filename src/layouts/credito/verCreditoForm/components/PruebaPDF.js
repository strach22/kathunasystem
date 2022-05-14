import React from "react";
import { Document, Page } from "react-pdf";

export default function PruebaPDF() {
  //   const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  return (
    <Document>
      <Page size="A4">
        <p>Primera línea de Prueba</p>
      </Page>
    </Document>
  );
}
