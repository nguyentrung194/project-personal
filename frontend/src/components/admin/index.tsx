import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { imgSrc } from "../../common/img";
export const Admin = () => {
    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: async (values) => {
            try {
                formik.setSubmitting(true);

                // code there

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
        <div className="m-2">
            <h1 className="my-5 text-center">Danh sach</h1>
      
            <div className="flex justify-center items-center w-full">
                <table className="border-separate border border-blue-800 w-full">
                    <thead className="bg-blue-400">
                        <tr>
                            <th className="border border-blue-600 text-center">STT</th>
                            <th className="border border-blue-600 text-center">Ten</th>
                            <th className="border border-blue-600 text-center">Ma so</th>
                            <th className="border border-blue-600 text-center">Hinh anh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-blue-600 text-center">1</td>
                            <td className="border border-blue-600 text-center">Phap luat dai cuong</td>
                            <td className="border border-blue-600 text-center">PLDC_01</td>
                            <td className="border border-blue-600 text-center">
                                <div className="w-full min-h-80 lg:h-80">
                                    <img src={imgSrc}
                                        alt="Front of men&#039;s Basic Tee in black."
                                        className="w-full h-full object-center object-contain" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-blue-600 text-center">1</td>
                            <td className="border border-blue-600 text-center">Phap luat dai cuong</td>
                            <td className="border border-blue-600 text-center">PLDC_01</td>
                            <td className="border border-blue-600 text-center">
                                <div className="w-full min-h-80 lg:h-80">
                                    <img src={imgSrc}
                                        alt="Front of men&#039;s Basic Tee in black."
                                        className="w-full h-full object-center object-contain" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-blue-600 text-center">1</td>
                            <td className="border border-blue-600 text-center">Phap luat dai cuong</td>
                            <td className="border border-blue-600 text-center">PLDC_01</td>
                            <td className="border border-blue-600 text-center">
                                <div className="w-full min-h-80 lg:h-80">
                                    <img src={imgSrc}
                                        alt="Front of men&#039;s Basic Tee in black."
                                        className="w-full h-full object-center object-contain" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}