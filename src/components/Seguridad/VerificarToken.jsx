import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const VerificarToken = () => {
    // Obtener la ubicación actual
    const location = useLocation();
    const navigate = useNavigate();
    // Verificar si el usuario tiene un token (puedes ajustar esta lógica según cómo almacenas el token en tu aplicación)
    const tieneToken = localStorage.getItem("token") !== null;
  
    useEffect(() => {
      // Si el usuario no tiene un token y no está en la página de inicio de sesión (login),
      // redirigirlo a la página de inicio de sesión.
      
      if (!tieneToken) {
        if (
          location.pathname !== "/auth/login" &&
          location.pathname !== "/auth/recuperar" &&
          location.pathname !== "/auth/registrar"
        ) {
          navigate("/auth/login");
        }
      }
    }, [tieneToken, location, navigate]);
  
    // Si el usuario tiene un token o está en la página de inicio de sesión (login), muestra el contenido normalmente.
    // De lo contrario, muestra un mensaje o componente que indique que se está verificando el token.
    
  };

  export {VerificarToken}