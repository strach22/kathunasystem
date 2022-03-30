import PageLayout from "examples/LayoutContainers/PageLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "assets/images/bgkathuna.png";

const theme = createTheme();

function Basic() {
  const navigate = useNavigate();
  const [inPassw, setInPassw] = useState(false);
  const [inUser, setInUser] = useState(false);

  const user = "123";
  const password = "123";
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const userForm = data.get("user");
    const passwordForm = data.get("password");
    event.preventDefault();
    if (userForm === user && passwordForm === password) navigate("/inicio");
    else {
      if (passwordForm !== password) setInPassw(true);
      if (userForm !== user) setInUser(true);
      if (passwordForm === password) setInPassw(false);
      if (userForm === user) setInUser(false);
    }
  };

  return (
    <PageLayout>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Inicio de Sesión
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  error={inUser}
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Usuario"
                  name="user"
                  autoComplete="usuario"
                  autoFocus
                />
                <TextField
                  error={inPassw}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  INICIAR
                </Button>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8 }}>
                  {"Copyright © "}
                  <Link
                    color="inherit"
                    href="https://www.facebook.com/k.sytem/?ref=pages_you_manage"
                  >
                    Kathuna System
                  </Link>{" "}
                  {new Date().getFullYear()}.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </PageLayout>
  );
}

export default Basic;
