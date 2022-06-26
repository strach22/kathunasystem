import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";
import ProofPaymentExpenses from "../download/ProofPaymentExpenses";

export default function data() {
  const { controlInfo } = useContext(ClientsContext);

  return {
    columns: [
      { Header: "id", accessor: "id", align: "center" },
      { Header: "Fecha", accessor: "expenseDate", align: "center" },
      { Header: "Monto", accessor: "expenseValue", align: "center" },
      { Header: "Razón", accessor: "observation", align: "center" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows: controlInfo.expensesHystory.map((info) => ({
      id: info.id,
      expenseDate: info.expenseDate,
      expenseValue: `$ ${info.expenseValue}`,
      observation: info.observation,
      download: <ProofPaymentExpenses info={info} />,
    })),
  };
}
