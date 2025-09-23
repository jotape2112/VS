const mongoose = require('mongoose');

const recyclingPointSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Ej: "Punto Limpio Las Condes"
  address: { type: String, required: true },     // Dirección completa
  latitude: { type: Number, required: true },    // Para el mapa
  longitude: { type: Number, required: true },
  materials: [{ type: String, required: true }], // Ej: ["Plástico", "Vidrio", "Cartón"]
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Empresa que administra
}, { timestamps: true });

module.exports = mongoose.model('RecyclingPoint', recyclingPointSchema);
