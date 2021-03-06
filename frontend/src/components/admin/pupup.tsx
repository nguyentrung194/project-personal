import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";
import { useQueryURL } from "../../hooks/use-query-url";
import { Books } from "../../interfaces";

export const BookUpAdmin = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  const { user_id, setBooks, books, book } = useContext(UserContext);

  const id = query.get("book_id");

  useEffect(() => {
    if (id) {
      if (book._id === "") {
        if (books.length) {
          const item = books.filter((el) => {
            return el.maso === id;
          })[0];
          if (item?._id) {
            formik.setValues({
              _id: item._id,
              name: item.name,
              maso: item.maso,
              image: item.image,
              available: item.available || false,
              user_id: item.user_id || "",
            });
          }
        }
      } else {
        formik.setValues({
          _id: book._id,
          name: book.name,
          maso: book.maso,
          image: book.image,
          available: book.available || false,
          user_id: book.user_id || "",
        });
      }
      setFirst(true);
      setTimeout(() => {
        setOpen(true);
      }, 300);
      setIndexStatus(true);
    } else {
      setFirst(false);
      setTimeout(() => {
        setOpen(false);
        setIndexStatus(false);
      }, 300);
    }
  }, [id, books]);

  const { addToast } = useToasts();

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      maso: "",
      image: "",
      available: false,
      user_id: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        const result = await toBase64(values.image).catch((err) => {
          console.log(err);
          addToast("File khong hop le!", {
            appearance: "error",
            autoDismiss: true,
          });
        });

        axios({
          url: `${environment.api}books/${values._id}`,
          method: "PUT",
          data: {
            ...values,
            image: result,
          },
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
            setBooks({
              books: [...books, res.data.data],
            });
            query.delete("add");
            history(`${location.pathname}`);
            addToast(`Them thanh cong`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            addToast("Ma so da ton tai!", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Ban hay thu kiem tra lai duong truyen!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`${
        indexStatus ? "z-10" : "-z-10"
      } fixed inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => {
            query.delete("book_id");
            history(`${location.pathname}`);
          }}
          className={`${isFirst ? "opacity-100" : "opacity-0"} ${
            isOpen ? "ease-in duration-200" : "ease-out duration-300"
          } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {user_id ? (
          <div
            className={`${
              isFirst
                ? "opacity-100 translate-y-0 sm:scale-100"
                : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            } ${
              isOpen ? "ease-in duration-200" : "ease-out duration-300"
            } inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Sach co maso: {id}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Ban co the chinh sua tai day.
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Ma so:
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
                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Ten sach:
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
                    <div className="mt-2">
                      {formik.values.image ? (
                        <img src={formik.values.image} alt="img" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Hinh anh:
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                onChange={async (event: any) => {
                                  const result = await toBase64(
                                    event.currentTarget.files[0]
                                  ).catch((err) => {
                                    console.log(err);
                                    addToast("File khong hop le!", {
                                      appearance: "error",
                                      autoDismiss: true,
                                    });
                                  });
                                  formik.setFieldValue("image", result);
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xac nhan
                </button>
                <button
                  onClick={() => {
                    query.delete("book_id");
                    history(`${location.pathname}`);
                  }}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Huy bo
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div
            className={`${
              isFirst
                ? "opacity-100 translate-y-0 sm:scale-100"
                : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            } ${
              isOpen ? "ease-in duration-200" : "ease-out duration-300"
            } inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Ban can dang nhap truoc
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Va sau do ban co the thuc hien yeu cau.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Link
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                to="login"
              >
                ????ng nh???p
              </Link>
              <button
                onClick={() => {
                  query.delete("book_id");
                  history(`${location.pathname}`);
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Huy bo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
