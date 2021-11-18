import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";
import { Search } from "./search";

export const Nav = () => {
  const { isLogin, logout, login, user_id } = useContext(UserContext);
  useEffect(() => {
    if (user_id) {
      axios({
        url: `${environment.api}users/${user_id}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(({ data: { data } }) => {
          login({
            isLogin: true,
            name: data.name,
            email: data.email,
            mssv: data.mssv,
            user_id: data._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user_id]);
  return (
    <div className="bg-blue-200 flex justify-between items-center p-4">
      <div className="px-4">
        <Link to="/">Logo</Link>
      </div>
      <div>
        <Search />
      </div>
      {isLogin ? (
        <div className="flex justify-around items-center">
          <div className="px-4">
            <Link to="user">Profile</Link>
          </div>
          <div className="px-4">
            <Link
              to="logout"
              onClick={async () => {
                await axios({
                  url: `${environment.api}logout`,
                  method: "POST",
                  withCredentials: true,
                })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                logout();
              }}
            >
              Đăng xuất
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-around items-center">
          <div className="px-4">
            <Link to="register">Đăng ký</Link>
          </div>
          <div className="px-4">
            <Link to="login">Đăng nhập</Link>
          </div>
        </div>
      )}
    </div>
  );
};
