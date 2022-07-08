/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/styles";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";
import ActionReduce from "../element/ActionReduce";
import ExcelExport from "../element/ExcelExport";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableHistoryScreen({ worksheets }) {
  const [stateData, setSatateData] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [invalidState, setInvalidState] = useState({
    invalidIdentification: [],
    invalidIdentificationReceipt: [],
    invalidReceipt: [],
    repeatSavingHistory: [],
  });
  const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { clients, addClientHistory, controlInfo, uploadControlInfo } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) {
      const savingHistoryClients = clients.map((val) => val.savingHistory);
      const creditClients = clients.map((val) => val.credits);
      const onlySavingHistoyValues = savingHistoryClients.filter((val) => val.length).flat();
      const onlyCreditValues = creditClients.filter((val) => val.length).flat();
      const onlyCreditHistoryValues = onlyCreditValues.map((val) => val.creditHistory).flat();

      const repeatedReceipts = [];
      const IDNumbersOut = [];
      let onlyIDNumbersOut = [];
      const repeatedDataInformation = [];

      for (let i = 0; i < dataBase.length; i += 1) {
        const findReceiptsSaving = onlySavingHistoyValues.find(
          (val) => val.receipt === dataBase[i].receipt
        );
        const findReceiptsCredit = onlyCreditHistoryValues.find(
          (val) => val.receipt === dataBase[i].receipt
        );

        if (findReceiptsSaving !== undefined) {
          repeatedReceipts.push(findReceiptsSaving.receipt);
          IDNumbersOut.push(dataBase[i].identification);
          onlyIDNumbersOut = [...new Set(IDNumbersOut)];
        }

        if (findReceiptsCredit !== undefined) {
          repeatedReceipts.push(findReceiptsCredit.receipt);
          IDNumbersOut.push(dataBase[i].identification);
          onlyIDNumbersOut = [...new Set(IDNumbersOut)];
        }
      }

      for (let i = 0; i < dataBase.length; i += 1) {
        for (let j = 0; j < clients.length; j += 1) {
          if (dataBase[i].identification === clients[j].identification) {
            const repeatedCurrentReceipt = onlyIDNumbersOut.find(
              (val) => val === dataBase[i].identification
            );

            delete dataBase[i].identification;

            if (!repeatedCurrentReceipt) {
              const validateTransactionDate = clients[j].savingHistory.filter(
                (val) => val.transactionDate === dataBase[i].transactionDate
              );

              if (validateTransactionDate.length > 0) {
                const validateValue = validateTransactionDate.filter(
                  (val) => Math.abs(val.value) === dataBase[i].value
                );

                if (validateValue.length > 0) {
                  const validateActualBalance = validateValue.filter(
                    (val) => val.actualBalance === dataBase[i].actualBalance
                  );
                  if (validateActualBalance.length > 0) {
                    const repeatCustomerIdentification = {
                      ci: clients[j].identification,
                    };
                    const completeInformation = {
                      ...validateActualBalance[0],
                      ...repeatCustomerIdentification,
                    };
                    repeatedDataInformation.push(completeInformation);
                  } else {
                    if (dataBase[i].type === "Retiro") dataBase[i].value *= -1;
                    delete dataBase[i].type;
                    addClientHistory(clients[j].id, dataBase[i]);
                  }
                } else {
                  if (dataBase[i].type === "Retiro") dataBase[i].value *= -1;
                  delete dataBase[i].type;
                  addClientHistory(clients[j].id, dataBase[i]);
                }
              } else {
                if (dataBase[i].type === "Retiro") dataBase[i].value *= -1;
                delete dataBase[i].type;
                addClientHistory(clients[j].id, dataBase[i]);
              }
            }
          }
        }
      }

      const IDnumber = dataBase.map((val) => val.identification);
      const onlyIDnumber = IDnumber.filter((val) => val);

      const receiptNumber = dataBase.map((val) => val.receipt);
      const maxReceiptNumber = receiptNumber.reduce((a, b) => Math.max(a, b));

      const newControlInfo = controlInfo;
      if (maxReceiptNumber > controlInfo.proofPaymentValue)
        newControlInfo.proofPaymentValue = maxReceiptNumber;

      uploadControlInfo(newControlInfo);

      if (
        onlyIDnumber.length > 0 ||
        repeatedReceipts.length > 0 ||
        repeatedDataInformation.length > 0
      ) {
        repeatedReceipts.sort((a, b) => a - b);
        setInvalidState({
          invalidIdentification: [...new Set(onlyIDnumber)],
          invalidIdentificationReceipt: onlyIDNumbersOut,
          invalidReceipt: repeatedReceipts,
          repeatSavingHistory: repeatedDataInformation,
        });
      } else navigate("/inicio");
    }
  };

  const uploadFile = (e) => {
    setLoading(true);
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (!err) {
        const { cols, rows } = resp;
        setSatateData({
          cols: cols,
          rows: rows,
        });
        const data = [...rows];
        data.shift();

        for (let i = 0; i < data.length; i += 1) {
          const savingHistoryTempo = {
            receipt: data[i][0],
            identification: String(data[i][1]),
            type: data[i][2],
            transactionDate: data[i][3],
            value: data[i][4],
            actualBalance: data[i][5],
            paymentType: data[i][6],
            observation: data[i][7],
          };

          dispatch({
            type: "SAVING_HISTORY",
            payload: savingHistoryTempo,
          });
        }
      }
      setLoading(false);
    });
  };

  return (
    <div className="excel-import-container">
      <div className="file-upload">
        <MDTypography variant="h5" sx={{ marginBottom: 2 }}>
          CARGAR HISTORIAL DE AHORROS DEL CLIENTE
        </MDTypography>
        <ExcelExport
          filename="Historial-de-Ahorros.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <Grid container sx={{ marginTop: "3%" }}>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "2%" }} />}
        {loading && <MDTypography>Cargando ... El proceso puede tardar unos segundos</MDTypography>}
        {invalidState.invalidIdentification.length > 0 && (
          <div>
            <Alert severity="warning">
              No están registrados en el sistema los usuarios con el siguiente número de cédula. Por
              favor, registrar a los usuarios y volver a cargar el historial de transacciones de
              ahorro únicamente de los mecionados.
            </Alert>
            <TableContainer sx={{ width: "70%", marginLeft: "15%", marginBottom: "30px" }}>
              <Table>
                <TableBody>
                  {invalidState.invalidIdentification.map((info) => (
                    <StyledTableRow>
                      <TableCell align="center" sx={{ fontSize: 14 }}>{`CI: ${info}`}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {invalidState.invalidIdentificationReceipt.length > 0 && (
          <div>
            <Alert severity="warning">
              Los números de comprobantes: {invalidState.invalidReceipt.map((val) => `${val}, `)} ya
              existen en el sistema. Por favor, revise la infomación y vuelva a subir todo el
              historial de los usuarios con el siguiente número de cédula:
            </Alert>
            <TableContainer sx={{ width: "70%", marginLeft: "15%", marginBottom: "30px" }}>
              <Table>
                <TableBody>
                  {invalidState.invalidIdentificationReceipt.map((info) => (
                    <StyledTableRow>
                      <TableCell align="center" sx={{ fontSize: 14 }}>{`CI: ${info}`}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {invalidState.repeatSavingHistory.length > 0 && (
          <div>
            <Alert severity="warning">
              Los siguientes datos no se pudieron cargar al sistama, debido a que ya existen. Por
              favor, revisar el problema existente.
            </Alert>
            <TableContainer>
              <Table>
                <TableBody>
                  {invalidState.repeatSavingHistory.map((info) => (
                    <StyledTableRow>
                      <TableCell align="center" sx={{ fontSize: 14 }}>{`CI: ${info.ci}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: 14 }}
                      >{`Fecha: ${info.transactionDate}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: 14 }}
                      >{`Valor: $${info.value}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: 14 }}
                      >{`Total: $${info.actualBalance}`}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Grid>

      {!invalidState.invalidIdentification.length > 0 &&
        !invalidState.invalidIdentificationReceipt.length > 0 &&
        !invalidState.repeatSavingHistory.length > 0 && (
          <div className="excel-table-import">
            <OutTable data={stateData.rows} columns={stateData.cols} tableClassName="excel-table" />
          </div>
        )}
    </div>
  );
}

TableHistoryScreen.propTypes = {
  worksheets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          cedulaIdentidad: PropTypes.string.isRequired,
          tipoTransaccion: PropTypes.string.isRequired,
          fecha: PropTypes.string.isRequired,
          valorTransaccion: PropTypes.string.isRequired,
          saldoFinal: PropTypes.string.isRequired,
          observacion: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
