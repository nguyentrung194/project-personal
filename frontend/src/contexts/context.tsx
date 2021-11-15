import { UserState } from "../interfaces";

export const UserReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload.books,
      };
    case "LOGIN":
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("mssv", action.payload.mssv);
      localStorage.setItem("user_id", action.payload.user_id);
      return {
        ...state,
        isLogin: true,
        name: action.payload.name,
        email: action.payload.email,
        mssv: action.payload.mssv,
        user_id: action.payload.user_id,
      };
    case "REGISTER":
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("mssv", action.payload.mssv);
      localStorage.setItem("user_id", action.payload.user_id);
      return {
        ...state,
        isLogin: action.payload.isLogin,
        name: action.payload.name,
        email: action.payload.email,
        mssv: action.payload.mssv,
        user_id: action.payload.user_id,
      };
    case "LOGOUT":
      localStorage.removeItem("isLogin");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("mssv");
      localStorage.removeItem("user_id");
      return {
        ...state,
        isLogin: false,
        name: "",
        email: "",
        user_id: "",
        mssv: "",
      };
    default:
      return state;
  }
};
