import React, { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import MDButton from "components/MDButton";
// import ExcelExport from "./ExcelExport";
import ExcelImport from "./ExcelImport";

const useStyles = makeStyles({
  root: {
    "& .excel-import-container": {
      padding: "25px",
      boxShadow: "0 0 20px rgba(66, 50, 98, 0.35)",
      border: "1px solid #eaeaea",
      borderRadius: "10px",
    },
    "& .file-upload": {
      display: "grid",
      gridGap: "10px",
    },
    "& .MuiTypography-root": {
      color: "black",
    },
    "& #excel-upload": {
      width: "100%",
      height: "25px",
      border: "1px solid #cdcdcd",
      borderRadius: "4px",
      fontFamily: "arial, sans-serif",
      fontSize: "75%",
    },
    "& .excel-table": {
      width: "100%",
      fontSize: "75%",
    },
    "& .excel-table tr:first-of-type": {
      display: "none",
    },
    "& .excel-table tr": {
      backgroundColor: "#c6e6f5",
    },
    "& .excel-table td": {
      padding: "5px 10px",
    },
    "& .excel-table tr:nth-of-type(2)": {
      backgroundColor: "#3d5662 !important",
      color: "#fff",
    },
    "& .excel-table td:nth-of-type(1)": {
      display: "none",
    },
    "& .excel-table tr:nth-of-type(even)": {
      backgroundColor: "#e6fbff",
    },
    "& .excel-table-import": {
      margin: "15px 0px",
      maxHeight: "300px",
      overflowY: "scroll",
    },
  },
});

export default function UploadClientsScreen() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleUpload = () => {
    console.log(data);
  };

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
          fechaNacimiento: "18/03/1994",
          fechaCreacion: "20/04/2022",
          direccion: "Pusuquí El Jardín y los Luceros",
          saldoAhorros: "201",
          saldoCredito: "500",
          nombresConyugue: "NULL",
          apellidosConyugue: "NULL",
          cedulaIdentidadConyugue: "NULL",
          telefonoConyugue: "NULL",
          parentesco: "Hermana",
          nombresParentesco: "Geovanna Gabriela",
          apellidosParentesco: "Lovato Encarnación",
          cedulaIdentidadParentesco: "1722163242",
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
          fechaNacimiento: "01/04/1995",
          fechaCreacion: "06/09/2021",
          direccion: "Sector Orellana",
          saldoAhorros: "149",
          saldoCredito: "547",
          nombresConyugue: "La Tóxica",
          apellidosConyugue: "NULL",
          cedulaIdentidadConyugue: "5456781254",
          telefonoConyugue: "0985211462",
          parentesco: "Amigo",
          nombresParentesco: "Martín",
          apellidosParentesco: "Alarcón",
          cedulaIdentidadParentesco: "1234567890",
        },
      ],
    },
  ];

  return (
    <Grid container className={classes.root}>
      {/* <Grid item xs={4}>
        <ExcelExport filename="Lista-de-clientes.xlsx" worksheets={worksheets} />
      </Grid>
      <Grid item xs={4}>
        <MDButton onClick={handleUpload}>Cargar Clientes</MDButton>
      </Grid> */}
      <Grid item xs={12}>
        <ExcelImport setData={setData} worksheets={worksheets} onClick={handleUpload} />
      </Grid>
    </Grid>
  );
}
