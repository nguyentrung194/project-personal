import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryURL } from "../../hooks/use-query-url";

export const BookUp = ({ id }: { id: any }) => {
    const location = useLocation();
    const history = useNavigate();
    const query = useQueryURL();
    const [isOpen, setOpen] = useState(false);
    const [isFirst, setFirst] = useState(false);
    const [indexStatus, setIndexStatus] = useState(false);
    useEffect(() => {
        if (id) {
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
    }, [id])

    return (
        <div className={`${indexStatus ? "z-10" : "-z-10"} fixed inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className={`${isFirst ? "opacity-100" : "opacity-0"} ${isOpen ? "ease-in duration-200" : "ease-out duration-300"} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`} aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`${isFirst ? "opacity-100 translate-y-0 sm:scale-100" : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"} ${isOpen ? "ease-in duration-200" : "ease-out duration-300"} inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Xac nhan dang ky
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Ban co the den tu sach de nhan giao trinh vao khung gio hanh chinh.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => {
                            query.delete("page");
                            query.delete("id");
                            history(`${location.pathname}`);
                        }} type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Xac nhan
                        </button>
                        <button onClick={() => {
                            query.delete("page");
                            query.delete("id");
                            history(`${location.pathname}`);
                        }} type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Huy bo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}