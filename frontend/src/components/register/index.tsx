/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";
import { ReactComponent as LoadingLogo } from "../../icons/loading.svg";

export const Register = () => {
  const { register } = useContext(UserContext);

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mssv: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        axios({
          url: `${environment.api}signup`,
          method: "POST",
          data: {
            name: values.name,
            email: values.email,
            mssv: values.mssv,
            password: values.password,
          },
        })
          .then(({ data: { data } }) => {
            register({
              isLogin: true,
              name: data.name,
              email: data.email,
              mssv: data.mssv,
              user_id: data._id,
            });
          })
          .catch((err) => console.log(err));

        addToast("Register success!", {
          appearance: "success",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Let try again!", {
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
            Họ tên:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mã số sinh viên:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="mssv"
            type="text"
            value={formik.values.mssv}
            onChange={formik.handleChange}
          />
        </div>
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
            Mat khau:
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Xac nhan lai mat khau:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
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
            {formik.isSubmitting ? (
              <LoadingLogo className="w-7 animate-spin" />
            ) : (
              "Đăng ký"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
