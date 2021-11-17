import React, { createContext, useReducer } from "react";
import { UserReducer } from "./context";
import { UserState } from "../interfaces";

export const UserContext = createContext<UserState>({
  isLogin: false,
  name: "",
  email: "",
  books: [],
  mssv: "",
  user_id: "",
});

const initialState: UserState = {
  isLogin: Boolean(localStorage.getItem("isLogin") === "true" ? true : false),
  user_id: localStorage.getItem("user_id") || "",
  name: localStorage.getItem("name") || "",
  mssv: localStorage.getItem("mssv") || "",
  email: localStorage.getItem("email") || "",
  books: [],
};

const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setBooks = (payload: any) => {
    dispatch({ type: "SET_BOOKS", payload });
  };

  const login = (payload: any) => {
    dispatch({ type: "LOGIN", payload });
  };

  const register = (payload: any) => {
    dispatch({ type: "REGISTER", payload });
  };

  const logout = (payload: any) => {
    dispatch({ type: "LOGOUT", payload });
  };

  const contextValues = {
    setBooks,
    login,
    register,
    logout,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
