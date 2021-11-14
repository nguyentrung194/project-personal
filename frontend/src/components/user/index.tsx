import React, { useContext } from "react";
import { UserContext } from "../../contexts/reducer";

export const User = () => {
  const { user_id, name, mssv, email } = useContext(UserContext);

  return (
    <div className="text-center">
      <div className="p-1">
        <p className="text-base">{user_id}</p>
      </div>
      <div className="p-1">
        <p className="text-base">{name}</p>
      </div>
      <div className="p-1">
        <p className="text-base">{mssv}</p>
      </div>
      <div className="p-1">
        <p className="text-base">{email}</p>
      </div>
    </div>
  );
};
