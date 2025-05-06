import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Si no hay token → redirige
  if (!token) {
   
    return <Navigate to="/Register" replace state={{showModal: true}} />;
  }

  // Si hay token → muestra la página protegida
  return children;
};

export default ProtectedRoute;
