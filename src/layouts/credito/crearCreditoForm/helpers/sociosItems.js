import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";

export default function listItems() {
  const { clients } = useContext(ClientsContext);

  const socios = clients.filter((val) => val.tariff === "Socio");
  const sociosItems = socios.map((val, index) => ({
    id: String(index + 1),
    title: `${val.firstName} ${val.lastName}`,
  }));
  return { sociosItems };
}
