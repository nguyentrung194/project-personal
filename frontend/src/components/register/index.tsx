/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Webcam from "react-webcam";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";

function decodeBase64Image(dataString: string) {
    const matches: any = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const response: any = {};

    if (matches?.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = matches[2];
    console.log(Buffer.from(matches[2], 'base64'))

    return response;
}

export const Register = () => {
    const { register, takePiture, images } = useContext(UserContext);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    const webcamRef: any = useRef(null);
    const [imgSrc, setImgSrc] = useState('')
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        takePiture({ image: decodeBase64Image(imageSrc).data })
        console.log(images)
        setImgSrc(imageSrc)
    };
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
                await axios({
                    url: environment.api + 'register',
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        name: values.name,
                        email: values.email,
                        maso: values.maso,
                        encode: images.join(',,'),
                    }
                })
                console.log(images.join(',,'))
                register({
                    name: values.name,
                    email: values.email,
                    images: [],
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
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">
                <div className="flex justify-center items-center">
                    <div className="max-w-sm p-5">
                        <p>Bạn nên chụp 10 bức hình rõ mặt.</p>
                        {imgSrc ? <img src={imgSrc} alt="image preview2" /> : null}
                        <p>Số bức ảnh hiện tại: {images.length}</p>
                        <Webcam
                            audio={false}
                            height={720}
                            forceScreenshotSourceSize={true}
                            mirrored={true}
                            screenshotQuality={1}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={1280}
                            videoConstraints={videoConstraints}
                        />
                        <button
                            className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
                delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
                text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
                hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                            onClick={capture}>Chụp</button>
                    </div>
                </div>
                <div className="w-full max-w-xs flex justify-center items-center">
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
            </div>
        </div>
    )
}