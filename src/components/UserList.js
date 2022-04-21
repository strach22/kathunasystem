import { Button } from "@mui/material";
import React, { useContext } from "react";
import ClientsContext from "../context/Clients/ClientsContext";

function UserList() {
  const { clients, getClients } = useContext(ClientsContext);
  // eslint-disable-next-line no-console
  console.log(clients);
  return (
    <>
      <div>
        {clients.map((client) => (
          <h5>{client.firstName}</h5>
        ))}
      </div>
      <Button variant="contained" onClick={getClients}>
        Botón
      </Button>
    </>
  );
}

export default UserList;
