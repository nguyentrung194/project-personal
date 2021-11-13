import React, { useContext } from "react";
import { UserContext } from "../../contexts/reducer";

export const User = () => {
    const { user_id } = useContext(UserContext);
    console.log(user_id)

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-3xl">

            </div>
        </div>
    )
}