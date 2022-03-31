// layouts
import Dashboard from "layouts/dashboard";
import Depositos from "layouts/depositos";
import Clientes from "layouts/clientes";
import AddClients from "layouts/addClients";
import SignIn from "layouts/authentication/sign-in";
import Retiros from "layouts/retiros";
import Simulador from "layouts/simulador";
import Credito from "layouts/credito";
import CargaClientes from "layouts/cargaClientes";
import CargaCreditos from "layouts/cargaCreditos";
import Historial from "layouts/historial";
import Informacion from "layouts/informacion";
import Cobranzas from "layouts/cobranzas";
import Control from "layouts/control";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Inicio",
    key: "dashboard",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/inicio",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clientes",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clientes",
    component: <Clientes />,
  },
  {
    type: "",
    name: "Agregar clientes",
    key: "agregar-clientes",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/agregar-clientes",
    component: <AddClients />,
  },
  {
    type: "collapse",
    name: "Depositos",
    key: "depositos",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/depositos",
    component: <Depositos />,
  },
  {
    type: "collapse",
    name: "Retiros",
    key: "retiros",
    icon: <Icon fontSize="small">remove</Icon>,
    route: "/retiros",
    component: <Retiros />,
  },
  {
    type: "collapse",
    name: "Simulador",
    key: "simulador",
    icon: <Icon fontSize="small">computer</Icon>,
    route: "/simulador",
    component: <Simulador />,
  },
  {
    type: "collapse",
    name: "Credito",
    key: "credito",
    icon: <Icon fontSize="small">account_balance_wallet</Icon>,
    route: "/credito",
    component: <Credito />,
  },
  {
    type: "collapse",
    name: "Carga de Clientes",
    key: "cargar-clientes",
    icon: <Icon fontSize="small">account_box</Icon>,
    route: "/cargar-clientes",
    component: <CargaClientes />,
  },
  {
    type: "collapse",
    name: "Carga Creditos",
    key: "cargar-creditos",
    icon: <Icon fontSize="small">drive_folder_upload_icon</Icon>,
    route: "/cargar-creditos",
    component: <CargaCreditos />,
  },
  {
    type: "collapse",
    name: "Historial",
    key: "historial",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/historial",
    component: <Historial />,
  },
  {
    type: "collapse",
    name: "Cobranzas",
    key: "cobranzas",
    icon: <Icon fontSize="small">paid</Icon>,
    route: "/cobranzas",
    component: <Cobranzas />,
  },
  {
    type: "collapse",
    name: "Información",
    key: "informacion",
    icon: <Icon fontSize="small">account_balance</Icon>,
    route: "/informacion",
    component: <Informacion />,
  },
  {
    type: "collapse",
    name: "Control",
    key: "control",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/control",
    component: <Control />,
  },
];

export default routes;
