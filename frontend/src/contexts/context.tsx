import { UserState } from "../interfaces";

export const UserReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload.books,
      };
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        name: action.payload.name,
        email: action.payload.email,
        mssv: action.payload.mssv,
        user_id: action.payload.user_id,
      };
    case "REGISTER":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        name: action.payload.name,
        email: action.payload.email,
        mssv: action.payload.mssv,
        user_id: action.payload.user_id,
      };
    case "LOGOUT":
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
