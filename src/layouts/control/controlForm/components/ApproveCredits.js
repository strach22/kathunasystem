/* eslint-disable no-use-before-define */
import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import ClientsContext from "context/Clients/ClientsContext";
import RadioG from "elements/RadioG";
import InputPassword from "elements/InputPassword";
import useForm from "elements/hooks/useForm";
import * as ConstDate from "elements/data/ConstDate";

const useStyles = makeStyles({
  root: {
    // ButtonGroup
    "& .ControlTariff": {
      marginTop: "50px",
      paddingBottom: "10px",
      border: "2px double #CDD4D5",
      borderRadius: 7,
    },
    // ButtonGroup
    "& #demo-controlled-radio-buttons-group": {
      color: "black",
      margin: "15px 50px 10px 15px",
    },
    // ButtonGroup
    "& .MuiRadio-root": {
      margin: "0px 10px 0px 40px",
    },
    // ButtonGroup
    "& .MuiTypography-root": {
      color: "#8C8F90",
      fontSize: "15px",
    },
    // ButtonGroup
    "& .MuiTouchRipple-root": {
      color: "black",
    },
    // Buttons
    "& .MuiButton-sizeLarge": {
      marginTop: "45px",
      width: "90%",
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
  },
});

export default function ApproveCredits() {
  const errorValues = {
    nameVerification: "Colocar Contraseña",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("nameVerification" in fieldValues)
      tempo.nameVerification =
        fieldValues.nameVerification === "123" ? "" : "La Contraseña es Incorrecta";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      actualState: "",
      nameVerification: "",
    },
    true,
    validate,
    errorValues
  );

  const classes = useStyles();
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();

  const [clientFolder, setClientFolder] = useState("0");
  const [verification, setVerification] = useState(false);
  const [errorNow, setErrorNow] = useState("");
  const [read, setRead] = useState("true");

  let i = clients.map((e) => e.id).indexOf(id);
  let i2 = clients[i].credits.map((e) => e.id).indexOf(clientFolder);

  const columns = [
    { Header: "Carpeta", accessor: "id", align: "left" },
    { Header: "Valor Préstamo", accessor: "loanValue", align: "center" },
    { Header: "Estado Actual", accessor: "state", align: "center" },
    { Header: "Cambiar Estado", accessor: "accion", align: "center" },
  ];

  const rows = clients[i].credits.map((info) => ({
    id: info.id,
    loanValue: info.loanValue,
    state: info.state,
    accion: (
      <MDButton
        variant="text"
        size="medium"
        onClick={() => handleChangeState(info.id)}
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        Cambiar Estado
      </MDButton>
    ),
  }));

  const handleChangeState = (folderId) => {
    setClientFolder(folderId);

    i = clients.map((e) => e.id).indexOf(id);
    i2 = clients[i].credits.map((e) => e.id).indexOf(folderId);

    values.actualState = clients[i].credits[i2].state;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    errors.nameVerification = "Colocar Contraseña";
    if (read === "true") {
      setVerification(!verification);
      values.nameVerification = "";
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (values.nameVerification === "123") {
      setVerification(false);
      values.nameVerification = "";
      setRead("true");
      errors.nameVerification = "Colocar Contraseña";

      console.log("aqui va el código");
    } else {
      setErrorNow(errors.nameVerification);
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
      {clientFolder !== "0" && (
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <RadioG
            name="actualState"
            label="Estado Actual"
            value={values.actualState}
            onChange={handleInputChange}
            items={ConstDate.stateItems()}
          />
        </Grid>
      )}
      <Grid item xs={3}>
        <Link to="/control">
          <MDButton
            size="large"
            variant="contained"
            color="secondary"
            sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
          >
            REGRESAR
          </MDButton>
        </Link>
      </Grid>
      <Grid item xs={3}>
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
    </Grid>
  );
}
