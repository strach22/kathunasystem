export default function data({ loanValue, periods, interes }) {
  const n = "1";
  const periodicFee = loanValue * (interes / (1 - (interes + 1) ** -periods));
  const desgravamen = +(0.01 * loanValue) / periods;
  const periodicFeeDesgravamen = periodicFee + desgravamen;
  const periodInteres = loanValue * interes;
  const rows = loanValue
    ? [
        {
          cuota: n,
          interesPeriodo: periodInteres.toFixed(2),
          capitalAmortizado: "63.46",
          desgravamen: desgravamen.toFixed(2),
          valorCuota: periodicFeeDesgravamen.toFixed(2),
          saldo: "2936.54",
        },
      ]
    : [];
  return {
    columns: [
      { Header: "cuotas", accessor: "cuota", align: "left" },
      { Header: "interes periodo", accessor: "interesPeriodo", align: "left" },
      { Header: "capital amortizado", accessor: "capitalAmortizado", align: "left" },
      { Header: "desrgavamen", accessor: "desgravamen", align: "left" },
      { Header: "valor cuota", accessor: "valorCuota", align: "center" },
      { Header: "saldo", accessor: "saldo", align: "center" },
    ],

    rows,
  };
}
