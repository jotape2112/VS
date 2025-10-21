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

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/history")}
            className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Ver Historial de Solicitudes
          </button>

          <button
            onClick={() => navigate("/points")}
            className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Ver Puntos de Reciclaje
          </button>

          <button
            onClick={() => navigate("/new-request")}
            className="bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Nueva Solicitud
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

}

export default Home;
