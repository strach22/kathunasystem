import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";
import ProofPaymentIncomes from "../download/ProofPaymentIncomes";

export default function data() {
  const { controlInfo } = useContext(ClientsContext);

  return {
    columns: [
      { Header: "id", accessor: "id", align: "center" },
      { Header: "Fecha", accessor: "incomeDate", align: "center" },
      { Header: "Monto", accessor: "incomeValue", align: "center" },
      { Header: "Razón", accessor: "observation", align: "center" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows: controlInfo.incomesHystory.map((info) => ({
      id: info.id,
      incomeDate: info.incomeDate,
      incomeValue: `$ ${info.incomeValue}`,
      observation: info.observation,
      download: <ProofPaymentIncomes info={info} />,
    })),
  };
}
