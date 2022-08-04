// layouts
import Dashboard from "layouts/dashboard";
import Clientes from "layouts/clientes";
import AddClients from "layouts/clientes/addClients";
import SignIn from "layouts/authentication/sign-in";
import TransaccionesAhorros from "layouts/transaccionesAhorros";
import Simulador from "layouts/simulador";
import Creditos from "layouts/credito";
import CargaClientes from "layouts/cargaClientes";
import CargaCreditos from "layouts/cargaCreditos";
import Historial from "layouts/historial";
import Cobranzas from "layouts/cobranzas";
import Gastos from "layouts/gastos";
import HistorialG from "layouts/gastos/historialGastos/gastos";
import HistorialI from "layouts/gastos/historialGastos/ingresos";
import AprobarCreditos from "layouts/aprobarCreditos";
import Control from "layouts/control";
import InfoClientes from "layouts/clientes/infoClients";
import DepositoForm from "layouts/transaccionesAhorros/depositoForm";
import RetiroForm from "layouts/transaccionesAhorros/retiroForm";
import CargaCreditoForm from "layouts/cargaCreditos/cargaCreditoForm";
import CrearCreditoForm from "layouts/credito/crearCreditoForm";
import VerCreditoForm from "layouts/credito/verCreditoForm";
import VerCarpeta from "layouts/credito/verCarpeta";
import PagarCredito from "layouts/credito/pagarCredito";
import ApproveCreditForm from "layouts/aprobarCreditos/approveCreditsForm";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign In *",
    key: "sign-in *",
    route: "/*",
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
    name: "Agregar cliente",
    key: "agregar-clientes",
    route: "/agregar-clientes",
    component: <AddClients />,
  },
  {
    type: "collapse",
    name: "Transacciones Ahorros",
    key: "transacciones-ahorros",
    icon: <Icon fontSize="small">iso</Icon>,
    route: "/transacciones-ahorros",
    component: <TransaccionesAhorros />,
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
    name: "Créditos",
    key: "creditos",
    icon: <Icon fontSize="small">credit_card</Icon>,
    route: "/creditos",
    component: <Creditos />,
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
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/cobranzas",
    component: <Cobranzas />,
  },
  {
    type: "collapse",
    name: "Ingresos/Gastos",
    key: "gastos",
    icon: <Icon fontSize="small">paid</Icon>,
    route: "/gastos",
    component: <Gastos />,
  },
  {
    name: "historialGastos",
    key: "historialGastos",
    icon: <Icon fontSize="small">paid</Icon>,
    route: "/historial-gastos",
    component: <HistorialG />,
  },
  {
    name: "historialIngresos",
    key: "historialIngresos",
    icon: <Icon fontSize="small">paid</Icon>,
    route: "/historial-ingresos",
    component: <HistorialI />,
  },
  {
    type: "collapse",
    name: "Aprobar Créditos",
    key: "aprobar-creditos",
    icon: <Icon fontSize="small">check</Icon>,
    route: "/aprobar-creditos",
    component: <AprobarCreditos />,
  },
  {
    type: "collapse",
    name: "Control",
    key: "control",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/control",
    component: <Control />,
  },
  {
    name: "Clientes:id",
    key: "clientes:id",
    route: "/clientes/:id",
    component: <InfoClientes />,
  },
  {
    name: "Retiros/:id",
    key: "retiros/:id",
    route: "/retiros/:id",
    component: <RetiroForm />,
  },
  {
    name: "Depositos/:id",
    key: "depositos/:id",
    route: "/depositos/:id",
    component: <DepositoForm />,
  },
  {
    name: "Cargar-creditos/:id",
    key: "cargar-creditos/:id",
    route: "/cargar-creditos/:id",
    component: <CargaCreditoForm />,
  },
  {
    name: "Creditos/crear/:id",
    key: "creditos/crear/:id",
    route: "/creditos/crear/:id",
    component: <CrearCreditoForm />,
  },
  {
    name: "Creditos/ver/:id",
    key: "creditos/ver/:id",
    route: "/creditos/ver/:id",
    component: <VerCreditoForm />,
  },
  {
    name: "VerCarpeta",
    key: "verCarpeta",
    route: "/carpeta/:id",
    component: <VerCarpeta />,
  },
  {
    name: "PagarCredito",
    key: "pagarCredito",
    route: "/credito/:id",
    component: <PagarCredito />,
  },
  {
    name: "Aprobar-creditos/:id",
    key: "aprobar-creditos/:id",
    route: "/aprobar-creditos/:id",
    component: <ApproveCreditForm />,
  },
];

export default routes;
