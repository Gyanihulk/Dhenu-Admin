import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return getTokenFromLocalStorage?.auth_token !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
