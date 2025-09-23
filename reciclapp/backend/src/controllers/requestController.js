const Request = require('../models/Request');

// Crear nueva solicitud
const createRequest = async (req, res) => {
  try {
    const { items, address, schedule } = req.body;

    const newRequest = await Request.create({
      userId: req.user.id,
      items,
      address,
      schedule
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la solicitud' });
  }
};

// Obtener solicitudes de un usuario (historial)
const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener solicitudes' });
  }
};

// Empresa acepta/rechaza solicitud
const updateStatus = async (req, res) => {
  try {
    const { status, companyId } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status, companyId },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: 'Solicitud no encontrada' });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar solicitud' });
  }
};

// Obtener todas las solicitudes (vista de empresa/admin)
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener todas las solicitudes' });
  }
};

// 👇 Exportar correctamente
module.exports = {
  createRequest,
  getUserRequests,
  updateStatus,
  getAllRequests
};
