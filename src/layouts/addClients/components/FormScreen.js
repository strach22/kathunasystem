import React from "react";
import { Box, Grid } from "@mui/material";
import Input from "../elements/Input";
import * as Helpers from "../helpers/Helpers";
import RadioG from "../elements/RadioG";
import SelectG from "../elements/SelectG";
import DatePickerH from "../elements/DatePickerH";
import CheckboxB from "../elements/CheckboxB";
import useForm from "../hooks/useForm";
import Form from "../helpers/Form";

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

export default function FormScreen() {
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
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input label="Nombres" name="names" value={firstname} onChange={handleInputChange} />
          <Input label="Apellidos" name="lastname" value={lastname} onChange={handleInputChange} />
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
          <Box sx={{ width: 335, margin: "3px 0px 15px 60px" }}>
            <DatePickerH
              name="birthDate"
              label="Fecha de Nacimiento"
              value={birthDate}
              onChange={handleInputChange}
            />
          </Box>

          <CheckboxB
            name="agree"
            label="Desea Agregar Cliente"
            value={agree}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
