import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      onClick={() => logout({ returnTo: window.location.origin })} 
      className="w-full text-center text-white bg-red-500 hover:bg-red-600 py-2 rounded-md transition-all"
    >
      Cerrar Sesión
    </button>
  );
};
