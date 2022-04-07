export function getAllLocalStorage() {
  if (localStorage.getItem("cliente") === null) localStorage.setItem("cliente", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("cliente"));
}

export function generateLocalStorageId() {
  if (localStorage.getItem("clienteId") === null) localStorage.setItem("clienteId", "0");
  // eslint-disable-next-line radix
  const id = parseInt(localStorage.getItem("clienteId"));
  const newId = id + 1;
  localStorage.setItem("clienteId", newId.toString());
  return id;
}

export function insertLocalStorage(values) {
  const data = getAllLocalStorage();
  // eslint-disable-next-line no-param-reassign
  values.id = generateLocalStorageId();
  data.push(values);
  localStorage.setItem("cliente", JSON.stringify(data));
}
