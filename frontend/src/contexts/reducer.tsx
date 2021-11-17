import React, { createContext, useReducer } from "react";
import { UserReducer } from "./context";
import { Books, UserState } from "../interfaces";

export const UserContext = createContext<UserState>({
  isLogin: false,
  name: "",
  email: "",
  books: [],
  book: {
    _id: "",
    name: "",
    maso: "",
    image: "",
    available: false,
    user_id: "",
  },
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
  book: {
    _id: "",
    name: "",
    maso: "",
    image: "",
    available: false,
    user_id: "",
  },
};

const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setBooks = (payload: any) => {
    dispatch({ type: "SET_BOOKS", payload });
  };

  const setBook = (payload: any) => {
    dispatch({ type: "SET_BOOK", payload });
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
    setBook,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
