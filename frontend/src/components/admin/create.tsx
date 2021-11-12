/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";

export const CreateNewClassPage = () => {
    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues: {
            class_name: ''
        },
        onSubmit: async (values) => {
            try {
                formik.setSubmitting(true);
                const messName = await axios({
                    url: environment.api + 'class',
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        class_name: values.class_name,
                    }
                })
                console.log(messName)
                addToast("Add success!", {
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
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 gap-8 min-h-screen">
                <div className="w-full max-w-xs flex justify-center items-center">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Create with Class name:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                name="class_name"
                                type="text"
                                value={formik.values.class_name}
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
                                Create new class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}