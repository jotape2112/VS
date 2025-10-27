import { useEffect, useState } from "react";
import api from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

function Points() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Obtener puntos del backend
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await api.get("/points");
        setPoints(res.data);
      } catch (err) {
        console.error("Error al obtener puntos de reciclaje:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();

    // ✅ Actualización automática cada 30 segundos
    const interval = setInterval(fetchPoints, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-4">Cargando mapa de puntos verdes...</p>;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-green-100 to-green-300">
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        🗺️ Puntos Verdes de Reciclaje
      </h1>

      {points.length === 0 ? (
        <p>No hay puntos registrados aún.</p>
      ) : (
        <MapContainer
          center={[-33.45, -70.65]} // 📍 Santiago como punto inicial
          zoom={12}
          style={{ height: "70vh", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {points.map((p) => (
            <Marker key={p._id} position={[p.lat, p.lng]} icon={greenIcon}>
              <Popup>
                <b>{p.name}</b>
                <br />
                📍 {p.address}
                <br />
                ♻️ Materiales: {p.materials.join(", ")}
                <br />
                👤 Empresa: {p.companyId?.name || "N/A"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Points;
