export default function data() {
  return {
    columns: [
      { Header: "cuotas", accessor: "cuota", align: "left" },
      { Header: "interes periodo", accessor: "interesPeriodo", align: "left" },
      { Header: "capital amortizado", accessor: "capitalAmortizado", align: "left" },
      { Header: "desrgavamen", accessor: "desgravamen", align: "left" },
      { Header: "valor cuota", accessor: "valorCuota", align: "center" },
      { Header: "saldo", accessor: "saldo", align: "center" },
    ],

    rows: [
      {
        cuota: "1",
        interesPeriodo: "45.00",
        capitalAmortizado: "63.46",
        desgravamen: "0.83",
        valorCuota: "109.29",
        saldo: "2936.54",
      },
    ],
  };
}
