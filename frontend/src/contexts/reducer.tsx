import React, { createContext, useReducer } from "react";
import { UserReducer } from "./context";
import { imgSrc } from "../common/img";
import { UserState } from "../interfaces";


export const UserContext = createContext<UserState>({
  isLogin: false,
  name: '',
  email: '',
  books: [],
  mssv: '',
});

const initialState: UserState = {
  isLogin: false,
  name: '',
  mssv: '',
  email: '',
  books: [
    { id: 1, name: 'Phap luat dai cuong', maso: 'PLDC_01', image: imgSrc },
    { id: 2, name: 'Phap luat dai cuong', maso: 'PLDC_02', image: imgSrc },
    { id: 3, name: 'Phap luat dai cuong', maso: 'PLDC_03', image: imgSrc },
    { id: 4, name: 'Phap luat dai cuong', maso: 'PLDC_04', image: imgSrc }
  ],
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