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
      width: "100%",
      marginBottom: 10,
    },
    // Input Password
    "& .outlined-password-input": {
      width: "100%",
      marginBottom: 10,
    },
    // Label Input Password
    "& #outlined-password-input-label": {
      fontSize: "115%",
      color: "black",
    },
    // Buttons
    "& .BottomVerification": {
      width: "100%",
      background: "#357ABB",
      "&:hover": { background: "#5499C7" },
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      borderRadius: 8,
      marginBottom: 40,
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
  let itemState = [];

  if (clients[i].credits[i2].state === "Creado") {
    itemState = ConstDate.stateItems1();
  }

  if (clients[i].credits[i2].state === "Aprobado") {
    itemState = ConstDate.stateItems2();
  }

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
          options={itemState}
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

        if (values.actualState === "Aprobado") {
          newClients[i].credits[i2].approvalDate = new Date()
            .toISOString()
            .split("T")[0]
            .replace("-", "/")
            .replace("-", "/");

          sbNotification({
            color: "info",
            icon: "check",
            tittle: "Aprobar Créditos",
            content: "Credito aprobado satisfactoriamente!!",
          });
        }

        if (values.actualState === "Entregado") {
          newClients[i].credits[i2].reserve =
            (newClients[i].credits[i2].loanValue * controlInfo.reserveInterest) / 100;
          newClients[i].credits[i2].initialDate = new Date()
            .toISOString()
            .split("T")[0]
            .replace("-", "/")
            .replace("-", "/");

          sbNotification({
            color: "success",
            icon: "check",
            tittle: "Aprobar Créditos",
            content: "Credito entregado satisfactoriamente!!",
          });
        }

        if (values.actualState === "Denegado") {
          newClients[i].credits[i2].rejectionDate = new Date()
            .toISOString()
            .split("T")[0]
            .replace("-", "/")
            .replace("-", "/");

          newClients[i].credits[i2].actualLoan = 0;

          sbNotification({
            color: "info",
            icon: "check",
            tittle: "Aprobar Créditos",
            content: "Credito denegado satisfactoriamente!!",
          });
        }

        newClients[i].credits[i2].state = values.actualState;
        updateClients(newClients);
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
      <Grid item xs={12} mb={4}>
        <DataTable
          table={{ columns, rows }}
          isSorted
          showTotalEntries={false}
          noEndBorder
          entriesPerPage={false}
          defaultEntries={5}
        />
      </Grid>

      <Grid container mx={3} mb={2}>
        <Grid item xs={12} sm={5.85} md={3} lg={2.2}>
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

        <Grid item xs={0} sm={0.3}>
          {}
        </Grid>

        <Grid item xs={12} sm={5.85} md={3} lg={2.2}>
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            onClick={handleEdit}
            sx={{ background: "#D5923B", "&:hover": { background: "#D5AE7A" } }}
          >
            EDITAR
          </MDButton>
        </Grid>

        <Grid item xs={0} md={0.3}>
          {}
        </Grid>

        <Grid item xs={12} sm={5.85} md={3} lg={2.2}>
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
      </Grid>
      {verification && (
        <Grid item xs={12}>
          <MDBox
            mx={5}
            mt={1}
            mb={5}
            py={4}
            px={3}
            variant="gradient"
            borderRadius="xxl"
            coloredShadow="dark"
            sx={{ background: "#F2F4F2" }}
          >
            <Grid container>
              <Grid item xs={12} md={5} lg={4}>
                <InputPassword
                  label="Password"
                  name="nameVerification"
                  value={values.nameVerification}
                  onChange={handleInputChange}
                  error={errorNow}
                />
              </Grid>
              <Grid item xs={0} md={1}>
                {}
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
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
        <Grid item xs={12} mx={3}>
          <Alert severity="success">Puede Editar el Estado del Crédito</Alert>
        </Grid>
      )}
    </Grid>
  );
}
