import { useContext } from "react";

// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";
import IndividualProofPayment from "../download/IndividualProofPayment";

export default function data(i, i2) {
  const { clients } = useContext(ClientsContext);

  const rows = clients[i].credits[i2].creditHistory.map((info) => ({
    id: info.id,
    transactionDate: info.transactionDate,
    value: `$ ${info.value}`,
    paymentType: info.paymentType,
    observation: info.observation,
    download: <IndividualProofPayment info={info} i={i} i2={i2} />,
  }));

  const totalPayments = clients[i].credits[i2].creditHistory.length;
  const repetitions = clients[i].credits[i2].periods - totalPayments;

  for (let j = 0; j < repetitions; j += 1) {
    const auxInitialMonth = new Date(clients[i].credits[i2].initialDate);
    const nowDate = new Date().toISOString().split("T")[0].replace("-", "/").replace("-", "/");

    const auxNextMonth = auxInitialMonth;
    auxNextMonth.setMonth(auxNextMonth.getMonth() + j + totalPayments + 1);
    const nextMonth = auxNextMonth.toISOString().split("T")[0].replace("-", "/").replace("-", "/");

    const auxDate1 = nowDate.split("/");
    const auxDate2 = nextMonth.split("/");
    const utcDate1 = Date.UTC(auxDate1[0], auxDate1[1] - 1, auxDate1[2]);
    const utcDate2 = Date.UTC(auxDate2[0], auxDate2[1] - 1, auxDate2[2]);
    const difference = utcDate2 - utcDate1;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    let okPaymentType = "";
    let okObservation = "";

    if (days < 0) {
      okPaymentType = "Retrasado";
      okObservation = `${Math.abs(days)} días de mora`;
    } else {
      okPaymentType = "Pendiente";
      okObservation = `En ${Math.abs(days)} días realizar el pago`;
    }

    const rowsTempo = {
      id: j + totalPayments + 1,
      transactionDate: nextMonth,
      value: `$ ${clients[i].credits[i2].monthlyPayment.toFixed(2)}`,
      paymentType: okPaymentType,
      observation: okObservation,
      download: "No generado",
    };

    rows.push(rowsTempo);
  }

  return {
    columns: [
      { Header: "id", accessor: "id", align: "left", width: "80px" },
      { Header: "Fecha", accessor: "transactionDate", align: "left" },
      { Header: "Valor", accessor: "value", align: "center" },
      { Header: "Tipo de Pago", accessor: "paymentType", align: "center" },
      { Header: "Observación", accessor: "observation", align: "left" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows,
  };
}
