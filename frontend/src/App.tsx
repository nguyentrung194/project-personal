import React, { useContext } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeRoute } from './route/home.route';
import { RegisterRoute } from './route/register.route';
import { LoginRoute } from './route/login.route';
import { AdminRoute } from './route/admin.route';
import { CreateNewClassRoute } from './route/admin-create.route';
import { NavLayout } from './layouts/nav';
import { UserContext } from './contexts/reducer';
import { UserRoute } from './route/user.route';
import { ErrorRoute } from './route/error.route';

function App() {
  const { isLogin, user_id } = useContext(UserContext);
  if (!isLogin) {
    return (
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    );
  }
  else {
    if (user_id === "1") { // role admin
      return (
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/admin" replace={true} />} />
            <Route>
              <Route path="/admin" element={<AdminRoute />} />
              <Route path="/admin/create" element={<CreateNewClassRoute />} />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      );
    }
    else if (user_id !== "1") { // role user
      return (
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/user" element={<UserRoute />} />
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/404" replace={true} />} />
            <Route path="/404" element={<ErrorRoute />} />
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      );
    }
  }
}

export default App;