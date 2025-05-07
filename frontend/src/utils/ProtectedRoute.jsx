import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("🔴 No hay token en localStorage");
      setIsValid(false);
      return;
    }

    const verificarToken = async () => {
      console.log("🟡 Verificando token...");

      try {
        const res = await fetch("http://localhost:8080/usuarios/perfil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        console.log("📡 Respuesta del backend:", res.status);

        if (res.status === 200) {
          console.log("Token válido");
          setIsValid(true);
        } else if (res.status === 401) {
          console.log("Token expirado");
          localStorage.removeItem("token");
          setIsValid(false);
        } else {
          console.log("Otro error (token inválido)");
          setIsValid(false);
        }
      } catch (err) {
        console.error("Error al verificar token:", err);
        setIsValid(false);
      }
    };

    verificarToken();
  }, [token]);

  if (isValid === null) {
    return <p>Verificando autenticación...</p>;
  }

  if (!isValid) {
    return <Navigate to="/Register" replace state={{ showModal: true }} />;
  }

  return children;
};

export default ProtectedRoute;
