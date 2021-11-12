import axios from "axios";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/reducer";

export const User = () => {
    const { addToast } = useToasts();
    const { user_id, logs, setLogs } = useContext(UserContext);
    console.log(user_id)
    axios({
        url: environment.api + 'histories',
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        params: {
            user_id: user_id,
        }
    }).then((res) => {
        console.log(logs);
        if (logs?.length === 0 && logs?.length !== res.data.length) {
            setLogs({ logs: [...res.data] })
        }
    }).catch((err) => {
        console.log(err)
        addToast("Error!", {
            appearance: 'error',
            autoDismiss: true,
        });
    })

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-3xl">
                <div className="grid grid-cols-10 p-2 border-b-2 border-blue-400">
                    <div className="p-2 col-span-2 text-center">
                        <p>Class id</p>
                    </div>
                    <div className="p-2 col-span-2 text-center">
                        <p>User id</p>
                    </div>
                    <div className="p-2 col-span-6 text-center">
                        <p>Time</p>
                    </div>
                </div>
                {logs?.map((el: any[]) => {
                    const time = new Date(Date.parse(el[3]));
                    return (
                        <div key={el[0]} className="grid grid-cols-10 p-2">
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[2]}</p>
                            </div>
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[1]}</p>
                            </div>
                            <div className="p-2 col-span-6 text-center">
                                <p>
                                    {
                                        time.getDate()
                                        + '-'
                                        + (time.getMonth() + 1)
                                        + '-'
                                        + time.getFullYear()
                                        + ' '
                                        + time.getHours()
                                        + ':'
                                        + time.getMinutes()
                                        + ':'
                                        + time.getSeconds()
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}