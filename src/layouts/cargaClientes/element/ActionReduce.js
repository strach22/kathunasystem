export default function ActionReduce(state = [], action) {
  switch (action.type) {
    case "CLIENT_DATA":
      return [...state, action.payload];
    case "SAVING_HISTORY":
      return [...state, action.payload];
    default:
      return state;
  }
}
