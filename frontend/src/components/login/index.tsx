import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";

export const Login = () => {
  const { login } = useContext(UserContext);
  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        axios({
          url: `${environment.api}login`,
          method: "POST",
          data: {
            email: values.email,
            password: values.password,
          },
        })
          .then(({ data: { data } }) => {
            login({
              isLogin: true,
              name: data.name,
              email: data.email,
              mssv: data.mssv,
              user_id: data._id,
            });
            addToast(`Wellcome`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            addToast("Dang nhap khong thanh cong!", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Ban hay kiem tra lai duong truyen!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="pb-8 w-64">
          <button
            className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};
