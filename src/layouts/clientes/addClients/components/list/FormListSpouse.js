import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Input from "elements/Input";

export default function FormListSpouse(props) {
  const {
    valFirstName,
    valIdentification,
    valLastName,
    valMobile,
    handleInputChange,
    errFirstName,
    errLastName,
    errIdentification,
    errMobile,
  } = props;

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Input
          label="Nombres"
          name="firstNameSpouse"
          value={valFirstName}
          onChange={handleInputChange}
          error={errFirstName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Apellidos"
          name="lastNameSpouse"
          value={valLastName}
          onChange={handleInputChange}
          error={errLastName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Cédula de Identidad"
          name="identificationSpouse"
          value={valIdentification}
          onChange={handleInputChange}
          error={errIdentification}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Número de Teléfono"
          name="mobileSpouse"
          value={valMobile}
          onChange={handleInputChange}
          error={errMobile}
          read=""
        />
      </Grid>
    </Grid>
  );
}

FormListSpouse.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valLastName: PropTypes.string.isRequired,
  valIdentification: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
};
