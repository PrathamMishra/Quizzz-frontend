export const loginAction = (authData) => {
  return {
    type: "LOGIN",
    data: authData,
  };
};
export const logOutAction = () => {
  return {
    type: "LOGOUT",
    data: null,
  };
};
