import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Bienvenido, {user?.name}</h1>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/history")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Ver Historial de Solicitudes
        </button>

        <button
          onClick={() => navigate("/points")}
          className="bg-green-600 text-white p-2 rounded"
        >
          Ver Puntos de Reciclaje
        </button>
        
        <button
            onClick={() => navigate("/new-request")}
            className="bg-purple-600 text-white p-2 rounded"
        >
             Nueva Solicitud
        </button>
        
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white p-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Home;
