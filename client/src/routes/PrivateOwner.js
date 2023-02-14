import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UseContext";
import jwt from "jwt-decode"
const PrivateAdmin = () => {
   const token = localStorage.getItem("token")
   const decoded = jwt(token)
   // console.log(decoded)
   return (
      <>
         {decoded.status === "Owner" ? (
            <Outlet />
         ) : (
            <Navigate to="/" />
         )}
      </>
   );
};

export default PrivateAdmin;