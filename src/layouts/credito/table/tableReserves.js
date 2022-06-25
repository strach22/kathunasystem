export default function data(clients) {
  return {
    columns2: [
      { Header: "código", accessor: "id", align: "left", width: "15%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "encaje", accessor: "reserve", align: "center" },
    ],
    rows2: clients
      .filter((cliente) => cliente.credits.reduce((acc, c) => acc + c.reserve, 0) > 0)
      .map((cliente) => ({
        id: cliente.id,
        firstName: cliente.firstName,
        lastName: cliente.lastName,
        identification: cliente.identification,
        reserve: `$ ${cliente.credits.reduce((acc, c) => acc + c.reserve, 0).toFixed(2)}`,
      })),
  };
}
