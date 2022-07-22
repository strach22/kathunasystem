import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import ClientsContext from "context/Clients/ClientsContext";
import QuotaHistory from "layouts/credito/download/QuotaHistory";
import historial from "../../table/tableHistoryPayments";

export default function MonthlyPaymentHistory() {
  const { clients } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);
  const [idC, idF] = id.split("-");

  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const { columns, rows } = historial(i, i2);
  return (
    <Grid container>
      <QuotaHistory rows={rows} i={i} i2={i2} />
      <DataTable
        table={{ columns, rows }}
        isSorted
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
        defaultEntries={5}
      />
    </Grid>
  );
}
