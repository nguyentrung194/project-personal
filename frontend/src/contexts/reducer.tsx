import React, { createContext, useReducer } from "react";
import { UserReducer, UserState } from "./context";

export const UserContext = createContext<UserState>({
  isLogin: false,
  name: '',
  time: null,
  email: '',
  books: [],
});

const initialState: UserState = {
  isLogin: false,
  name: '',
  time: null,
  email: '',
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