import React, { useState } from "react";
import ExcelExport from "./ExcelExport";
import ExcelImport from "./ExcelImport";

export default function UploadClientsScreen() {
  const [data, setData] = useState([]);

  // eslint-disable-next-line no-console
  console.log(data);

  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Code", value: "code" },
        { label: "Fecha_Apertura", value: "fechaApertura" },
        { label: "Estado_Civil", value: "estadoCivil" },
        { label: "Nombres", value: "nombres" },
        { label: "Apellidos", value: "apellidos" },
        { label: "Número_Cédula", value: "numeroCedula" },
        { label: "Dirección", value: "direccion" },
        { label: "Parentesco", value: "parentesco" },
        { label: "Nombre_Parentesco", value: "nombreParentesco" },
        { label: "Cédula_Parentesco", value: "cedulaParentesco" },
        { label: "Teléfono_Parentesco", value: "telefonoParentesco" },
        { label: "Nombre_Conyugue", value: "nombreConyugue" },
        { label: "Cédula_Conyugue", value: "cedulaConyugue" },
        { label: "Teléfono_Conyugue", value: "telefonoConyugue" },
        { label: "Teléfono", value: "telefono" },
        { label: "Tarifa", value: "tarifa" },
      ],
      data: [
        {
          code: "0006",
          fechaApertura: "2020-01-17",
          estadoCivil: "NULL",
          nombres: "NORAYMA KATERINE",
          apellidos: "CUASCOTA GUASGUA",
          numeroCedula: "1724530876",
          direccion: "san pablito de agualongo",
          parentesco: "MADRE",
          nombreParentesco: "MARIA RUFINA GUASGUA",
          cedulaParentesco: "1711709962",
          telefonoParentesco: "NULL",
          nombreConyugue: "NULL",
          cedulaConyugue: "NULL",
          telefonoConyugue: "NULL",
          telefono: "987901520",
          tarifa: "SOCIO",
        },
        {
          code: "0007",
          fechaApertura: "2020-01-17",
          estadoCivil: "NULL",
          nombres: "NORAYMA KATERINE",
          apellidos: "CUASCOTA GUASGUA",
          numeroCedula: "1724530876",
          direccion: "san pablito de agualongo",
          parentesco: "MADRE",
          nombreParentesco: "MARIA RUFINA GUASGUA",
          cedulaParentesco: "1711709962",
          telefonoParentesco: "NULL",
          nombreConyugue: "NULL",
          cedulaConyugue: "NULL",
          telefonoConyugue: "NULL",
          telefono: "987901520",
          tarifa: "SOCIO",
        },
      ],
    },
  ];

  return (
    <div>
      <ExcelExport filename="lista-de-clientes.xlsx" worksheets={worksheets} />
      <ExcelImport uploadHandler={setData} />
    </div>
  );
}
