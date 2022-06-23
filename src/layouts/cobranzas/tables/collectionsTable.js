export default function data() {
  return {
    columns: [
      { Header: "Carpeta", accessor: "folder", align: "center" },
      { Header: "Cliente", accessor: "client", align: "center" },
      { Header: "No. Cuota", accessor: "quota", align: "center" },
      { Header: "Fecha de Vencimiento", accessor: "expirationDate", align: "center" },
      { Header: "Días de Mora", accessor: "daysPastDue", align: "center" },
      { Header: "Valor Cuota", accessor: "quotaValue", align: "center" },
      { Header: "Interés", accessor: "interest", align: "center" },
      { Header: "Valor Final", accessor: "finalValue", align: "center" },
      { Header: "Estado", accessor: "state", align: "center" },
    ],
    rows: [
      {
        folder: "009",
        client: "JOSE RAFAEL PERACHIMBA FERNANEZ",
        quota: "23",
        expirationDate: "2022/05/18",
        daysPastDue: "9",
        quotaValue: "112.66",
        interest: "2%",
        finalValue: "150.89",
        state: "Entregado",
      },
    ],
  };
}
