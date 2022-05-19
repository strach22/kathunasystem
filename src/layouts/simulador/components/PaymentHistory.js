import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import amortizacionTable from "../table/amortizacionTable";

// eslint-disable-next-line react/prop-types
export default function AccountStatusScreen({ parameters }) {
  const { columns, rows } = amortizacionTable(parameters);

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const tablaAmortizacion = {
      pageMargins: [40, 40, 40, 80],
      watermark: {
        text: "watermark",
        color: "orange",
        opacity: 0.3,
        bold: true,
        italics: false,
      },
      content: [
        { text: "CAJA DE AHORRO SAN PABLITO", style: "principalTitle" },
        { text: " ''SEMBRANDO EL FUTURO IMPULSANDO AL DESARROLLO'' ", style: "principalTitle" },
        { text: "SAN PABLITO", style: "principalTitle" },

        { text: " ", lineHeight: 1.5 },

        { text: "TIPO", style: "secundaryTitle" },
        { text: "TABLA DE AMORTIZACIÓN", style: "secundaryTitle", color: "red" },
        {
          text: [
            { text: "CARPETA: ", style: "secundaryTitle" },
            { text: "013", style: "secundaryTitle", color: "red", italics: true },
          ],
        },
        {
          text: "_________________________________________________________________",
          style: "border",
        },

        {
          style: "header",
          table: {
            widths: [80, 210, 60, 55, 35, 35],
            body: [
              [
                {
                  text: "Cliente:",
                  style: "rowData",
                },
                {
                  text: "SEBASTIÁN FERNANDO LOVATO ENCARNACIÓN",
                  style: "rowDataResp",
                },
                {
                  text: "Fecha:",
                  style: "rowData",
                },
                {
                  text: "2019/05/27",
                  style: "rowDataResp",
                },
                {
                  text: "Hora:",
                  style: "rowData",
                },
                {
                  text: "10:42:07",
                  style: "rowDataResp",
                },
              ],
              [
                {
                  text: "RUC:",
                  style: "rowData",
                },
                {
                  text: "1722163233",
                  style: "rowDataResp",
                },
                {
                  text: "Teléfono:",
                  style: "rowData",
                },
                {
                  text: "0997105921",
                  style: "rowDataResp",
                  colSpan: 3,
                },
                "",
                "",
              ],
              [
                {
                  text: "Dirección:",
                  style: "rowData",
                },
                {
                  text: "PUSUQUÍ ''EL JARDÍN Y LOS LUCEROS''",
                  style: "rowDataResp",
                  colSpan: 5,
                },
                "",
                "",
                "",
                "",
              ],
              [
                {
                  text: "Valor Préstamo:",
                  style: "rowData",
                },
                {
                  text: "120000.00",
                  style: "rowDataResp",
                },
                {
                  text: "Valor Cuota:",
                  style: "rowData",
                },
                {
                  text: "512.75",
                  style: "rowDataResp",
                },
                {
                  text: "Años:",
                  style: "rowData",
                },
                {
                  text: "3",
                  style: "rowDataResp",
                  alignment: "center",
                },
              ],
              [
                {
                  text: "Número Cuotas:",
                  style: "rowData",
                },
                {
                  text: "36",
                  style: "rowDataResp",
                },
                {
                  text: "Total Interés:",
                  style: "rowData",
                },
                {
                  text: "40.26",
                  style: "rowDataResp",
                },
                {
                  text: "Meses:",
                  style: "rowData",
                },
                {
                  text: "0",
                  style: "rowDataResp",
                  alignment: "center",
                },
              ],
            ],
          },
          layout: {
            defaultBorder: false,
          },
        },
      ],

      styles: {
        header: {
          border: [true, true, true, true],
          fillColor: "#eeffee",
        },
        principalTitle: {
          alignment: "center",
          color: "black",
          fontSize: 12,
          bold: true,
          lineHeight: 1.25,
        },
        secundaryTitle: {
          alignment: "center",
          color: "black",
          fontSize: 10,
          bold: true,
        },
        border: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
        },
        rowData: {
          fontSize: 10,
          bold: true,
          alignment: "left",
          color: "black",
        },
        rowDataResp: {
          fontSize: 9,
          alignment: "left",
          color: "#424141",
        },
      },
    };

    pdfMake.createPdf(tablaAmortizacion).download();
  };

  return (
    <div>
      <Grid>
        <Grid item xs={12}>
          <MDButton
            size="large"
            variant="contained"
            color="info"
            sx={{
              "&:hover": { background: "#5499C7" },
              width: "30%",
              marginTop: "50px",
            }}
            onClick={handleGeneratedPDF}
          >
            GENERAR PDF
          </MDButton>
        </Grid>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          showTotalEntries={false}
          noEndBorder
          entriesPerPage={false}
        />
      </Grid>
    </div>
  );
}
