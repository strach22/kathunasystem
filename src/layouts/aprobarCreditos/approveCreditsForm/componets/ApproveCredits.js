/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import SelectG from "elements/SelectG";
import InputPassword from "elements/InputPassword";
import ClientsContext from "context/Clients/ClientsContext";
import useForm from "elements/hooks/useForm";
import * as ConstDate from "elements/data/ConstDate";

const useStyles = makeStyles({
  root: {
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "200px",
    },
    // Selector
    "& #demo-simple-select": {
      width: "100%",
      height: 46,
      marginLeft: "10px",
    },
    // Buttons
    "& .OkBottom": {
      width: "80%",
      marginTop: "40px",
    },
    // Input Password
    "& .outlined-password-input": {
      width: "85%",
    },
    // Label Input Password
    "& #outlined-password-input-label": {
      fontSize: "115%",
      color: "black",
    },
    // Buttons
    "& .BottomVerification": {
      width: "50%",
      background: "#357ABB",
      "&:hover": { background: "#5499C7" },
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      marginTop: "30px",
      borderRadius: 8,
    },
  },
});

export default function ApproveCredits() {
  const navigate = useNavigate();
  const errorValues = {
    actualState: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("actualState" in fieldValues)
      tempo.actualState =
        fieldValues.actualState.length !== 0 ? "" : "Es obligatorio escoger una opción";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const classes = useStyles();
  const { clients, sbNotification, updateClients, controlInfo } = useContext(ClientsContext);
  const { id } = useParams();

  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      actualState: clients[i].credits[i2].state,
      nameVerification: "",
      read: "true",
    },
    true,
    validate,
    errorValues
  );

  const [verification, setVerification] = useState(false);
  const [errorNow, setErrorNow] = useState("");

  const columns = [
    { Header: "Carpeta", accessor: "id", align: "center", width: "15%" },
    { Header: "Valor Préstamo", accessor: "loanValue", align: "center", width: "25%" },
    { Header: "Estado Actual", accessor: "state", align: "center", width: "25%" },
    { Header: "Cambiar Estado", accessor: "accion", align: "center", width: "35%" },
  ];

  const rows = [
    {
      id: (
        <Link to={`/carpeta/${idC}-${idF}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            {idF}
          </MDTypography>
        </Link>
      ),
      loanValue: `$ ${clients[i].credits[i2].loanValue}`,
      state: clients[i].credits[i2].state,
      accion: (
        <SelectG
          name="actualState"
          label="Estado Actual"
          value={values.actualState}
          onChange={handleInputChange}
          options={ConstDate.stateItems()}
          error={errors.actualState}
          read={values.read}
        />
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.read === "false") {
      if (validate()) {
        values.read = "true";
        const newClients = clients;

        if (values.actualState === "Entregado")
          newClients[i].credits[i2].reserve =
            (newClients[i].credits[i2].loanValue * controlInfo.reserveInterest) / 100;
        newClients[i].credits[i2].state = values.actualState;
        updateClients(newClients);
        sbNotification({
          color: "info",
          icon: "check",
          tittle: "Aprobar Créditos",
          content: "Credito modificado satisfactoriamente!!",
        });
        navigate("/inicio");
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    values.nameVerification = "";
    setErrorNow("");

    if (values.read === "true") {
      setVerification(!verification);
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();

    if (values.nameVerification === "123") {
      values.read = "false";
      setVerification(false);
      values.nameVerification = "";
    } else if (values.nameVerification) {
      setErrorNow("La Contraseña es Incorrecta");
    } else {
      setErrorNow("Colocar Contraseña");
    }
  };

  useEffect(() => {
    setErrorNow("");
  }, [values.nameVerification]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <DataTable
          table={{ columns, rows }}
          isSorted
          showTotalEntries={false}
          noEndBorder
          entriesPerPage={false}
          defaultEntries={5}
        />
      </Grid>
      <Grid item xs={2}>
        <Link to="/aprobar-creditos">
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
          >
            REGRESAR
          </MDButton>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <MDButton
          className="OkBottom"
          variant="text"
          size="large"
          onClick={handleEdit}
          sx={{ background: "#53B74B", "&:hover": { background: "#8CBC89" } }}
        >
          EDITAR
        </MDButton>
      </Grid>
      <Grid item xs={2}>
        <MDButton
          className="OkBottom"
          variant="text"
          size="large"
          onClick={handleSubmit}
          sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
        >
          GUARDAR
        </MDButton>
      </Grid>
      {verification && (
        <Grid item xs={12}>
          <MDBox
            mx={5}
            mt={7}
            py={4}
            px={3}
            variant="gradient"
            borderRadius="xxl"
            coloredShadow="dark"
            sx={{ background: "#F2F4F2" }}
          >
            <Grid container>
              <Grid item xs={5}>
                <InputPassword
                  label="Password"
                  name="nameVerification"
                  value={values.nameVerification}
                  onChange={handleInputChange}
                  error={errorNow}
                />
              </Grid>
              <Grid item xs={4}>
                <MDButton
                  className="BottomVerification"
                  variant="text"
                  size="large"
                  onClick={handleVerification}
                >
                  VERIFICAR
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      )}
      {values.read === "false" && (
        <Grid item xs={12}>
          <Alert severity="success">Puede Editar el Estado del Crédito</Alert>
        </Grid>
      )}
    </Grid>
  );
}
