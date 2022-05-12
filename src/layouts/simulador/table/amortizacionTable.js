export default function data({ loanValue, periods, interes }) {
  const periodicFee = loanValue * (interes / (1 - (interes + 1) ** -periods));
  const desgravamen = +(0.01 * loanValue) / periods;
  const periodicFeeDesgravamen = periodicFee + desgravamen;
  let periodInteres = loanValue * interes;
  let amortizedCapital = periodicFee - periodInteres;
  let residue = loanValue - amortizedCapital;
  const rows = [];
  for (let i = 1; i < periods + 1; i += 1) {
    rows.push({
      cuota: i,
      interesPeriodo: periodInteres.toFixed(2),
      capitalAmortizado: amortizedCapital.toFixed(2),
      desgravamen: desgravamen.toFixed(2),
      valorCuota: periodicFeeDesgravamen.toFixed(2),
      saldo: residue.toFixed(2),
    });
    periodInteres = residue * interes;
    amortizedCapital = periodicFee - periodInteres;
    residue -= amortizedCapital;
  }
  return {
    columns: [
      { Header: "cuotas", accessor: "cuota", align: "center" },
      { Header: "interes periodo", accessor: "interesPeriodo", align: "center" },
      { Header: "capital amortizado", accessor: "capitalAmortizado", align: "center" },
      { Header: "desrgavamen", accessor: "desgravamen", align: "center" },
      { Header: "valor cuota", accessor: "valorCuota", align: "center" },
      { Header: "saldo", accessor: "saldo", align: "center" },
    ],

    rows,
  };
}
