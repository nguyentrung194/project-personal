import React, { createContext, useReducer } from "react";
import { UserReducer, UserState } from "./context";

export const UserContext = createContext<UserState>({
  isLogin: false,
  name: '',
  time: null,
  email: '',
  images: [],
  logs: [],
  classes: [],
});

const initialState: UserState = {
  isLogin: false,
  name: '',
  time: null,
  email: '',
  images: [],
  logs: [],
  classes: [],
};

const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const takePiture = (payload: any) => {
    dispatch({ type: "TAKE_PITURE", payload });
  };

  const login = (payload: any) => {
    dispatch({ type: "LOGIN", payload });
  };

  const setLogs = (payload: any) => {
    dispatch({ type: "SET_LOGS", payload });
  };

  const setClasses = (payload: any) => {
    dispatch({ type: "SET_CLASSES", payload });
  };

  const register = (payload: any) => {
    dispatch({ type: "REGISTER", payload });
  };

  const logout = (payload: any) => {
    dispatch({ type: "LOGOUT", payload });
  };

  const contextValues = {
    takePiture,
    login,
    register,
    logout,
    setLogs,
    setClasses,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;