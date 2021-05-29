const SET_LOGIN_POEN = "SET_LOGIN_POEN";
const SET_LOGIN_CLOSE = "SET_LOGIN_CLOSE";
const SET_LOGIN = "SET_LOGIN";
const SET_LOGOUT = "SET_LOGOUT";

const initState = {
  open: false,
  login: "login",
};

export default function Login(state = initState, action) {
  switch (action.type) {
    case SET_LOGIN_POEN:
      return {
        ...state,
        open: true,
      };
    case SET_LOGIN_CLOSE:
      return {
        ...state,
        open: false,
      };
    case SET_LOGIN:
      return {
        ...state,
        login: "login",
      };
    case SET_LOGOUT:
      return {
        ...state,
        login: "logout",
      };
    default:
      return state;
  }
}
