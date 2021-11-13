/* eslint-disable jsx-a11y/img-redundant-alt */
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../contexts/reducer";

export const Register = () => {
    const { register } = useContext(UserContext);

    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            maso: '',
        },
        onSubmit: async (values) => {
            try {
                formik.setSubmitting(true);

                // code there

                register({
                    name: values.name,
                    email: values.email,
                })

                addToast("Register success!", {
                    appearance: 'success',
                    autoDismiss: true,
                });
                formik.setSubmitting(false);
            } catch (error) {
                addToast("Let try again!", {
                    appearance: 'error',
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Mã số sinh viên:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="maso"
                        type="text"
                        value={formik.values.maso}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
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
                <div className="pb-8 w-64">
                    <button
                        className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                        disabled={formik.isSubmitting}
                        type="submit"
                    >
                        Đăng ký
                    </button>
                </div>
            </form>
        </div>
    )
}