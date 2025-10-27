import { useEffect, useState } from "react";
import api from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Error al obtener solicitudes:", err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-green-100 to-green-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Solicitudes Activas</h1>
      {requests.length === 0 ? (
        <p>No hay solicitudes pendientes o activas.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li key={req._id} className="p-3 bg-white rounded-lg shadow">
              <p><b>Usuario:</b> {req.userId?.name || "N/A"}</p>
              <p><b>Dirección:</b> {req.address}</p>
              <p><b>Horario:</b> {req.schedule}</p>
              <p><b>Estado:</b> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Requests;
