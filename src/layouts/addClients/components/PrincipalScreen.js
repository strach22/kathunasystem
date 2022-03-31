import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useForm from "../hooks/useForm";
import Input from "../elements/Input";
import * as Helpers from "../helpers/Helpers";
import RadioG from "../elements/RadioG";
import SelectG from "../elements/SelectG";
import DatePickerH from "../elements/DatePickerH";
import CheckboxB from "../elements/CheckboxB";

const initialValues = {
  id: 0,
  name: "",
  lastname: "",
  identification: "",
  mobile: "",
  email: "",
  direction: "",
  tariff: "",
  civil: "",
  birthDate: new Date(),
  agree: false,
};

export default function PrincipalScreen() {
  const { values, handleInputChange } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const {
    firstname,
    lastname,
    identification,
    mobile,
    email,
    direction,
    tariff,
    civil,
    birthDate,
    agree,
  } = values;

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Agregar Clientes
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={6}>
                    <Input
                      label="Nombres"
                      name="names"
                      value={firstname}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Apellidos"
                      name="lastname"
                      value={lastname}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Cédula de Indentidad"
                      name="identification"
                      value={identification}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Número de teléfono"
                      name="mobile"
                      value={mobile}
                      onChange={handleInputChange}
                    />
                    <Input label="Email" name="email" value={email} onChange={handleInputChange} />
                    <Input
                      label="Dirección"
                      name="direction"
                      value={direction}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RadioG
                      name="tariff"
                      label="Tarifa"
                      value={tariff}
                      onChange={handleInputChange}
                      items={Helpers.tariffItems()}
                    />
                    <SelectG
                      name="civil"
                      label="Estado Civil"
                      value={civil}
                      onChange={handleInputChange}
                      options={Helpers.getCivilStatus()}
                    />

                    <DatePickerH
                      name="birthDate"
                      label="Fecha de Nacimiento"
                      value={birthDate}
                      onChange={handleInputChange}
                    />
                    <CheckboxB
                      name="agree"
                      label="Desea Añadir Cliente"
                      value={agree}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
