const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Empresa que acepta la solicitud
  items: [
    {
      material: { type: String, required: true }, // ej: "Plástico", "Cartón"
      quantity: { type: Number, default: 1 }      // cantidad opcional
    }
  ],
  address: { type: String, required: true },
  schedule: { type: String, required: true }, // Ejemplo: "2025-09-12 15:00"
  status: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada', 'completada'],
    default: 'pendiente'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
