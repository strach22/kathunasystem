/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Input from "../../../../../elements/Input";

export default function FormListRelationShip(props) {
  const {
    valFirstName,
    valLastName,
    valMobile,
    valRelationShip,
    handleInputChange,
    errFirstName,
    errLastName,
    errMobile,
    errRelationShip,
    state,
  } = props;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Input
          label="Nombres"
          name="firstNameRelationShip"
          value={valFirstName}
          onChange={handleInputChange}
          error={errFirstName}
          state={state}
        />
        <Input
          label="Apellidos"
          name="lastNameRelationShip"
          value={valLastName}
          onChange={handleInputChange}
          error={errLastName}
          state={state}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          label="Número de Teléfono"
          name="mobileRelationShip"
          value={valMobile}
          onChange={handleInputChange}
          error={errMobile}
          state={state}
        />
        <Input
          label="Parentesco"
          name="relationShip"
          value={valRelationShip}
          onChange={handleInputChange}
          error={errRelationShip}
          state={state}
        />
      </Grid>
    </Grid>
  );
}

// FormListRelationShip.propTypes = {
//   valFirstName: PropTypes.string.isRequired,
//   valLastName: PropTypes.string.isRequired,
//   valMobile: PropTypes.string.isRequired,
//   valRelationShip: PropTypes.string.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
//   errFirstName: PropTypes.string.isRequired,
//   errLastName: PropTypes.string.isRequired,
//   errMobile: PropTypes.string.isRequired,
//   errRelationShip: PropTypes.string.isRequired,
//   state: PropTypes.string.isRequired,
// };
