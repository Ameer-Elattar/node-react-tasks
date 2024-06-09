export function userReducer(state = { user: null }, action) {
  if (action.type === "setUser") {
    return { user: action.payload };
  }
  if (action.type === "rmUser") {
    return { user: action.payload };
  }
  return state;
}
