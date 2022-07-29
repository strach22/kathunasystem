import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Input from "elements/Input";

export default function FormListRelationShip(props) {
  const {
    valFirstName,
    valLastName,
    valMobile,
    valRelationShip,
    valIdentification,
    handleInputChange,
    errFirstName,
    errLastName,
    errMobile,
    errRelationShip,
    errIdentification,
  } = props;

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Input
          label="Nombres"
          name="firstNameRelationShip"
          value={valFirstName}
          onChange={handleInputChange}
          error={errFirstName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Apellidos"
          name="lastNameRelationShip"
          value={valLastName}
          onChange={handleInputChange}
          error={errLastName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Cédula de Identidad"
          name="identificationRelationShip"
          value={valIdentification}
          onChange={handleInputChange}
          error={errIdentification}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Número de Teléfono"
          name="mobileRelationShip"
          value={valMobile}
          onChange={handleInputChange}
          error={errMobile}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Parentesco"
          name="relationShip"
          value={valRelationShip}
          onChange={handleInputChange}
          error={errRelationShip}
          read=""
        />
      </Grid>
    </Grid>
  );
}

FormListRelationShip.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valLastName: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  valRelationShip: PropTypes.string.isRequired,
  valIdentification: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errRelationShip: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
};
