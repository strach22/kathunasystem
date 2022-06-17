/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import SelectG from "elements/SelectG";
import InputPassword from "elements/InputPassword";
import ClientsContext from "context/Clients/ClientsContext";
import useForm from "elements/hooks/useForm";
import * as ConstDate from "elements/data/ConstDate";

export default function ApproveCredits() {
  const errorValues = {
    nameVerification: "Colocar Contraseña",
    actualState: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("nameVerification" in fieldValues)
      tempo.nameVerification =
        fieldValues.nameVerification === "123" ? "" : "La Contraseña es Incorrecta";
    if ("actualState" in fieldValues)
      tempo.actualState =
        fieldValues.actualState.length !== 0 ? "" : "Es obligatorio escoger una opción";
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

  const { clients } = useContext(ClientsContext);
  const { id } = useParams();

  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const [read, setRead] = useState("true");
  const [verification, setVerification] = useState(false);
  const [errorNow, setErrorNow] = useState("");

  const columns = [
    { Header: "Carpeta", accessor: "id", align: "left" },
    { Header: "Valor Préstamo", accessor: "loanValue", align: "center" },
    { Header: "Estado Actual", accessor: "state", align: "center" },
    { Header: "Cambiar Estado", accessor: "accion", align: "center" },
  ];

  const rows = [
    {
      id: i2,
      loanValue: clients[i].credits[i2].loanValue,
      state: clients[i].credits[i2].state,
      accion: (
        <SelectG
          name="actualState"
          label="Cambiar Estado"
          value={values.actualState}
          onChange={handleInputChange}
          options={ConstDate.stateItems()}
          error={errors.actualState}
          read={read}
        />
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setRead("true");
      errors.nameVerification = "Colocar Contraseña";
      console.log("diuks");
    }
  };

  const handleEdit = (e) => {
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
      setRead("false");
      setVerification(false);
      values.nameVerification = "";
    } else {
      setErrorNow(errors.nameVerification);
    }
  };

  useEffect(() => {
    setErrorNow("");
  }, [values.nameVerification]);

  return (
    <Grid container>
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
      <Grid item xs={3}>
        <Link to="/aprobar-creditos">
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
          onClick={handleEdit}
          sx={{ background: "#53B74B", "&:hover": { background: "#8CBC89" } }}
        >
          EDITAR
        </MDButton>
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
      {read === "false" && (
        <Grid item xs={12}>
          <Alert severity="success">Puede Editar el Estado del Crédito</Alert>
        </Grid>
      )}
    </Grid>
  );
}
