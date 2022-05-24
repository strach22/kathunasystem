import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";

export default function data() {
  const { controlInfo } = useContext(ClientsContext);
  return {
    columns: [
      { Header: "id", accessor: "id", align: "center" },
      { Header: "Fecha", accessor: "expenseDate", align: "center" },
      { Header: "Monto", accessor: "expenseValue", align: "center" },
      { Header: "Razón", accessor: "observation", align: "center" },
    ],

    rows: controlInfo.expensesHystory,
  };
}
