import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si no hay usuario autenticado, redirige al login automáticamente
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          ♻️ Bienvenido{user ? `, ${user.name}` : ""}!
        </h1>

       <div className="flex flex-col gap-3">
          {user?.role === "usuario" && (
            <>
              <button
                onClick={() => navigate("/new-request")}
                className="bg-purple-600 text-white p-2 rounded"
              >
                Nueva Solicitud
              </button>
        
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
            </>
          )}
        
          {user?.role === "empresa" && (
            <>
              <button
                onClick={() => navigate("/requests")}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Ver Solicitudes
              </button>
            </>
          )}
        
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
    </div>
  );
}

export default Home;
