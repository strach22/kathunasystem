import React from "react";
import { Grid } from "@mui/material";
import TableClientsScreen from "./TableClientsScreen";

export default function UploadClientsScreen() {
  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Id", value: "id" },
        { label: "Nombres", value: "nombres" },
        { label: "Apellidos", value: "apellidos" },
        { label: "Cédula de Identidad", value: "cedulaIdentidad" },
        { label: "Número de Teléfono", value: "numeroTelefono" },
        { label: "2do Número de Teléfono", value: "numeroTelefono2" },
        { label: "Email", value: "email" },
        { label: "Tarifa", value: "tarifa" },
        { label: "Estado Civil", value: "estadoCivil" },
        { label: "Fecha de Nacimiento", value: "fechaNacimiento" },
        { label: "Fecha de Creación", value: "fechaCreacion" },
        { label: "Dirección", value: "direccion" },
        { label: "Saldo de Ahorros", value: "saldoAhorros" },
        { label: "Saldo de Crédito", value: "saldoCredito" },
        { label: "Nombres del Conyugue", value: "nombresConyugue" },
        { label: "Apellidos del Conyugue", value: "apellidosConyugue" },
        { label: "CI del Conyugue", value: "cedulaIdentidadConyugue" },
        { label: "Teléfono del Conyugue", value: "telefonoConyugue" },
        { label: "Parentesco", value: "parentesco" },
        { label: "Nombres del Parentesco", value: "nombresParentesco" },
        { label: "Apellidos del Parentesco", value: "apellidosParentesco" },
        { label: "CI del Parentesco", value: "cedulaIdentidadParentesco" },
      ],
      data: [
        {
          id: "0006",
          nombres: "Sebastián Fernando",
          apellidos: "Lovato Encarnación",
          cedulaIdentidad: "1722163233",
          numeroTelefono: "0998848730",
          numeroTelefono2: "NULL",
          email: "sebastian.lovato@notengoempresa.com",
          tarifa: "particular",
          estadoCivil: "Soltero",
          fechaNacimiento: "1994/03/18",
          fechaCreacion: "20/04/2022",
          direccion: "Pusuquí El Jardín y los Luceros",
          nombresConyugue: "NULL",
          apellidosConyugue: "NULL",
          cedulaIdentidadConyugue: "NULL",
          telefonoConyugue: "NULL",
          parentesco: "Hermana",
          nombresParentesco: "Geovanna Gabriela",
          apellidosParentesco: "Lovato Encarnación",
          numeroParentesco: "1722163242",
        },
        {
          id: "0007",
          nombres: "Isaac Andrés",
          apellidos: "Pozo Urgiles",
          cedulaIdentidad: "1234567890",
          numeroTelefono: "0985468137",
          numeroTelefono2: "0987124460",
          email: "isaacandrespozo@notengoempresa.com",
          tarifa: "socio",
          estadoCivil: "Unión Libre",
          fechaNacimiento: "1995/04/01",
          fechaCreacion: "06/09/2021",
          direccion: "Sector Orellana",
          nombresConyugue: "La Tóxica",
          apellidosConyugue: "NULL",
          cedulaIdentidadConyugue: "5456781254",
          telefonoConyugue: "0985211462",
          parentesco: "Amigo",
          nombresParentesco: "Martín",
          apellidosParentesco: "Alarcón",
          numeroParentesco: "1234567890",
        },
      ],
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableClientsScreen worksheets={worksheets} />
      </Grid>
    </Grid>
  );
}
