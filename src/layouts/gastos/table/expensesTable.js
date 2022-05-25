import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";
import MDButton from "components/MDButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function data() {
  const { controlInfo } = useContext(ClientsContext);

  const handleDownload = (e) => {
    e.preventDefault();
    console.log("hola diuks");
  };

  return {
    columns: [
      { Header: "id", accessor: "id", align: "center" },
      { Header: "Fecha", accessor: "expenseDate", align: "center" },
      { Header: "Monto", accessor: "expenseValue", align: "center" },
      { Header: "Razón", accessor: "observation", align: "center" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    // rows: controlInfo.expensesHystory,

    rows: controlInfo.expensesHystory.map((info) => ({
      id: info.id,
      expenseDate: info.expenseDate,
      expenseValue: info.expenseValue,
      observation: info.observation,
      download: (
        <MDButton
          variant="text"
          size="medium"
          onClick={handleDownload}
          sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
        >
          <PictureAsPdfIcon />
        </MDButton>
      ),
    })),
  };
}
