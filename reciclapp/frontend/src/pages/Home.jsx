import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center bg-white shadow-lg rounded-2xl p-8 border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Bienvenido{user ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-gray-600 mb-8">
          {user?.role === "usuario"
            ? "Aquí puedes crear solicitudes y ver tus puntos de reciclaje."
            : "Aquí puedes gestionar las solicitudes de los usuarios y revisar el historial completado."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.role === "usuario" && (
            <>
              <button
                onClick={() => navigate("/new-request")}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition"
              >
                Nueva Solicitud
              </button>

              <button
                onClick={() => navigate("/history")}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
              >
                Ver Historial de Solicitudes
              </button>

              <button
                onClick={() => navigate("/points")}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
              >
                Ver Puntos de Reciclaje
              </button>
            </>
          )}

          {user?.role === "empresa" && (
            <>
              <button
                onClick={() => navigate("/requests")}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
              >
                Ver Solicitudes
              </button>

              <button
                onClick={() => navigate("/company-history")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-semibold transition"
              >
                Ver Historial Completadas
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
